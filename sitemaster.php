<?php

require 'lib/WebPageController.php';

class SiteMaster extends WebPageController {
  protected function getResponse() {
    require_style('css/site.css');
    return
      <x:frag>
      <div class="topBanner">
        <div class="clearfix header">
          <div class="left">
            <a href="default.php">
              <h1>payzap</h1>
            </a>
          </div>
          <div class="right absRightAlign">
            {$this->getRightHeader()}
          </div>
        </div>
      </div>
      <div id="mainFrame">
        <div>
          {$this->getContent()}
        </div>
        <div id="footer">
          copyright (c) payzap
        </div>
      </div>
      </x:frag>;
  }

  protected function getContent() {
    return 'Content';
  }

  protected function getRightHeader() {
    return 'Right Header';
  }
}
