"use strict";

const gulp = require("gulp"),
	webpack = require("webpack-stream"),
	browsersync = require("browser-sync"),
	dist = "./dist/";

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
		.pipe(gulp.dest(dist))
		.pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
		.pipe(webpack(require("./webpack.dev.config.js")))
		.pipe(gulp.dest(dist))
		.pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
		.pipe(gulp.dest(dist + "/assets"))
		.pipe(browsersync.stream());
});

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
		.pipe(webpack(require("./webpack.prod.config.js")))
		.pipe(gulp.dest(dist));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets"));
gulp.task("default", gulp.series("build-js", gulp.parallel("watch", "build")));