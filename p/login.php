<?php

requirex('sitemaster.php');

class LoginPage extends SiteMaster {
  protected function getContent() {
    require_script('js/default.js');
    require_style('css/default.css');

    return
      <div>
        <label>email</label>
        <input type="text" name="email" />

        <label>password</label>
        <input type="password" name="password" />

        <br />
        <button
          id="login"
          class="ui-button marginTopLarge">
          Login
        </button>

        <pz:box>
          blah blah
        </pz:box>

        <pz:left-right>
          <div>hello</div>
          <div>there</div>
        </pz:left-right>
      </div>;
  }

  protected function getRightHeader() {
    return '';
  }


}

$p = new LoginPage();
$p->invoke();
