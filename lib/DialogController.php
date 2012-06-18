<?php

requirex('lib/WebController.php');

abstract class DialogController extends WebController {
  protected function init() {
  }

  public abstract function getDialogTitle();
  public abstract function getDialogBody();
  public function getDialogButtons() {
    return null;
  }

  public function getResponse() {
    $title = $this->getDialogTitle();
    $body = $this->getDialogBody();
    $buttons = $this->getDialogButtons();

    $response = array(
      "ajax_response" => true,
      "command" => "dialog",
      "scripts" => get_onload_scripts(),
      "styles" => get_onload_styles(),
      "title" => $title,
      "body" => is_string($body) ? $body : $body->__toString(),
      "buttons" => $buttons
    );

    return json_encode($response);
  }
}
