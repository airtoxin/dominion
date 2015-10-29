var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gls = require('gulp-live-server');
var browserify = require('gulp-browserify');
var babelify = require('babelify');
var sequence = require('run-sequence');

gulp.task('lint', function () {
    return gulp.src('src/**/*.js')
        .pipe(eslint({useEslintrc: true}))
        .pipe(eslint.formatEach())
        .pipe(eslint.failAfterError());
});

gulp.task('transpile:backend', function () {
    return gulp.src('src/backend/**/*.js')
        .pipe(babel({stage: 1}))
        .pipe(gulp.dest('dist/backend'));
});
gulp.task('transpile:frontend', function () {
    return gulp.src('src/frontend/**/*.jsx')
        .pipe(browserify({
            insertGlobals: true,
            transform: babelify
        }))
        // .pipe(uglify())
        .pipe(rename({
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(gulp.dest('dist/frontend'));
});
gulp.task('transpile', ['transpile:backend', 'transpile:frontend']);

gulp.task('watch-n-server', function () {
    var server = gls.new('dist/backend/app.js');
    gulp.watch('src/backend/**/*.js', ['transpile:backend']);
    gulp.watch('src/frontend/**/*.jsx', ['transpile:frontend']);
    gulp.watch('dist/backend/app.js', function () {
        server.start.bind(server)();
    });
    server.start();
});

gulp.task('default', sequence('transpile', 'watch-n-server'));
