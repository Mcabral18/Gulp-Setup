//npm install --global gulp-cli
//npm init
//npm install --save-dev gulp

const { src, dest, watch, series, parallel } = require('gulp');
const imageMin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require ('gulp-sass');
const concat = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS 
  functions - Define tasks
  return src - Point to files to use
  dest - Points to folder to destination
  gulp watch - Watch files and folders for changes
*/

//sass compiler 
//npm install --save-dev gulp-sass

function scssCompile(){
  return src('src/sass/**/*.scss')
  .pipe(sass())
  .pipe(dest('dist/css'))
}

// compile js files - Minify js
// npm install --save-dev gulp-uglify

function jsCompile(){
  return src('src/js/**/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(dest('dist/js'))
}

// Compile All HTML files

function htmlCompile(){
  return src('src/*.html')
  .pipe(dest('dist'))
}

// Imagemin files - Optimize Images
// npm install --save-dev gulp-imagemin

function imageCompile(){
  return src('src/images/*')
  .pipe(imageMin())
  .pipe(dest('dist/images'))
}

// gulp watch for changes in your src files

function watchTask(){
  watch(
    ['src/sass/**/*.scss', 'src/js/**/*.js', 'src/*.html', 'src/images/*'],
    series(
      parallel(scssCompile, jsCompile, htmlCompile, imageCompile)
    )
  );
}

// gulp watch - compile the files to the dist folder and watch for changes

exports.watch = series(
  parallel(scssCompile, jsCompile, htmlCompile, imageCompile),
  watchTask
);
