const project_folder = "dist";
const source_folder = "src";

const path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        icons: project_folder + "/icons/",
        fonts: project_folder + "/fonts/",
        mailer: project_folder + "/mailer/",
        favicons: project_folder + "/favicons/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
        icons: source_folder + "/icons/**/*.+(png|jpg|gif|ico|svg|webp)",
        fonts: source_folder + "/fonts/**/*.{ttf,eot,woff,woff2}",
        mailer: source_folder + "/mailer/**/*.php",
        favicons: source_folder + "/favicons/**/*",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
        icons: source_folder + "/icons/**/*.+(png|jpg|gif|ico|svg|webp)",
        mailer: source_folder + "/mailer/**/*.php",
        favicons: source_folder + "/favicons/**/*",
    },
    clean: "./" + project_folder + "/"
}

const {src, dest} = require('gulp'),
      gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      fileinclude = require('gulp-file-include'),
      htmlmin = require('gulp-htmlmin'),
      del = require('del'),
      scss = require('gulp-sass')(require('sass')),
      rename = require("gulp-rename"),
      autoprefixer = require("gulp-autoprefixer"),
      cleanCSS = require('gulp-clean-css'),
      gcmq = require('gulp-group-css-media-queries'),
      uglify = require('gulp-uglify-es').default,
      imagemin = require('gulp-imagemin');

function server() {
    browserSync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    });
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.icons], icons);
    gulp.watch([path.watch.mailer], mailer);
    gulp.watch([path.watch.favicons], favicons);
}


function html() {
    return gulp.src(path.src.html)
        .pipe(fileinclude())
        .pipe(gulp.dest(path.build.html))
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
}

function css() {
    return gulp.src(path.src.css)
        .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(gcmq())
        .pipe(gulp.dest(path.build.css))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
}

function js() {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: 5,
            optimizationLevel: 3,
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.stream());
}

function icons() {
    return gulp.src(path.src.icons)
        .pipe(gulp.dest(path.build.icons))
        .pipe(browserSync.stream());
}

function fonts() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(browserSync.stream());
}

function mailer() {
    return gulp.src(path.src.mailer)
        .pipe(gulp.dest(path.build.mailer))
        .pipe(browserSync.stream());
}

function favicons() {
    return gulp.src(path.src.favicons)
        .pipe(gulp.dest(path.build.favicons))
        .pipe(browserSync.stream());
}

function clean() {
    return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(fonts, icons, images, js, css, html, mailer, favicons));
const watch = gulp.parallel(build, watchFiles, server);


exports.fonts = fonts;
exports.icons = icons;
exports.images = images;
exports.js = js;
exports.css = css;
exports.mailer = mailer;
exports.favicons = favicons;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
