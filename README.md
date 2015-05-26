# GintonicCMS Application Skeleton

[![Latest Stable Version](https://poser.pugx.org/gintonicweb/app/v/stable)](https://packagist.org/packages/gintonicweb/app) [![Total Downloads](https://poser.pugx.org/gintonicweb/app/downloads)](https://packagist.org/packages/gintonicweb/app) [![Latest Unstable Version](https://poser.pugx.org/gintonicweb/app/v/unstable)](https://packagist.org/packages/gintonicweb/app) [![License](https://poser.pugx.org/gintonicweb/app/license)](https://packagist.org/packages/gintonicweb/app)

A skeleton for creating applications with [GintonicCMS](http://cms.gintonicweb.com)

The cms source code can be found here: [gintonicweb/GintonicCMS](https://github.com/gintonicweb/GintonicCMS).

## Installation

1. Download [Composer](http://getcomposer.org/doc/00-intro.md) or update `composer self-update`.
2. Run `php composer.phar create-project gintonicweb/app="dev-master" [app_name]`.

If Composer is installed globally, run
```bash
composer create-project gintonicweb/app="dev-master" [app_name]
```

You should now be able to visit the path to where you installed the app and see
the setup traffic lights.

## Configuration

Read and edit `config/app.php` and setup the 'Datasources' and any other
configuration relevant for your application.
