<?php
// auto-generated by sfViewConfigHandler
// date: 2013/09/10 20:37:34
$response = $this->context->getResponse();


  $templateName = sfConfig::get('symfony.view.'.$this->moduleName.'_'.$this->actionName.'_template', $this->actionName);
  $this->setTemplate($templateName.$this->viewName.$this->getExtension());



  if (null !== $layout = sfConfig::get('symfony.view.'.$this->moduleName.'_'.$this->actionName.'_layout'))
  {
    $this->setDecoratorTemplate(false === $layout ? false : $layout.$this->getExtension());
  }
  else if (null === $this->getDecoratorTemplate() && !$this->context->getRequest()->isXmlHttpRequest())
  {
    $this->setDecoratorTemplate('' == 'layout' ? false : 'layout'.$this->getExtension());
  }
  $response->addHttpMeta('content-type', 'text/html', false);

  $response->addStylesheet('http://fonts.googleapis.com/css?family=Source+Sans+Pro', '', array ());
  $response->addStylesheet('http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css', '', array ());
  $response->addStylesheet('bootstrap/flatstrap.css', '', array ());
  $response->addStylesheet('bootstrap/flatstrap-responsive.css', '', array ());
  $response->addStylesheet('bootstrap/flatstrap-docs.css', '', array ());
  $response->addStylesheet('main.css', '', array ());
  $response->addJavascript('http://code.jquery.com/jquery.js', '', array ());
  $response->addJavascript('bootstrap.js', '', array ());
  $response->addJavascript('main.js', '', array ());

