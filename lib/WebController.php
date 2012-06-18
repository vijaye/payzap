<?php

requirex('lib/ViewerContext.php');

abstract class WebController {
  private
    $request,
    $vc;

  function __construct() {
    $this->request = $_REQUEST;

    $this->vc = new ViewerContext();
    $this->init();
  }

  protected function init() {
  }

  public function getRequest() {
    return $this->request;
  }

  public function getViewerContext() {
    return $this->vc;
  }

  abstract protected function getResponse();

  public function invoke() {
    $content = $this->getResponse();
    if ($content instanceof WebController) {
      echo $content->getResponse();
    } else {
      echo $content;
    }
  }
}
