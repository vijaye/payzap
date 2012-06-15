<?php

requirex('lib/WebController.php');
requirex('lib/payments/AllPaymentOptions.php');

class PaymentOptionsAjaxPage extends WebController {
  protected function getResponse() {
    $method = idx($this->getRequest(), 'method');
    if (!$method) {
      return $this->getErrorResponse();
    }

    switch ($method) {
      case 'add_options':
        return $this->getAddOptions();
    }

    return '';
  }

  protected function getErrorResponse() {
    return 'Invalid Ajax Request';
  }

  protected function getAddOptions() {
    $all_options = AllPaymentOptions::getAllPaymentOptions();
    $response = array();

    foreach ($all_options as $option) {
      $list_item = AllPaymentOptions::getPaymentListItem($option);
      $response[$option] = array(
        'list_item' => $list_item->__toString()
      );
    }

    return json_encode($response);
  }
}

$p = new PaymentOptionsAjaxPage();
$p->invoke();