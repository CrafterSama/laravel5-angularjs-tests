<?php
/**
 * Created by PhpStorm.
 * User: Osmium
 * Date: 08/24/2015
 * Time: 1:28 PM
 */

define("HOST", "localhost");
define("POST", 27017);
define("DB", "local");
function get_connection(){
    $connecting_string =  sprintf('mongodb://%s:%d/%s', HOST, POST,DB);
    $connection=  new MongoClient($connecting_string);
    $connection->selectDB("local");

    return $connection;
}
