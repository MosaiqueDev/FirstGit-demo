/*
 * @Author: Administrator
 * @Date:   2018-01-29 19:25:23
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-01-29 21:38:44
 */
'use strict';

// 任务1：less编译 压缩 合并
// 任务2：js合并 压缩 混淆
// 任务3：img复制
// 任务4：html压缩

// 在gulpfile中先载入gulp包，因为这个包提供一些API
var gulp = require('gulp');
var less = require('gulp-less');
var csso = require('gulp-csso');

// 注册任务：任务1：less编译 压缩 合并
gulp.task('style', function() {
	// 执行style任务时会执行这里面的代码
	gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
		.pipe(less())
		.pipe(csso())
		.pipe(gulp.dest('dist/styles/'))
		// .pipe(browserSync.reload());
});
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// 任务2：js合并 压缩 混淆
gulp.task('script', function() {
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		// .pipe(browserSync.reload());
});
//3.图片复制
gulp.task('image', function() {
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		// .pipe(browserSync.reload());
});
//4html压缩哟
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('dist/'))
		// .pipe(browserSync.reload());
});

var browserSync = require('browser-sync').create();

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch('src/styles/*.less',['style']).on('change', browserSync.reload);
    gulp.watch('src/scripts/*.js',['script']).on('change', browserSync.reload);
    gulp.watch('src/images/*.*',['image']).on('change', browserSync.reload);
    gulp.watch('src/*.html',['html']).on('change', browserSync.reload);
});