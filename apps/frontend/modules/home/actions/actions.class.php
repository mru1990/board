<?php

/**
 * home actions.
 *
 * @package    board
 * @subpackage home
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class homeActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
  public function executeIndex(sfWebRequest $request)
  {
    $this->test = "Das ist bloß eine einfache Test-Ausgabe. Wenn du das lesen kannst, funktioniert es hervorragend!";
  }
}
