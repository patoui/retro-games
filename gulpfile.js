var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

//CSS
 elixir(function(mix) {
    mix.styles([
        "../../../node_modules/angular-material/angular-material.min.css",
        "main.css",
    ], 'public/css/app.css');
});

//SASS
elixir(function(mix) {
    mix.sass(
        ['app.scss'],
        'public/css/sass.css'
    );
});

//Scripts
elixir(function(mix) {
    mix.scripts(
        [
            '../../../node_modules/angular/angular.min.js',
            '../../../node_modules/angular-animate/angular-animate.min.js',
            '../../../node_modules/angular-aria/angular-aria.min.js',
            '../../../node_modules/angular-material/angular-material.min.js',
            '../../../node_modules/angular-mocks/angular-mocks.js',
            '../../../node_modules/angular-route/angular-route.min.js',
            '../../../node_modules/angular-sanitize/angular-sanitize.min.js',
            '../../../node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'app/app.js',
            'app/routes/main/mainroutes.js',
            'app/controllers/main/MainCtrl.js',
            'app/controllers/index/IndexCtrl.js',
        ],
        'public/js/app.js'
    );
});

//Fonts
elixir(function(mix) {
    mix.copy('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot', 'public/fonts/MaterialIcons-Regular.eot');
    mix.copy('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ijmap', 'public/fonts/MaterialIcons-Regular.ijmap');
    mix.copy('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.svg', 'public/fonts/MaterialIcons-Regular.svg');
    mix.copy('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf', 'public/fonts/MaterialIcons-Regular.ttf');
    mix.copy('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff', 'public/fonts/MaterialIcons-Regular.woff');
    mix.copy('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2', 'public/fonts/MaterialIcons-Regular.woff2');
});