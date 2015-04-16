var gulp = require('gulp'),
    combiner = require('stream-combiner2'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    minifyCSS = require('gulp-minify-css'),
    gzip = require('gulp-gzip'),
    nodemon = require('gulp-nodemon'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    babel = require('gulp-babel'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

gulp.task('node-dev', function() {
    nodemon({
        script : './bin/www',
        ext : 'js',
        tasks : ['compress'],
        ignore : 'dist/**/*.js',
        env : { 'NODE_ENV' : 'dev' }
    });
});

var jsTargets = ['models/*.js',
                'controllers/**/*.js',
                'modal-page/**/*.js',
                'app.js',
                'config.js',
                'public/**/*.js'];

var jsViews = ['public/**/*.js'];
var htmlViews = ['public/**/*.html'];
var cssViews = ['public/**/*.css'];
var resources = ['public/**/*.jpg',
                    'public/**/*.ttf',
                    'public/**/*.woff'];

var lintStreamer = function(glob) {
    return gulp.src(glob)
      .pipe(jshint({node: true}))
      .pipe(jshint.reporter('default'));
};

//This lints all files in jsTargets
gulp.task('lint', function() {
    return lintStreamer(jsTargets.join('|'));
});

//This lints the changing files in jsTargets as they change
gulp.task('lint-auto', function() {
  watch(jsTargets, function(file) {
      return lintStreamer(file.path);
  });
});

//This transpiles es6 to es5 as the files change
//TODO: Reform the file layout so that its easier to build
gulp.task('build-auto', function() {
    watch(jsTargets, function(file) {
        return gulp.src(file.path)
          .pipe(sourcemaps.init())
          .pipe(babel())
          .pipe(sourcemaps.write("."))
          .pipe(gulp.dest('dist'));
    });
});

gulp.task('compressJS', function () {
    var combined = combiner.obj([
        gulp.src(jsViews), 
        uglify({ 
            mangle : false
        }),
        gzip({
            append : false
        }),
        gulp.dest('dist')
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
});

gulp.task('compressHTML', function() {
    var combined = combiner.obj([
        gulp.src(htmlViews),
        minifyHTML(),
        gzip({
            append : false
        }),
        gulp.dest('dist')
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
});

gulp.task('compressCSS', function() {
    var combined = combiner.obj([
        gulp.src(cssViews),
        minifyCSS(),
        gzip({
            append : false
        }),
        gulp.dest('dist')
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
});

gulp.task('build', function() {
    return gulp.src(jsTargets)
          .pipe(sourcemaps.init())
          .pipe(babel())
          .pipe(sourcemaps.write("."))
          .pipe(gulp.dest('dist'));
});

gulp.task('landingSync', function() {
    var config = {
        watchOptions: {
            debounceDelay: 500
        },
        server: {
            baseDir: 'public'
        },
        https: true,
        files: ["public/*.html", "public/**/*.css", "public/**/.js"]
    };
    browserSync(config);
});

gulp.task('compress', 
    ['compressJS', 'compressHTML', 'compressCSS'],
    function() {
        var combined = combiner.obj([
            gulp.src(resources),
            gzip({
                append : false
            }),
            gulp.dest('dist')
        ]);
        combined.on('error', console.error.bind(console));
        return combined;
    }
);

gulp.task('default', [
    'lint',
    'node-dev', 
]);
