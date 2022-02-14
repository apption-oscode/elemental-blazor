var gulp = require('gulp'),
    cleanDest = require('gulp-clean-dest'),
    flatten = require('gulp-flatten')
    cache = require('gulp-cached'); //If cached version identical to current file then it doesn't pass it downstream so this file won't be copied 

function copyFiles() {
    return gulp.src('node_modules/shepherd.js/**/shepherd.min.js')
        .pipe(cache('node_modules'))
        .pipe(flatten())
        //.pipe(cleanDest('.'))
        .pipe(gulp.dest('wwwroot/js'));
}

gulp.task('default', copyFiles);
