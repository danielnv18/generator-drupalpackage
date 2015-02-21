<?php
$parent_config = 'DEV';
$databases = array(
  'default' =>
    array(
      'default' =>
      array(
        'database' => '<%= projectName %>',
        'username' => 'root',
        'password' => 'root',
        'host' => 'localhost',
        'port' => '3306',
        'driver' => 'mysql',
        'prefix' => '<%= projectName %>_',
    ),
  ),
);

error_reporting(E_ALL & (~E_STRICT));
$conf['file_temporary_path'] = '/tmp';
$conf['file_private_path'] = 'sites/default/files/private';
