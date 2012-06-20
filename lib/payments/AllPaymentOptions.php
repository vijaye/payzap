<?php

class AllPaymentOptions {
  public static function getAllPaymentOptions() {
    return array(
      'paypal',
      'zong',
      'stripe',
    );
  }

  public static function getRegisteredOptions($vc) {
    return get_data($vc->getUserId(), Assocs::PAYMENT_OPTIONS);
  }

  public static function getPaymentListItem($option) {
    switch ($option) {
      case 'paypal':
        return self::buildListItem(
          'paypal_32.png',
          'Paypal',
          'https://www.paypal.com/webapps/mpp/merchant');

      case 'zong':
        return self::buildListItem(
          'zong_32.png',
          'Zong',
          'https://my.zong.com/ZPlusConsumerConsole/login/consumerLogin');

      case 'stripe':
        return self::buildListItem(
          'stripe_32.png',
          'Stripe',
          'https://manage.stripe.com/login');
    }

    return '';
  }

  private static function buildListItem($img, $title, $link = null) {
    return
      <div class="clearfix">
        <img src={'/img/modes/' . $img} class="left" />
        <div style="margin-left: 42px; padding-top: 8px;">
          <h4>{$title}</h4>
        </div>
      </div>;
  }

  public static function getPaymentOptionRow($vc, $option) {
    $img = null;
    $assoc_name = null;
    $title = null;
    switch ($option){
      case 'paypal':
        $img = '/img/modes/paypal_48.png';
        $assoc_name = Assocs::PAYMENT_OPTION_PAYPAL;
        $title = 'Paypal';
        break;
    }

    $row = null;
    if ($assoc_name) {
      $option_data = get_data($vc->getUserId(), $assoc_name);

      $fields = <div style="margin-left: 60px;" />;
      foreach ($option_data as $key => $value) {
        $fields->appendChild(
          <x:frag>
            <label>{$key}</label>
            <h3>{$value}</h3>
          </x:frag>
        );
      }
      $row =
        <div>
          <h2>{$title}</h2>
          <div class="clearfix">
            <img class="left" src={$img} />
            {$fields}
          </div>
        </div>;
    }

    return $row;
  }
}