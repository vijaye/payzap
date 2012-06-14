<?php

require 'xhp/init.php';

$GLOBALS['_scripts'] = array();
$GLOBALS['_styles'] = array();
$GLOBALS['_meta'] = array();
$GLOBALS['_onload'] = array();
$GLOBALS['_connection'] = null;

function get_data($id, $key) {
  $user = 'root';
  $pass = 'seattle';

  $mysqli = new mysqli('localhost', $user, $pass, 'prod');
  if ($mysqli->connect_error) {
    die('DB Connect error: ' . $mysqli->connect_error);
  }

  $data = null;
  $key = $mysqli->real_escape_string($key);

  $result = $mysqli->query(
    "SELECT value FROM assocs WHERE id=$id AND name='$key'"
  );
  if ($result) {
    $obj = $result->fetch_object();
    $data = $obj->value;
    $result->close();
  }
slog($data);
  $mysqli->close();

  $data = unserialize($data);
  return $data;
}

function set_data($id, $key, $value) {
  $user = 'root';
  $pass = 'seattle';

  $value = serialize($value);

  $mysqli = new mysqli('localhost', $user, $pass, 'prod');
  if ($mysqli->connect_error) {
    die('DB Connect error: ' . $mysqli->connect_error);
  }

  $data = null;
  $key = $mysqli->real_escape_string($key);
  $value = $mysqli->real_escape_string($value);

  $mysqli->query(
    "DELETE FROM assocs WHERE id=$id AND name='$key'"
  );
  $result = $mysqli->query(
    "INSERT INTO assocs (id, name, value) ".
    "VALUES ($id, '$key', '$value')"
  );
  if (!$result) {
    die('DB set_value failed: ' . $mysqli->error);
  }

  $mysqli->close();
}

function idx($arr, $key, $default=null) {
  if ($arr && array_key_exists($key, $arr)) {
    return $arr[$key];
  }

  return $default;
}

function requirex($path) {
  require_once($_SERVER["DOCUMENT_ROOT"] . '/' . $path);
}

function require_meta($name, $content) {
  $GLOBALS['_meta'][] =
    "<meta name='$name' content='$content' />";
}

function require_script($script) {
  $GLOBALS['_scripts'][] = $script;
}

function require_style($style) {
  $GLOBALS['_styles'][] = $style;
}

function onload_register($script) {
  $GLOBALS['_onload'][] = $script;
}

function slog($data) {
  $slog = "::: " . $data;
  error_log($slog, 0);
}

function get_head() {
  $head = "<head>\n";
  foreach ($GLOBALS['_meta'] as $m) {
    $head .= $m . "\n";
  }
  foreach ($GLOBALS['_styles'] as $s) {
    $head .= "<link rel='stylesheet' href='" . $s . "' type='text/css' />\n";
  }
  foreach ($GLOBALS['_scripts'] as $s) {
    $head .= "<script src='" . $s . "' type='text/javascript'></script>\n";
  }
  $head .= "</head>\n";
  return $head;
}

function get_end() {
  $end = "<script type='text/javascript'>\n";
  foreach ($GLOBALS['_onload'] as $ol) {
    $end .= $ol . ";\n";
  }
  $end .=  "</script>";
  return $end;
}

function redirect($url) {
  header("Location: " . $url);
}