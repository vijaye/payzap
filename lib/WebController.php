<?php

require 'globals.php';

abstract class WebController {
  private
    $request;

  function __construct() {
    $this->request = $_REQUEST;
    $this->init();
  }

  protected function init() {
  }

  public function getRequest() {
    return $this->request;
  }

  abstract protected function getResponse();

  public function invoke() {
    $content = $this->getResponse();
    echo $content;
  }
}
