<?php
Class dbObj{
	public static function getConnstring() {

		$servername = "***.***.***.***";
		$username = "**********";
		$password = "**********";
		$dbname = "**********";
		$conn;

		$con = new PDO("mysql:host=$servername;dbname=$dbname;charset=UTF8", $username, $password);
		$con->query("SET NAMES 'utf8'");
		$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		if (mysqli_connect_errno()) {
			printf("Connect failed: %s\n", mysqli_connect_error());
			exit();
		} else {
			$conn = $con;
		}
		return $conn;
	}
}
?>
