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
        env : { 'NODE_ENV' : 'dev' }
    });
});

gulp.task('lint', function() {
    return gulp.src('./*.js')
        .pipe(jshint())
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

gulp.task('watch', function() {
    gulp.watch('./*.js', ['lint'/*, 'scripts'*/]);
});

gulp.task('default', ['lint', /*'scripts',*/ 'watch']);
