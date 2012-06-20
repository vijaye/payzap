<?php

requirex('lib/DialogController.php');

class PaypalForm extends DialogController {
  public function getDialogTitle() {
    return "Paypal";
  }

  public function getDialogBody() {
    $vc = $this->getViewerContext();
    $paypal_data = get_data($vc->getUserId(), Assocs::PAYMENT_OPTION_PAYPAL);

    if ($paypal_data) {
      $dev_id = idx($paypal_data, 'dev_id');
      $api_key = idx($paypal_data, 'api_key');
      $api_secret = idx($paypal_data, 'api_secret');
    }
    return
      <div id="paypalForm">
        <label>Dev id</label>
        <input
          id="paypalDevId"
          type="text"
          class="stretch"
          name="dev_id"
          value={$dev_id} />

        <label>API Key</label>
        <input
          id="paypalApiKey"
          type="text"
          class="stretch"
          name="api_key"
          value={$api_key} />

        <label>API Secret</label>
        <input
          id="paypalApiSecret"
          type="text"
          class="stretch"
          name="api_secret"
          value={$api_secret} />
      </div>;
  }

  public function getDialogButtons() {
    require_script('js/payments/paypal.js');
    return array(
      "OK" => 'Paypal.validateDetailsForm($E("paypalForm"));',
      "Cancel" => '$(this).dialog("close");'
    );
  }

  public static function setDetails($vc, $request) {
    $user_id = $vc->getUserId();
    $option_id = 'paypal';
    $payment_options = get_data($user_id, Assocs::PAYMENT_OPTIONS);
    if (!in_array($option_id, $payment_options)) {
      $payment_options[] = $option_id;
    }

    $paypal_data = array();
    $paypal_data['api_key'] = idx($request, 'api_key');
    $paypal_data['api_secret'] = idx($request, 'api_secret');
    $paypal_data['dev_id'] = idx($request, 'dev_id');

    set_data($user_id, Assocs::PAYMENT_OPTION_PAYPAL, $paypal_data);
    set_data($user_id, Assocs::PAYMENT_OPTIONS, $payment_options);

    return json_encode(array('error_code' => 0));
  }
}
