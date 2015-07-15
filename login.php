<?php

//inc
require_once "conn.inc.php";

// const
define( "MAX_USAGE_TIME", 2 );

// vars
$pwd = $_POST["pwd"];
$ua = $_SERVER["HTTP_USER_AGENT"];
$err = 0;

// salvo tentativo di accesso con una pwd
// (scopo quello di tenere traccia di medici sbadati e/o furbetti e dei device usati per debug, non quello di log per attacchi)
$stmt = $dbh->prepare( "INSERT INTO `TNM_access` ( `time`, `ua`, `pwd` ) VALUES ( NOW(), :ua, :pwd )" );
$stmt->bindParam( ":ua", $ua );
$stmt->bindParam( ":pwd", $pwd );
$stmt->execute();

// controllo pwd
$stmt = $dbh->prepare( "SELECT * FROM `TNM_pwd` WHERE `pwd` = :pwd" );
$stmt->bindParam( ":pwd", $pwd );
$stmt->execute();
if( !$row = $stmt->fetch( PDO::FETCH_ASSOC ) ){
	$err = -1;  // pwd inesistente
} else{
	if( $row["disposable"] ){  // se non master pwd
		$usedTime = $row["used"];
		if( $usedTime >= MAX_USAGE_TIME ){
			$err = -2;  // pwd non più usabile
		} else{
			// setto pwd come usata questa volta
			$stmt = $dbh->prepare( "UPDATE `TNM_pwd` SET `used` = ( `used` + 1 ) WHERE `pwd` = :pwd" );
			$stmt->bindParam( ":pwd", $pwd );
			$stmt->execute();
		}
	}
}

// return
echo json_encode( $err === 0 ? 'ok' : 'ko' );

?>