<?php
/**
 * GintonicCMS
 * Copyright (c) Gintonic Web (http://gintonicweb.com)
 *
 * Licensed under The GPL 2.0  License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Gintonic Web, Inc. (http://gintonicweb.com)
 * @link          http://cms.gintonicweb.com GintonicCMS Project
 * @since         0.0.0
 * @license       https://www.gnu.org/licenses/gpl-2.0.html GPL 2.0 License
 */

use Cake\Cache\Cache;
use Cake\Core\Configure;
use Cake\Datasource\ConnectionManager;
use Cake\Error\Debugger;
use Cake\Network\Exception\NotFoundException;

$this->helpers()->load('GintonicCMS.Require');
$this->Require->req('app/popover');
$this->layout = 'GintonicCMS.bare';
?>

<div class="jumbotron">
    <div class="container text-center">
        <?= $this->Html->image('GintonicCMS.gintonic-white.png',[
            'class' => 'img-responsive center-block title-logo',
            'id' => 'title-logo'
        ]); ?>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <p class="lead">
                   Built on top of CakePHP 3, GintonicCMS provides a robust and extensible core for your apps by wrapping powerful tools and a seamless base. 
                </p>
            </div>
        </div>
    </div>
</div>
<div class="container">
    <h2>GintonicCMS Installation</h2>
    <div class="row text-center">
        <div class="col-md-3">
            <h3>Database</h3>
            <?php
                try {
                    $connection = ConnectionManager::get('default');
                    $connected = $connection->connect();
                } catch (Exception $connectionError) {
                    $connected = false;
                    $errorMsg = $connectionError->getMessage();
                    if (method_exists($connectionError, 'getAttributes')):
                        $attributes = $connectionError->getAttributes();
                        if (isset($errorMsg['message'])):
                            $errorMsg .= '<br />' . $attributes['message'];
                        endif;
                    endif;
                }
            ?>
            <?php if ($connected): ?>
                <div class="alert alert-success">
                    <p>GintonicCMS is able to connect to the database.</p>
                </div>
            <?php else: ?>
                <p>
                    While a database setup is not required, we imagine that most 
                    applications will use one.
                </p>
                <p>
                    <?= $this->Html->link(
                        'Configure Database',
                        ['controller' => 'settings', 'action' => 'databaseSetup'],
                        ['class' => 'btn btn-lg btn-block btn-primary']
                    )?>
                </p>
                <p>Current status: 
                    <a class="btn btn-xs btn-danger" 
                        href="javascript:;"  
                        data-toggle="popover" 
                        title="Unable to connect" 
                        data-content="<?= $errorMsg ?>">
                            Unable to connect
                    </a>
                </p>
            <?php endif; ?>
        </div>
        <div class="col-md-3">
            <h3>GintonicCMS core</h3>
            <?php
                $coreInstall = "TODO: validate core install"
            ?>
            <?php if (empty($coreInstall)): ?>
                <div class="alert alert-success">
                    <p>GintonicCMS core is correctly installed.</p>
                </div>
            <?php else: ?>
                <p>
                    To benefit from GintonicCMS core features you need to load
                    our database schema and create an admin account.
                </p>
                <p>
                    <?= $this->Html->link(
                        'Install GintonicCMS',
                        ['controller' => 'settings', 'action' => 'createAdmin'],
                        ['class' => 'btn btn-lg btn-block btn-primary']
                    )?>
                </p>
                <p>Current status: 
                    <a class="btn btn-xs btn-danger" 
                        href="javascript:;"  
                        data-toggle="popover" 
                        title="Core not installed" 
                        data-content="<?= $coreInstall ?>">
                            Not installed
                    </a>
                </p>
            <?php endif; ?>
        </div>
        <div class="col-md-3">
            <h3>Website Config</h3>
            <?php
                $websiteConfig = 'TODO: check for config values';
            ?>
            <?php if (empty($websiteConfig)): ?>
                <div class="alert alert-success">
                    <p>Website is correctly configured</p>
                </div>
            <?php else: ?>
                <p>
                    Setup your default website name, admin email address and
                    the other default configuration values for your website.
                </p>
                <p>
                    <?= $this->Html->link(
                        'Setup Website Config',
                        ['controller' => 'settings', 'action' => 'setupVariable'],
                        ['class' => 'btn btn-lg btn-block btn-primary']
                    )?>
                </p>
                <p>Current status: 
                    <a class="btn btn-xs btn-danger" 
                        href="javascript:;"  
                        data-toggle="popover" 
                        title="Not configured yet" 
                        data-content="<?= $websiteConfig ?>">
                            Not configured
                    </a>
                </p>
            <?php endif; ?>
        </div>
        <div class="col-md-3">
            <h2></h2>
            <h3>Assets Builder</h3>
            <?php
                $assetsErrors = '';
                if (!is_writable(WWW_ROOT)) {
                    $assetsErrors .= 'Your webroot directory is NOT writable.';
                }
                if (is_writable(ASSETS)) {
                    $assetsErrors .= 'Your assets directory is NOT writable.';
                }
            ?>
            <?php if (empty($assetsErrors)): ?>
                <div class="alert alert-success">
                    <p>The assets builder is correctly setup</p>
                </div>
            <?php else: ?>
                <p>
                    Setup your default website name, admin email address and
                    the other default configuration values for your website.
                </p>
                <p>
                    <?= $this->Html->link(
                        'Build Assets',
                        ['controller' => 'settings', 'action' => 'assets'],
                        ['class' => 'btn btn-lg btn-block btn-primary']
                    );?>
                </p>
                <p>Current status: 
                    <a class="btn btn-xs btn-danger" 
                        href="javascript:;"  
                        data-toggle="popover" 
                        title="Assets builder is not installed" 
                        data-content="<?= $assetsErrors ?>">
                            Not installed
                    </a>
                </p>
            <?php endif; ?>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-md-12">
            <?php
            if (Configure::read('debug')):
                Debugger::checkSecurityKeys();
            endif;
            ?>
            <p id="url-rewriting-warning" style="background-color:#e32; color:#fff;display:none">
                URL rewriting is not properly configured on your server.
                1) <a target="_blank" href="http://book.cakephp.org/3.0/en/installation/url-rewriting.html" style="color:#fff;">Help me configure it</a>
                2) <a target="_blank" href="http://book.cakephp.org/3.0/en/development/configuration.html#general-configuration" style="color:#fff;">I don't / can't use URL rewriting</a>
            </p>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <h2>PHP setup</h2>
            <?php if (version_compare(PHP_VERSION, '5.4.16', '>=')): ?>
                <div class="alert alert-success">
                    <p>Your version of PHP is 5.4.16 or higher.</p>
                </div>
            <?php else: ?>
                <div class="alert alert-danger">
                    <p>Your version of PHP is too low. You need PHP 5.4.16 or higher to use CakePHP.</p>
                </div>
            <?php endif; ?>

            <?php if (extension_loaded('mbstring')): ?>
                <div class="alert alert-success">
                    <p>Your version of PHP has the mbstring extension loaded.</p>
                </div>
            <?php else: ?>
                <div class="alert alert-danger">
                    <p>Your version of PHP does NOT have the mbstring extension loaded.</p>;
                </div>
            <?php endif; ?>

            <?php if (extension_loaded('openssl')): ?>
                <div class="alert alert-success">
                    <p>Your version of PHP has the openssl extension loaded.</p>
                </div>
            <?php elseif (extension_loaded('mcrypt')): ?>
                <div class="alert alert-success">
                    <p>Your version of PHP has the mcrypt extension loaded.</p>
                </div>
            <?php else: ?>
                <div class="alert alert-danger">
                    <p>Your version of PHP does NOT have the openssl or mcrypt extension loaded.</p>
                </div>
            <?php endif; ?>

            <?php if (extension_loaded('intl')): ?>
                <div class="alert alert-success">
                    <p>Your version of PHP has the intl extension loaded.</p>
                </div>
            <?php else: ?>
                <div class="alert alert-danger">
                    <p>Your version of PHP does NOT have the intl extension loaded.</p>
                </div>
            <?php endif; ?>
        </div>
        <div class="col-md-6">
            <h2>Caching</h2>
            <?php if (is_writable(TMP)): ?>
                <div class="alert alert-success">
                    <p>Your tmp directory is writable.</p>
                </div>
            <?php else: ?>
                <div class="alert alert-danger">
                    <p>Your tmp directory is NOT writable.</p>
                </div>
            <?php endif; ?>

            <?php if (is_writable(LOGS)): ?>
                <div class="alert alert-success">
                    <p>Your logs directory is writable.</p>
                </div>
            <?php else: ?>
                <div class="alert alert-danger">
                    <p>Your logs directory is NOT writable.</p>
                </div>
            <?php endif; ?>

            <?php $settings = Cache::config('_cake_core_'); ?>
            <?php if (!empty($settings)): ?>
                <div class="alert alert-success">
                    <p>The <em><?= $settings['className'] ?>Engine</em> is being used for core caching. To change the config edit config/app.php</p>
                </div>
            <?php else: ?>
                <div class="alert alert-danger">
                    <p>Your cache is NOT working. Please check the settings in config/app.php</p>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <h2>GintonicCMS</h2>
            <p>Built on top of CakePHP 3, GintonicCMS provides a robust and extensible core for your apps by wrapping powerful tools and a seamless base.</p>
            <a href="http://cms.gintonicweb.com">http://cms.gintonicweb.com</a>
        </div>
        <div class="col-md-4">
            <h2>CakePHP</h2>
            <p>CakePHP is a rapid development framework for PHP which uses commonly known design patterns like Front Controller and MVC</p>
            <a href="http://cakephp.org">http://cakephp.org</a>
        </div>
        <div class="col-md-4">
            <h2>Bootstrap</h2>
            <p>Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.</p>
            <a href="http://getbootstrap.com">http://getbootstrap.com</a>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <h2>React</h2>
            <p>A javascript library for building user interfaces. React abstracts away the DOM from you, giving a simpler programming model and better performance.</p>
            <a href="https://facebook.github.io/react">https://facebook.github.io/react</a>
        </div>
        <div class="col-md-4">
            <h2>RequireJS</h2>
            <p>RequireJS is a JavaScript file and module loader. RequireJS will improve the speed and quality of your code.</p>
            <a href="http://requirejs.org">http://requirejs.org</a>
        </div>
        <div class="col-md-4">
            <h2>Ratchet</h2>
            <p>A loosely coupled PHP library providing tools to create real time, bi-directional applications between clients and servers over WebSockets.</p>
            <a href="http://socketo.me">http://socketo.me</a>
        </div>
    </div>
</div>
