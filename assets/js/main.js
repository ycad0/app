require.config({
    baseUrl: '/',
    urlArgs: 'bust=0',
    deps: [
        'vendor/admin-theme/webroot/js/admin-theme',
        'vendor/gintonic-cms/assets/js/main',
        'vendor/twbs-theme/webroot/js/twbs-theme'
    ],
    paths: {
        app: '/js/app',
        'admin-theme': 'vendor/admin-theme/webroot',
        'gintonic-cms': 'vendor/gintonic-cms/webroot',
        'twbs-theme': 'vendor/twbs-theme/webroot',
        'admin-lte': 'vendor/admin-lte/dist/js/app',
        bootstrap: 'vendor/bootstrap/dist/js/bootstrap',
        fontawesome: 'vendor/fontawesome/fonts/*',
        ionicons: 'vendor/ionicons/fonts/*',
        'jsx-requirejs-plugin': 'vendor/jsx-requirejs-plugin/js/jsx',
        react: 'vendor/react/react',
        'requirejs-text': 'vendor/requirejs-text/text',
        jquery: 'vendor/jquery/dist/jquery'
    },
    shim: {
        bootstrap: [
            'jquery'
        ]
    },
    packages: [

    ]
});
