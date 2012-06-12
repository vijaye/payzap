<?php

// phpinfo();
require 'sitemaster.php';

class DefaultPage extends SiteMaster {
  protected function getContent() {
    return get_data(1, 'test');
    return <div>lsdkjflsdk</div>;
  }
}

$p = new DefaultPage();
$p->invoke();
