<?php

requirex('lib/Assocs.php');

class ViewerContext {
  private
    $request,
    $userId,
    $name,
    $email;

  function __construct() {
    $this->request = $_REQUEST;
    $this->init();
  }

  protected function init() {
    $this->userId = 1;
    $data = get_data($this->userId, Assocs::VIEWER_CONTEXT);

    if (!$data) {
      die('Bad Viewer Context');
    }
    $this->name = idx($data, 'name');
    $this->email = idx($data, 'email');
  }

  public function getRequest() {
    return $this->request;
  }

  public function getUserId() {
    return $this->userId;
  }

  public function getName() {
    return $this->name;
  }

  public function getEmail() {
    return $this->email;
  }

  public function update() {
    $data = array(
      'name' => $this->name,
      'email' => $this->email,
    );
    set_data($this->userId, Assocs::VIEWER_CONTEXT, $data);
  }

  public static function updateFake() {
    $data = array(
      'name' => 'Vijaye Raji',
      'email' => 'vijaye@vijaye.com',
    );
    set_data(1, Assocs::VIEWER_CONTEXT, $data);
  }
}
