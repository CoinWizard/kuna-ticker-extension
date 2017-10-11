import gulp from 'gulp';
import Path from 'path';
import del from 'del';
import gulpWebpack from 'gulp-webpack';
import webpackConfig from './webpack.config.js';
import named from 'vinyl-named';
import sass from 'gulp-sass';
import jsoneditor from 'gulp-json-editor';
import zip from 'gulp-zip';

const manifest = require('./resources/manifest.json');

const PATH = {
    SOURCE: Path.join(__dirname, './src'),
    TARGET: Path.join(__dirname, './dist')
};


gulp.task('copy:root', copyTask({
    source: './app/',
    destinations: [
        './dist/firefox',
        './dist/chrome'
    ],
    pattern: '/*',
}));

gulp.task('copy:images', copyTask({
    source: './resources/images/',
    destinations: [
        './dist/firefox/images',
        './dist/chrome/images'
    ]
}));

gulp.task('copy:views', copyTask({
    source: './resources/views/',
    destinations: [
        './dist/firefox/views',
        './dist/chrome/views'
    ]
}));

gulp.task('manifest:production', () => {
    return gulp
        .src('./resources/manifest.json')
        .pipe(gulp.dest('./dist/firefox', {overwrite: true}))

        .pipe(jsoneditor((json) => {
            delete json.applications;

            return json
        }))
        .pipe(gulp.dest('./dist/chrome', {overwrite: true}))
});


gulp.task('js', () => {
    return gulp
        .src([
            "./src/popup.jsx",
            "./src/pageContent.js",
            "./src/background.js"
        ])
        .pipe(named())
        .pipe(gulpWebpack(webpackConfig))
        .pipe(gulp.dest('./dist/chrome'))
        .pipe(gulp.dest('./dist/firefox'));
});


gulp.task('css', () => {
    return gulp
        .src('./src/Style/popup.scss')
        .pipe(
            sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError)
        )
        .pipe(gulp.dest('./dist/chrome/css'))
        .pipe(gulp.dest('./dist/firefox/css'));
});


const staticFiles = ['images', 'views', 'root'];
let copyStrings = staticFiles.map(staticFile => `copy:${staticFile}`);
gulp.task('copy', [
    ...copyStrings,
    'manifest:production'
]);

gulp.task('clean', function clean() {
    return del(['./dist/*']);
});

gulp.task('build', ['copy', 'css', 'js']);

gulp.task('copy:watch', function () {
    gulp.watch(['./src/*.*'], 'build');
});

gulp.task('zip:chrome', zipTask('chrome'));
gulp.task('zip:firefox', zipTask('firefox'));
gulp.task('zip', ['zip:chrome', 'zip:firefox']);

function copyTask(opts) {
    const {
        source,
        destination,
        destinations = [destination],
        pattern = '/**/*'
    } = opts;

    return () => {
        let stream = gulp.src(source + pattern, {base: source});
        destinations.forEach((destination) => {
            stream = stream.pipe(gulp.dest(destination))
        });

        return stream
    }
}

function zipTask(target) {
    return () => {
        return gulp
            .src(`./dist/${target}/**`)
            .pipe(zip(`kuna-${target}-${manifest.version}.zip`))
            .pipe(gulp.dest('./builds'));
    }
}
