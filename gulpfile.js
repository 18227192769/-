var gulp = require("gulp");

// 压缩html -- gulp-htmlclean
var HtmlClean = require("gulp-htmlclean");
// 压缩图片 -- gulp-imagemin
var ImageMin = require("gulp-imagemin");
// 压缩js  -- gulp-uglify
var Uglify = require("gulp-uglify");
// 去掉js中的调试语句 -- gulp-strip-debug
var StripDebug = require("gulp-strip-debug");
// 将less转换成css -- gulp-less
var less = require("gulp-less");
// 压缩css
var CssClean = require("gulp-clean-css");
// 自动添加css3兼容性前缀 -- gulp-postcss && autoprefixer && postcss-cssnext
var PostCss = require("gulp-postcss");
var CssNext = require("postcss-cssnext");
// 开启服务器 -- gulp-connect
var connect = require("gulp-connect");



var folder = {
    src : 'src/',
    dist : 'dist/'
}

// 设置环境变量
process.env.NODE_ENV = "development"
//获取环境变量
var env = process.env.NODE_ENV == "development"
console.log(env);

//启动gulp项目后会自动执行默认任务(default)
// gulp.task() -- 创建任务
// 1.任务的名称, 2.任务体
gulp.task("html", function () {
    // gulp.src  -- 读取文件流
    // .pipe     -- 将文件流放入管道处理
    // gulp.dest -- 输出文件
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
        if (!env) {
            page.pipe(HtmlClean())
        } 
        page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("image", function () {
    var page = gulp.src(folder.src + "image/*")
        if (!env) {
            page.pipe(ImageMin())
        }
        page.pipe(gulp.dest(folder.dist + "image/"))
})

gulp.task("css", function () {
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(PostCss([CssNext()]))
        if (!env) {
            page.pipe(CssClean())
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})


gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        
        if (!env) {
            page.pipe(StripDebug()).pipe(Uglify())
        }
        page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("server", function () {
    connect.server({
        // 自动刷新浏览器
        livereload : true,
        port : "8086"
    })
})

gulp.task("watch", function () {
    // 监听html目录下文件的变化
    gulp.watch(folder.src + "html/*", ["html"]);
    
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"]);
})


gulp.task("default", ["html", "css", "js", "image", "server", "watch"], function () {
    console.log("over");
})