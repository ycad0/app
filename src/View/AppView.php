<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link      http://cakephp.org CakePHP(tm) Project
 * @since     3.0.0
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */
namespace App\View;

use Cake\View\View;
use Cake\Core\Plugin;
use Cake\Utility\Inflector;

/**
 * App View class
 */
class AppView extends View
{
    /**
     * This method have been overrided to allow the AppController
     * to override a plugin layout in all circumstances. The
     * default behavior of cakephp would load the plugins' layout
     * for plugin controllers, even though our app controller 
     * specifies a name without the plugin prefix.
     */
    protected function _getLayoutFileName($name = null)
    {
        if ($name === null) {
            $name = $this->layout;
        }
        $subDir = null;

        if ($this->layoutPath !== null) {
            $subDir = $this->layoutPath . DS;
        }
        list($plugin, $name) = $this->pluginSplit($name, false);

        $layoutPaths = $this->_getSubPaths('Layout' . DS . $subDir);

        foreach ($this->_paths($plugin) as $path) {
            foreach ($layoutPaths as $layoutPath) {
                $currentPath = $path . $layoutPath;
                if (file_exists($currentPath . $name . $this->_ext)) {
                    return $this->_checkFilePath($currentPath . $name . $this->_ext, $currentPath);
                }
            }
        }
        throw new Exception\MissingLayoutException([
            'file' => $layoutPaths[0] . $name . $this->_ext
        ]);
    }
}
