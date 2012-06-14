<?php

// phpinfo();
requirex('sitemaster.php');

class DefaultPage extends SiteMaster {
  protected function getContent() {
    require_script('js/default.js');
    return
      <div>
        <div>{get_data(1, 'test')}</div>

        <button onclick="DefaultPage.showPaymentOptionsPicker()">
          Add Payment Option
        </button>
      </div>;
  }

  protected function getRightHeader() {
    return
      <div>
        {$this->getViewerContext()->getName()}
      </div>;
  }
}

$p = new DefaultPage();
$p->invoke();
