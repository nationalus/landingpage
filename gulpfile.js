var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    nodemon = require('gulp-nodemon'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

gulp.task('node-dev', function() {
    nodemon({
        script : './bin/www',
        ext : 'js',
        //tasks : ['lint'],
        env : { 'NODE_ENV' : 'dev' }
    });
});

var jsTargets = ['models/*.js',
                'controllers/**/*.js',
                'modal-page/**/*.js',
                'app.js',
                'config.js',
                'public/**/*.js'];

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

gulp.task('default', ['node-dev', 'lint']);
