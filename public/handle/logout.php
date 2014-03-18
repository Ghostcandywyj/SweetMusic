<?php
	if (isset($_SESSION["USERID"]) || isset($_SESSION["VISITORID"]))
	{
		session_destroy();
		
	}
	header("Location: ../index.php");
?>
