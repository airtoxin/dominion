var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
    return gulp.src('src/**/*.js')
        .pipe(eslint({useEslintrc: true}))
        .pipe(eslint.formatEach())
        .pipe(eslint.failAfterError());
});

gulp.task('babel', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel({stage: 1}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['babel']);
