<?php
header("Content-type:text/html;charset=utf-8");
function _encode($arr)
{
  $na = array();
  foreach ( $arr as $k => $value ) {
    $na[_urlencode($k)] = _urlencode ($value);
  }
  return addcslashes(urldecode(json_encode($na)),"\r\n");
}

function _urlencode($elem)
{
  if(is_array($elem)&&(!(empty($elem)))){
    foreach($elem as $k=>$v){
      $na[_urlencode($k)] = _urlencode($v);
    }
    return $na;
  }
  if(is_array($elem)&&empty($elem)){
	  return $elem;
  }
  return urlencode($elem);
}

$key=$_GET["action"];
//echo $key;
switch ($key){
    case "HCU_Wechat_Login": //Use Wechat to login the Server, response is the userID in system.
    case "HCU_Lock_Query": //Query How many lock is autherized to user,response is a list of StatCode and Name and Location and so on
    case "HCU_Lock_Status": //Query A Lock status by statCode.
        /*
        var retval={
            status:"true",
            warning: "150",
            alarm: "200"
        };
        return JSON.stringify(retval);
        */
        $retval=array(
            'status'=>'true',
            'warning'=> '150',
            'alarm'=>'200'
        );
        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "HCU_Lock_open": //Open a lock
    case "HCU_Lock_close": //Close a lock
	default:
	break;
}


?>