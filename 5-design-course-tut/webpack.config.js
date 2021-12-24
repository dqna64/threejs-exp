/**
 * Run webpack with this file's config options on cli using:
 * $ ./node_modules/.bin/webpack
 * Alternatively specify these options manually:
 * $ ./node_modules/.bin/webpack main.js --mode=development
 * where main.js is the entry point.
 * Output vanilla JS file is named dist/main.js by default.
 */
module.exports = {
    mode: 'development',
    entry: './main.js',
    output: {
        filename: 'main.js',
        publicPath: 'dist',
    }
}