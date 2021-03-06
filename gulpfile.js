(function main() {

    var fs         = require('fs'),
        gulp       = require('gulp'),
        karma      = require('gulp-karma'),
        eslint     = require('gulp-eslint'),
        browserify = require('browserify'),
        babelify   = require('babelify');

    var compile = function(destPath, entryFile) {

        return browserify({ debug: true })
            .transform(babelify)
            .require(entryFile, { entry: true })
            .bundle()
            .on('error', function (model) { console.error(['Error:', model.message].join(' ')); })
            .pipe(fs.createWriteStream(destPath));

    };

    gulp.task('lint', function() {

        return gulp.src('src/redux-nest.js')
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failOnError());

    });

    gulp.task('karma', function() {

        return gulp.src([].concat('src/redux-nest.js', 'tests/*.test.js'))
            .pipe(karma({
                configFile: 'karma.conf.js',
                action: 'run'
            }))
            .on('error', function(err) { throw err; });

    });

    gulp.task('test', ['karma', 'lint']);
    gulp.task('default', ['test', 'build']);

    gulp.task('watch', function watch() {
        return gulp.watch(['example/js/app.js', 'src/redux-nest.js', 'tests/components/gremlin.js'], ['build']);
    });

})();
