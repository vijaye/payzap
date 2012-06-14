<?php

class AllPaymentOptions {
  public static function getAllPaymentOptions() {
    return array(
      'paypal',
      'zong',
      'stripe',
    );
  }

  public static function getPaymentListItem($type) {
    switch ($type) {
      case 'paypal':
        return
          <div>
            Paypal
          </div>;

      case 'zong':
        return
          <div>
            Zong
          </div>;

      case 'stripe':
        return
          <div>
            Stripe
          </div>;
    }

    return '';
  }
}