var dotenv = require('dotenv').load();
var gulp = require('gulp');
var del = require('del');                                             //删除
var minhtml = require("gulp-minify-html");                            //压缩html                                      
var concat = require('gulp-concat');                                  //多个文件合并为一个
var templateCache = require('gulp-angular-templatecache');            //
var wrap = require("gulp-wrap");                                      //
var minify = require('gulp-minify-css');                              //压缩css
var minjs = require('gulp-uglify');                                   //压缩js
var rename = require('gulp-rename');                                  //重命名
var nodemon = require('gulp-nodemon');                                //node本地服务
var notify = require('gulp-notify');                                  //提示信息
var less = require('gulp-less');                                      //编译less
var replace = require("gulp-replace");                                //替换字符串
var zip = require('gulp-zip');                                        //打包
var gulpSequence = require('gulp-sequence');                          //控制tasl顺序

var files = {
  app: ['./app/index.module.js', './app/**/*.js'],
  less:['./public/less/**/**.less'],
  styles: ['./public/style/**/**.css'],
  html: ['./app/**/*.html']
}

//gulp 默认任务
gulp.task('default', ['concat', "css"], function () {
  gulp.watch(files.app, ['concat']);
  gulp.watch(files.less, ['css']);
})

//node本地服务
gulp.task('run',function(){
	nodemon({
		script:'index.js',
	})
})

//angularJs控制器合并
gulp.task('concat', function () {
  return gulp.src(files.app)
    .pipe(wrap('(function(){\n"use strict"\n<%= contents %>\n})();'))
    .pipe(concat('app.js'))
    // .pipe(replace(/console.log(.+)/g,""))
    .pipe(gulp.dest('public/'))
})

// 合并、压缩、重命名css
gulp.task('css', function () {
  return gulp.src(['./public/less/**/**.less'])
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minify())
    .pipe(gulp.dest('public/'))
});
