<?php
<?php
$config=array(
    'host' =>'fopuxa8s.2318.dnstoo.com:5509',
    'port'=>'5509',
    'db_user' =>'danzhu0909_f',
    'db_psw' =>'danzhu123',
    'db_name' =>'danzhu0909',
    'db_database'=>'danzhu0909'
);
$conn=mysql_connect($config['host'],$config['db_user'],$config['db_psw']);
if(!$conn){
    echo("23");
}
echo("1234");
$result=mysql_select_db ($config['db_database']);
$sql = "SELECT * FROM `websites`";
$result = mysql_query($sql);
$arr = array();
while($res = mysql_fetch_array($result)){
    $arr[] = (json_encode($res));
}
echo (json_encode($arr));


mysql_close($conn)
?>
?>