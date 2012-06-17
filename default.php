<?php

// phpinfo();
requirex('sitemaster.php');

class DefaultPage extends SiteMaster {
  protected function getContent() {
    require_script('js/default.js');
    require_script('js/listbox.js');
    require_style('css/listbox.css');

    return
      <div>
        <div>{get_data(1, 'test')}</div>

        <button
          class="ui-button"
          onclick="DefaultPage.showPaymentOptionsPicker()">
          Add Payment Option
        </button>

        {$this->getPaymentPickerDialog()}
      </div>;
  }

  protected function getRightHeader() {
    return
      <div>
        {$this->getViewerContext()->getName()}
      </div>;
  }

  protected function getPaymentPickerDialog() {
    return
      <div
        id="pickerDialog"
        title="Select a payment option">
        <ol id="pickerList" class="selectable">
        </ol>
      </div>;
  }
}

$p = new DefaultPage();
$p->invoke();
