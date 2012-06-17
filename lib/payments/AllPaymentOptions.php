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
        return self::buildListItem(
          'paypal_48.png',
          'Paypal',
          'https://www.paypal.com/webapps/mpp/merchant');

      case 'zong':
        return self::buildListItem(
          'zong_48.png',
          'Zong',
          'https://my.zong.com/ZPlusConsumerConsole/login/consumerLogin');

      case 'stripe':
        return self::buildListItem(
          'stripe_48.png',
          'Stripe',
          'https://manage.stripe.com/login');
    }

    return '';
  }

  private static function buildListItem($img, $title, $link = null) {
    return
      <div class="clearfix">
        <img src={'/img/modes/' . $img} class="left" />
        <div style="margin-left: 60px;">
          <h4>{$title}</h4>
          <div class="subtitle">
            <a href={$link} target="_blank">
              <span class="ui-icon ui-icon-newwin left"></span>
              {$link}
            </a>
          </div>
        </div>
      </div>;
  }
}