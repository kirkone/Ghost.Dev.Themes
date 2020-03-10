const { series, watch, src, dest } = require('gulp');
const pump = require('pump');

// gulp plugins and utils
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const zip = require('gulp-zip');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const beeper = require('beeper');
const rename = require('gulp-rename');

// postcss plugins
const autoprefixer = require('autoprefixer');
const colorFunction = require('postcss-color-function');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');
const easyimport = require('postcss-easy-import');

const theme = require('./theme/theme.json');
const outputPath = 'ghost/content/themes/' + theme.name;

function serve(done) {
    livereload.listen();
    done();
}

const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function css(done) {
    var processors = [
        easyimport,
        customProperties,
        colorFunction(),
        autoprefixer(),
        cssnano()
    ];

    pump([
        src('theme/assets/css/*.css', { sourcemaps: true }),
        postcss(processors),
        dest(outputPath + '/assets/', { sourcemaps: '.' }),
        livereload()
    ], handleError(done));
}

function js(done) {
    pump([
        src([
            // pull in lib files first so our own code can depend on it
            'theme/assets/js/lib/*.js',
            'theme/assets/js/*.js'
        ], {sourcemaps: true}),
        concat('theme.js'),
        uglify(),
        dest(outputPath + '/assets/', { sourcemaps: '.' }),
        livereload()
    ], handleError(done));
}

function hbs(done) {
    pump([
        src([
            'theme/**/*.hbs'
        ]),
        dest(outputPath + '/'),
        livereload()
    ], handleError(done));
}

function locales(done) {
    pump([
        src([
            'theme/locales/*.json'
        ]),
        dest(outputPath + '/locales/'),
        livereload()
    ], handleError(done));
}

function common(done) {
    pump([
        src('theme/theme.json'),
        rename('package.json'),
        dest(outputPath + '/.')
    ], handleError(done));
    pump([
        src([
            'LICENSE'
        ]),
        dest(outputPath + '/')
    ], handleError(done));
}

function zipper(done) {
    var targetDir = 'zip/';
    var filename = theme.name + '.zip';

    pump([
        src([
            outputPath + '/**'
        ]),
        zip(filename),
        dest(targetDir)
    ], handleError(done));
}

const watcher = () => {
    livereload.listen();
    watch('theme/assets/css/**', css);
    watch('theme/assets/js/*.js', js);
    watch('theme/**/*.hbs', hbs);
    watch('theme/locales/*.json', locales);
}
const build = series(css, js, hbs, locales, common);
const dev = series(build, serve, watcher);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = dev;
