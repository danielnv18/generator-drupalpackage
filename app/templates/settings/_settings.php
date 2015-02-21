<?php


final class HierarchicalConfigLoader
{
  public static function loadConfig()
  {
    self::validateRequest();
    $environment = getenv('APPLICATION_ENV');
    if ($environment === false || $environment === null) {
      /**
      * In case you have several enviroments, you should un-comment and change it
      * the following code according to your needs.
      */
      /*
      $host = $_SERVER['HTTP_HOST'];
      if ($host == 'dev.<%= projectName %>com') {
        $environment = 'DEV';
      } else if ($host == 'qa.<%= projectName %>.com') {
        $environment = 'QA';
      } else {
        $environment = 'LOCAL';
      }
      */

      $environment = 'LOCAL';
    }

    $environment = preg_replace('/[^A-Za-z0-9_-]/', '', $environment);

    foreach (self::getConfigMapForEnvironment($environment) as $key => $value) {
      $GLOBALS[$key] = $value;
    }
  }

  private static function arrayMergeRecursiveDistinct(array $array1, array $array2)
  {
    $merged = $array1;

    foreach ($array2 as $key => &$value) {
      if (is_array($value) && isset ($merged [$key]) && is_array($merged[$key])) {
        $merged [$key] = self::arrayMergeRecursiveDistinct($merged[$key], $value);
      } else {
        $merged [$key] = $value;
      }
    }

    return $merged;
  }

  private static function getConfigMapForEnvironment($environment)
  {
    $configMap = array();

    do {
      $environmentConfig = self::getConfigVariables($environment);

      if (array_key_exists('parent_config', $environmentConfig)) {
        $environment = $environmentConfig['parent_config'];
        unset($environmentConfig['parent_config']);
      } else {
        $environment = null;
      }

      $configMap[] = $environmentConfig;
    } while (!($environment === null || $environment === false));

    $mergedMap = array();
    $configMap = array_reverse($configMap);

    foreach ($configMap as $config) {
      $mergedMap = self::arrayMergeRecursiveDistinct($mergedMap, $config);
    }

    foreach ($mergedMap as $key => $config) {
      if (isset($GLOBALS[$key]) && is_array($GLOBALS[$key])) {
        $mergedMap[$key] = self::arrayMergeRecursiveDistinct($GLOBALS[$key], $config);
      }
    }

    return $mergedMap;
  }

  private static function getConfigVariables($environment)
  {
    /** @noinspection PhpIncludeInspection */
    if (!file_exists(sprintf('%s/config/config_%s.php', __DIR__, $environment)) && $environment === 'LOCAL') {
      $environment = 'local';
    }
    require_once sprintf('%s/config/config_%s.php', __DIR__, $environment);

    $importedVariables = get_defined_vars();
    unset($importedVariables['environment']);

    return $importedVariables;
  }

  private static function getTrustedProxies()
  {
    return array('127.0.0.1');
  }

  private static function validateRequest()
  {
    if (!isset($_SERVER['REMOTE_ADDR']) || !in_array($_SERVER['REMOTE_ADDR'], self::getTrustedProxies())) {
      return;
    }

    if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https') {
      $_SERVER['HTTPS'] = 'on';
    }

    if (isset($_SERVER['HTTP_X_FORWARDED_HOST'])) {
      $_SERVER['HTTP_HOST'] = $_SERVER['HTTP_X_FORWARDED_HOST'];
    }

  }
}

HierarchicalConfigLoader::loadConfig();
