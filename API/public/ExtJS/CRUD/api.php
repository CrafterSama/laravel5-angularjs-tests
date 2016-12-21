<?php
/**
 * Created by PhpStorm.
 * User: Osmium
 * Date: 08/24/2015
 * Time: 1:28 PM
 */
include "persona.inc.php";
include "persona_model.inc.php";
$persona_model = new PersonaModel();
//bootstrap de app

switch($_REQUEST['op']){
    case 'create':
        $persona = PersonaModel::bootrapPersona($_GET);
        $persona_model->crear_persona($persona);
        header('Content-Type: application/json');
        echo json_encode(array("status"=> TRUE));
        break;
    case 'borrar':
        $persona_model->borrar_persona($_GET['id']);
        header('Content-Type: application/json');
        echo json_encode(array("status"=> TRUE));
        break;
    case 'lista':
        $persona_model->get_personas();
        header('Content-Type: application/json');
        echo json_encode($persona_model->get_personas());

        break;
    case 'update':
        $persona = PersonaModel::bootrapPersona($_GET);
        header('Content-Type: application/json');
        echo json_encode(array("status"=> $persona_model->actualizar_persona($persona)));
        break;
}
