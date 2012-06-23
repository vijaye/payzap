<?php

class :pz:box extends :x:element {
  attribute
    string class;
  children (pcdata | %flow)*;

  protected function render() {
    return
      <div
        class={$this->getAttribute('class')}
        style="border: 1px solid #7d9d9c; padding: 2px;">
        {$this->getChildren()}
      </div>;
  }
}

class :pz:left-right extends :x:element {
  children (%flow, %flow);

  protected function render() {
    $children = $this->getChildren();

    return
      <div class="clearfix">
        <div class="left">
          {$children[0]}
        </div>
        <div class="right">
          {$children[1]}
        </div>
      </div>;
  }
}