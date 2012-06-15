<?php

requirex('lib/WebController.php');

abstract class WebPageController extends WebController {
  protected function init() {
    require_script('js/jquery.js');
    require_script('js/jquery-ui.js');
    require_script('js/jsuri.js');

    require_script('js/utils.js');

    require_style('css/global.css');
    require_style('css/theme/jquery-ui.css');

    onload_register('$("input:submit, button").button();');
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
