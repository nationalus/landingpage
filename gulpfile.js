var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    nodemon = require('gulp-nodemon'),
    rename = require('gulp-rename');

gulp.task('node-dev', function() {
    nodemon({
        script : './bin/www',
        ext : 'js',
        //tasks : ['lint'],
        env : { 'NODE_ENV' : 'dev' }
    });
});

gulp.task('lint', function() {
    var targets = ['models/*.js'/*, 'controllers/*.js', 'test/*.js'*/];
    return gulp.src(targets.join('|'))
        .pipe(jshint({ node : true }))
        .pipe(jshint.reporter('default'));
});

/*
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
*/

gulp.task('default', ['node-dev']);
