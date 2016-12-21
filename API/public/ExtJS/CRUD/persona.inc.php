<?php
/**
 * Created by PhpStorm.
 * User: Osmium
 * Date: 08/24/2015
 * Time: 1:39 PM
 */



class Persona{
    private $id;
    private $nombre;
    private $edad;
    private $identificacion;
    private $direccion;

    function __construct($identificacion, $nombre, $edad, $direccion, $id=0){
        $this->nombre = $nombre;
        $this->identificacion = $identificacion;
        $this->edad = $edad;
        $this->direccion = $direccion;
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getDireccion()
    {
        return $this->direccion;
    }

    /**
     * @return mixed
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @return mixed
     */
    public function getEdad()
    {
        return $this->edad;
    }

    /**
     * @return mixed
     */
    public function getIdentificacion()
    {
        return $this->identificacion;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    /**
     * @param mixed $edad
     */
    public function setEdad($edad)
    {
        $this->edad = $edad;
    }

    /**
     * @param mixed $identificacion
     */
    public function setIdentificacion($identificacion)
    {
        $this->identificacion = $identificacion;
    }

    /**
     * @param mixed $direccion
     */
    public function setDireccion($direccion)
    {
        $this->direccion = $direccion;
    }

    public function toCollection($withId=FALSE){
        $persona= array("nombre"=>$this->getNombre(),
            "identificacion"=>$this->getIdentificacion(),
            "edad"=>$this->getEdad(),
            "direccion"=>$this->getDireccion()
        );
        if($withId)
            $persona["id"] = $this->getId();
        return $persona;
    }

}
