<?php

require_once 'globals.php';

class ViewerContext {
  const ASSOC_VIEWER_CONTEXT = 'viewer_context';

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
    $data = get_data($this->userId, self::ASSOC_VIEWER_CONTEXT);

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
    set_data($this->userId, self::ASSOC_VIEWER_CONTEXT, $data);
  }

  public static function updateFake() {
    $data = array(
      'name' => 'Vijaye Raji',
      'email' => 'vijaye@vijaye.com',
    );
    set_data(1, self::ASSOC_VIEWER_CONTEXT, $data);
  }
}
