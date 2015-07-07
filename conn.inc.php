<?php

// local server
/*define( "DB_HOST", "localhost" );
define( "DB_NAME", "app" );
define( "DB_USR", "altrimedia" );
define( "DB_PWD", "Altri14" );*/

// remote server
define( "DB_HOST", "62.149.150.146" );
define( "DB_NAME", "Sql519698_4" );
define( "DB_USR", "Sql519698" );
define( "DB_PWD", "71f38841" );

$dbh = new PDO( "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USR, DB_PWD );

?>