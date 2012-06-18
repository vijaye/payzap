<?php

requirex('lib/DialogController.php');

class StripeForm extends DialogController {
  public function getDialogTitle() {
    return "Stripe";
  }

  public function getDialogBody() {
    return
      <div>
        Stripe
      </div>;
  }

  public function getDialogButtons() {
    return null;
  }
}
