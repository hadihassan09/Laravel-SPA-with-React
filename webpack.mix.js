const mix = require('laravel-mix');
mix.webpackConfig({
    "resolve": {
        "alias": {
            "react": "preact/compat",
            "react-dom": "preact/compat"
        }
    }
});

mix.babelConfig({
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ],
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .react('resources/js/expenseTracker/app.js', 'public/js/expenseTracker/')
    .sass('resources/sass/expenseTracker/app.scss', 'public/css/expenseTracker/')
    .sass('resources/sass/app.scss', 'public/css');
