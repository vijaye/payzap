<?php

requirex('lib/WebController.php');
requirex('lib/payments/AllPaymentOptions.php');
requirex('lib/payments/PaypalForm.php');

class PaymentOptionsAjaxPage extends WebController {
  protected function getResponse() {
    $method = idx($this->getRequest(), 'method');
    if (!$method) {
      return $this->getErrorResponse();
    }

    switch ($method) {
      case 'add_options':
        return $this->getAddOptions();

      case 'get_form':
        return $this->getForm(idx($this->getRequest(), 'option'));

      case 'set_details':
        return $this->setDetails();
    }

    return '';
  }

  protected function getErrorResponse() {
    return 'Invalid Ajax Request';
  }

  protected function getForm($option) {
    switch ($option) {
      case 'paypal':
        return new PaypalForm();
    }
    return '';
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

  protected function setDetails() {
    $request = $this->getRequest();
    $option = idx($request, 'option');

    switch ($option) {
      case 'paypal':
        return PaypalForm::setDetails($this->getViewerContext(), $request);
    }
  }
}

$p = new PaymentOptionsAjaxPage();
$p->invoke();