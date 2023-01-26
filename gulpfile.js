"use strict"

const {src, dest} = require("gulp")
const gulp = require("gulp")
const autoprefixer = require("gulp-autoprefixer")
const sass = require("gulp-sass")(require('sass'));
const uglify = require("gulp-uglify");
const rigger = require('gulp-rigger');
const imagemin = require("gulp-imagemin");
const del = require("del");
const cleanCSS = require('gulp-clean-css');

const browserSync = require("browser-sync").create();

const srcPath = "src/"
const distPath = "dist/"

const path = {
    build: {
        html: distPath,
        css: distPath + "assets/css/",
        js: distPath + "assets/js/",
        img: distPath + "assets/img/",
        fonts: distPath + "assets/fonts/"
    },
    src: {
        html: srcPath + "*.html",
        css: srcPath + "assets/scss/*.scss",
        js: srcPath + "assets/js/*.js",
        img: srcPath + "assets/img/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    watch: {
        html:   srcPath + "**/*.html",
        js:     srcPath + "assets/js/**/*.js",
        css:    srcPath + "assets/scss/**/*.scss",
        img: srcPath + "assets/img/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    clean: "./" + distPath
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        },
        
    });
}


function html() {
    return src(path.src.html, {base: srcPath})
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream());
}

function css() {
    return src(path.src.css, {base: srcPath + "assets/scss/"})
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(autoprefixer())
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream());
}

function js() {
    return src(path.src.js, {base: srcPath + "assets/js/"})
        .pipe(rigger())
        .pipe(uglify())
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream());
}

function img() {
    return src(path.src.img, {base: srcPath + "assets/img/"})
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 60, progressive: true}),
            imagemin.optipng({optimizationLevel: 4}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream());
}

function fonts() {
    return src(path.src.fonts, {base: srcPath + "assets/fonts/"})
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.stream());
}

function clean() {
    return del(path.clean)
}

function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], img)
    gulp.watch([path.watch.fonts], fonts)
}

const build = gulp.series(clean, gulp.parallel(html, css, js, img, fonts))
const watch = gulp.parallel(build, watchFiles, serve)




exports.html = html
exports.css = css
exports.js = js
exports.img = img
exports.fonts = fonts
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch