'use strict'

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()
const libFolder = 'lib'
const sources = './src/**/*.js'

gulp.task('default', ['build'])

gulp.task('watch', () => {
    gulp.watch([sources, './test/*.js'], ['test'])
})

// Build as a Node library
gulp.task('build', ['lint'], () =>
    gulp.src(sources)
        .pipe($.babel())
        // Output files
        .pipe(gulp.dest(libFolder))
)

gulp.task('test', () =>
    gulp.src('./test/*.js')
        .pipe($.tape())
)

// Lint javascript
gulp.task('lint', () =>
    gulp.src(sources)
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError())
)