const gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var gutil = require('gulp-util');
// var colors = require('colors');  
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var LessAutoprefix = require('less-plugin-autoprefix');
var cleancss = require('gulp-clean-css');
var del = require('delete'); 
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var autoprefix = new LessAutoprefix({
  browsers: ['last 2 versions']
});

//删除中间处理文件
gulp.task('del',['copy'],function(){
    del(['./src/css/*.css'], function(err, deleted) {
        if (err) throw err;
        console.log("delete success");
      });
})
// 复制css 到 public
gulp.task('copy',['cssuglify'],function(){
    return gulp.src('./src/css/*.css')
    .pipe(gulp.dest('./public/css/'));
})
//js处理
gulp.task('js',function(){
    return gulp.src('./src/js/*.js')
    .pipe(uglify({
        //
    })).on('error',errorhandling)
    .pipe(gulp.dest('./public/js'))
})
//css压缩
gulp.task('cssuglify',['less'],function(){
    return gulp.src('./src/css/*.css')
    .pipe(cleancss({

    })).on('error',errorhandling)
    .pipe(gulp.dest('./public/css'))
})
//处理less
gulp.task('less', function () {
  return gulp.src(['./src/less/*.less','!./src/less/_*.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
        plugins:[autoprefix]
    })).on('error', errorhandling)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css'));
});

//实时刷新
gulp.task('server',['del'],function(){
    browserSync.init({
        server:{
            baseDir:'./public'
        }
    });
    gulp.watch('./src/less/*.less', ['del']);
    gulp.watch(['./public/css/*.css','./public/*.html']).on('change',reload);
})

<<<<<<< HEAD
gulp.task('default',['watch']);

=======
>>>>>>> 6759d83eff915bb343a9c58ba0770b1d641a83a2

function errorhandling(err) {
  gutil.log(gutil.colors.red(err.message))
  this.end();
}