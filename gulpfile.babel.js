import gulp from 'gulp';
import Path from 'path';
import del from 'del';
import jsoneditor from 'gulp-json-editor';
import zip from 'gulp-zip';

const packageJson = require('./package.json');
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

gulp.task('copy:fonts', copyTask({
    source: './resources/fonts/',
    destinations: [
        './dist/firefox/fonts',
        './dist/chrome/fonts'
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
        .pipe(jsoneditor((json) => {
            json.version = packageJson.version;

            return json;
        }))
        .pipe(gulp.dest('./dist/firefox', {overwrite: true}))

        .pipe(jsoneditor((json) => {
            delete json.applications;

            return json
        }))
        .pipe(gulp.dest('./dist/chrome', {overwrite: true}))
});

//|---------------------------------------------------------------------------
//| Configuration for create JavaScript bundles
//| Use WebPack
//|---------------------------------------------------------------------------
gulp.task('js', []);
gulp.task('js:watch', []);
gulp.task('css', []);


const staticFiles = ['images', 'views', 'root', 'fonts'];
let copyStrings = staticFiles.map(staticFile => `copy:${staticFile}`);
gulp.task('copy', [
    ...copyStrings,
    'manifest:production'
]);

gulp.task('clean', function clean() {
    return del(['./dist/*']);
});

gulp.task('build', ['copy']);

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
            .pipe(zip(`kuna-${target}-${packageJson.version}.zip`))
            .pipe(gulp.dest('./builds'));
    }
}