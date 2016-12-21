<?php
/**
 * Created by PhpStorm.
 * User: Osmium
 * Date: 08/24/2015
 * Time: 1:54 PM
 */
if(!class_exists("Persona")){
    include "persona.inc.php";
}
if(!function_exists("get_connection")){
    include "mongo.php";

}

class PersonaModel{
    private $persona;
    private $connecion;
    private $CPersona;
    /**
     * PersonaModel constructor.
     * @param $persona
     */
    public function __construct(Persona $persona = null)
    {
        if($persona)
            $this->persona = $persona;
        $this->connecion = get_connection();
        $this->connecion->selectDB("local");
        $this->CPersona = $this->connecion->selectCollection("local", "persona");//selecciona la coleccion
    }

    public static function bootrapPersona($data){
        $persona = new Persona($data["identificacion"],
                            $data["nombre"],
                            $data["edad"],
                            $data["direccion"],
                            isset($data["id"])?$data["id"]:0
        );
        return $persona;
    }
    public static function bootrapPersonaMongo($data){
        $persona = new Persona($data["identificacion"],
            $data["nombre"],
            $data["edad"],
            $data["direccion"],
            $data["_id"]->{'$id'});
        return $persona;
    }
    /**
     * @return mixed
     */
    public function getPersona()
    {
        return $this->persona;
    }

    /**
     * @param mixed $persona
     */
    public function setPersona(Persona $persona)
    {
        $this->persona = $persona;
    }

    function crear_persona(Persona $data){
        $mapa_persona = $data->toCollection();
        $this->CPersona->insert($mapa_persona);
        return TRUE;
    }

    function borrar_persona($id){
        $this->CPersona->remove(array('_id' => new MongoId($id)));
        return TRUE;
    }

    function get_personas(){
        $query = $this->CPersona->find();
        $lista = array();
        foreach($query as $row){
            $persona = self::bootrapPersonaMongo($row);
            array_push($lista, $persona->toCollection(TRUE));
        }
        return $lista;
    }

    function actualizar_persona(Persona $data){
        $pmongo = $this->CPersona->findOne(array('_id' => new MongoId($data->getId())));
        $pbjmongo= self::bootrapPersona($pmongo);
        //actualizo campos
        $pbjmongo->setIdentificacion($data->getIdentificacion());
        $pbjmongo->setNombre($data->getNombre());
        $pbjmongo->setEdad($data->getEdad());
        $pbjmongo->setDireccion($data->getDireccion());
        //actualizar en mongo
        $this->CPersona->update(array('_id' => new MongoId($data->getId())), array('$set'=>$pbjmongo->toCollection()));
        return TRUE;
    }

    public function get_persona($id){
        return $this->CPersona->findOne(array('_id' => new MongoId($id)));
    }

}

