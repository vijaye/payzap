<?php

// phpinfo();
requirex('sitemaster.php');
requirex('lib/payments/AllPaymentOptions.php');

class DefaultPage extends SiteMaster {
  protected function getContent() {
    require_script('js/default.js');
    require_script('js/listbox.js');
    require_script('js/popup.js');
    require_script('js/dialog.js');
    require_style('css/listbox.css');

    return
      <div>
        <div>{get_data(1, 'test')}</div>

        <button
          id="addPaymentButton"
          class="ui-button"
          onclick="DefaultPage.showPaymentOptionsPicker()">
          Add Payment Option
        </button>
        {$this->getPaymentPickerPopup()}
      </div>;
  }

  protected function getRightHeader() {
    return
      <div>
        {$this->getViewerContext()->getName()}
      </div>;
  }

  protected function getPaymentPickerPopup() {
    $all_options = AllPaymentOptions::getAllPaymentOptions();
    $popup =
      <div id="pickerPopup" class="popup hidden_elem" />;

    foreach ($all_options as $option) {
      $click_handler = "DefaultPage.addPaymentOption('$option')";
      $list_item =
        <div class="list-item" onclick={$click_handler}>
          {AllPaymentOptions::getPaymentListItem($option)}
        </div>;
      $popup->appendChild($list_item);
    }

    return $popup;
  }
}

$p = new DefaultPage();
$p->invoke();
