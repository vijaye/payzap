<?php

// phpinfo();
require_once 'sitemaster.php';

class DefaultPage extends SiteMaster {
  protected function getContent() {
    return
      <div>
        <div>{get_data(1, 'test')}</div>

        <button>Add Payment Option</button>
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
