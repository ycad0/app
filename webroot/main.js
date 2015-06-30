requirejs.config({
    baseUrl: '/',
    urlArgs: 'bust=0',
    deps: [
        'lib/AdminLte/webroot/main'
    ],
    paths: {
        bootstrap: 'lib/bootstrap/dist/js/bootstrap',
        jquery: 'lib/jquery/dist/jquery'
    },
    shim: {

    },
    packages: [

    ]
});
