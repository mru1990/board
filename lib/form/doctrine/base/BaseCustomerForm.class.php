<?php

/**
 * Customer form base class.
 *
 * @method Customer getObject() Returns the current form's model object
 *
 * @package    board
 * @subpackage form
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 29553 2010-05-20 14:33:00Z Kris.Wallsmith $
 */
abstract class BaseCustomerForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'id'           => new sfWidgetFormInputHidden(),
      'category_id'  => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('CustomerCategory'), 'add_empty' => false)),
      'type'         => new sfWidgetFormInputText(),
      'name'         => new sfWidgetFormInputText(),
      'logo'         => new sfWidgetFormInputText(),
      'url'          => new sfWidgetFormInputText(),
      'street'       => new sfWidgetFormInputText(),
      'zip'          => new sfWidgetFormInputText(),
      'city'         => new sfWidgetFormInputText(),
      'description'  => new sfWidgetFormTextarea(),
      'token'        => new sfWidgetFormInputText(),
      'is_public'    => new sfWidgetFormInputCheckbox(),
      'is_activated' => new sfWidgetFormInputCheckbox(),
      'email'        => new sfWidgetFormInputText(),
      'created_at'   => new sfWidgetFormDateTime(),
      'updated_at'   => new sfWidgetFormDateTime(),
    ));

    $this->setValidators(array(
      'id'           => new sfValidatorChoice(array('choices' => array($this->getObject()->get('id')), 'empty_value' => $this->getObject()->get('id'), 'required' => false)),
      'category_id'  => new sfValidatorDoctrineChoice(array('model' => $this->getRelatedModelName('CustomerCategory'))),
      'type'         => new sfValidatorString(array('max_length' => 255, 'required' => false)),
      'name'         => new sfValidatorString(array('max_length' => 255)),
      'logo'         => new sfValidatorString(array('max_length' => 255, 'required' => false)),
      'url'          => new sfValidatorString(array('max_length' => 255, 'required' => false)),
      'street'       => new sfValidatorString(array('max_length' => 255)),
      'zip'          => new sfValidatorString(array('max_length' => 255)),
      'city'         => new sfValidatorString(array('max_length' => 255)),
      'description'  => new sfValidatorString(array('max_length' => 4000)),
      'token'        => new sfValidatorString(array('max_length' => 255)),
      'is_public'    => new sfValidatorBoolean(array('required' => false)),
      'is_activated' => new sfValidatorBoolean(array('required' => false)),
      'email'        => new sfValidatorString(array('max_length' => 255)),
      'created_at'   => new sfValidatorDateTime(),
      'updated_at'   => new sfValidatorDateTime(),
    ));

    $this->validatorSchema->setPostValidator(
      new sfValidatorDoctrineUnique(array('model' => 'Customer', 'column' => array('token')))
    );

    $this->widgetSchema->setNameFormat('customer[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    $this->setupInheritance();

    parent::setup();
  }

  public function getModelName()
  {
    return 'Customer';
  }

}
