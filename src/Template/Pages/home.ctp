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
            <button class="btn btn-lg btn-default">Configure Database</button>
        </div>
        <div class="col-md-3">
            <button class="btn btn-lg btn-default">Create Admin Account</button>
        </div>
        <div class="col-md-3">
            <button class="btn btn-lg btn-default">Setup MetaData</button>
        </div>
        <div class="col-md-3">
            <button class="btn btn-lg btn-default">Build Assets</button>
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
            <h2>Database</h2>
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
                    <p>CakePHP is able to connect to the database.</p>
                </div>
            <?php else: ?>
                <div class="alert alert-danger">
                    <p>CakePHP is NOT able to connect to the database.<br /><br /><?= $errorMsg ?></p>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <h2>Gintonic CMS</h2>
            <p>Built on top of CakePHP 3, GintonicCMS provides a robust and extensible core for your apps by wrapping powerful tools and a seamless base.</p>
            <ul>
                <li><a href="http://cms.gintonicweb.com">GintonicCMS documentation</a></li>
                <li><a href="http://gintonicweb.com">Gintonic Web</a></li>
            </ul>
        </div>
        <div class="col-md-4">
            <h2>CakePHP</h2>
            <p>CakePHP is a rapid development framework for PHP which uses commonly known design patterns like Front Controller and MVC</p>
            <ul>
                <li><a href="http://cakephp.org/">CakePHP</a></li>
                <li><a href="http://book.cakephp.org/3.0/en/index.html">Cakephp 3 Documentation</a></li>
            </ul>
        </div>
        <div class="col-md-4">
            <h2>Bootstrap</h2>
            <p>Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.</p>
            <ul>
                <li><a href="http://getbootstrap.com/">Bootstrap</a></li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <h2>ReactJS</h2>
            <p>A javascript library for building user interfaces. React abstracts away the DOM from you, giving a simpler programming model and better performance.</p>
            <ul>
                <li><a href="https://facebook.github.io/react/">React</a></li>
            </ul>
        </div>
        <div class="col-md-4">
            <h2>RequireJS</h2>
            <p>RequireJS is a JavaScript file and module loader. RequireJS will improve the speed and quality of your code.</p>
            <ul>
                <li><a href="http://requirejs.org/">RequireJS</a></li>
            </ul>
        </div>
        <div class="col-md-4">
            <h2>Ratchet</h2>
            <p>A loosely coupled PHP library providing tools to create real time, bi-directional applications between clients and servers over WebSockets.</p>
            <ul>
                <li><a href="http://socketo.me/">Ratchet</a></li>
            </ul>
        </div>
    </div>
</div>
