<?php

requirex('lib/DialogController.php');

class ZongForm extends DialogController {
  public function getDialogTitle() {
    return "Zong";
  }

  public function getDialogBody() {
    return
      <div>
        Zong
      </div>;
  }

  public function getDialogButtons() {
    return null;
  }
}
