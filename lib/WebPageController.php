<?php

require 'WebController.php';

abstract class WebPageController extends WebController {
  protected function init() {
    require_script('js/jquery-1.6.2.min.js');
    require_script('js/jquery-ui-1.8.16.custom.min.js');
    require_script('js/jsuri-1.1.0.min.js');
    require_script('js/utils.js');
    require_style('css/global.css');
  }

  public function invoke() {
    $body = $this->getResponse();
    echo "<!doctype html>\n<html>\n";
    echo get_head();
    echo "\n<body>\n";
    echo $body;
    echo "\n";
    echo get_end();
    echo "\n</body>\n";
    echo "</html>\n";
  }
}
