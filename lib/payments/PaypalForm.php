<?php

requirex('lib/DialogController.php');

class PaypalForm extends DialogController {
  public function getDialogTitle() {
    return "Paypal";
  }

  public function getDialogBody() {
    return
      <div id="paypalForm">
        <label>Dev id</label>
        <input id="paypalDevId" type="text" name="dev_id" />

        <label>API Key</label>
        <input id="paypalApiKey" type="text" name="api_key" />

        <label>API Secret</label>
        <input id="paypalApiSecret" type="text" name="api_secret" />
      </div>;
  }

  public function getDialogButtons() {
    require_script('js/payments/paypal.js');
    return array(
      "OK" => 'Paypal.validateDetailsForm($E("paypalForm"));',
      "Cancel" => '$(this).dialog("close");'
    );
  }
}
