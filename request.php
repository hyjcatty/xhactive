<?php
header("Content-type:text/html;charset=utf-8");
function _getfilecounts($ff){
    if(!file_exists($ff)) return 0;
    $handle = opendir($ff);
    $i=0;
    while(false !== $file=(readdir($handle))){
        if($file !== "." && $file!=".."){
            $i++;
        }
    }
    return $i;
}
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
function confmod($content){
    $modfile=fopen("./sysconf/configure.json","w+") ;
    fwrite($modfile,$content);
    fclose($modfile);
}
function getfiledetail($path){
    $ret = "";
    if(!file_exists($path)) {
        //echo $path." is not exist!";
        return "";
    }
    $afile=$path;
    $json_string = file_get_contents($afile);
    return $json_string;
}
$request_body = file_get_contents('php://input');
//echo $request_body;
$payload = json_decode($request_body,true);
//echo $payload;
$key=$payload["action"];
//echo $key;
switch ($key){
    case "HCU_Wechat_Login": //Use Wechat to login the Server, response is the userID in system.
/*
     var body = {code : code};
     var map={
     action:"HCU_Wechat_Login",
     type:"query",
     body: body,
     user:"null"
     };
    * */
        $body=$payload["body"];
        $code = $body['code'];
        $openid = "12312312312312312312";
        if(!isset($openid)&&empty($openid)){ $openid="Not Autherized";}
        $user=array(
            'username'=> 'Liuzehong',
            'userid'=>'123123123'
        );
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'ret'=>$user
        );

        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "HCU_Login_Binding": //Use Wechat to login the Server, response is the userID in system.
        /*
             var body = {
                            username:username,
                            password:password};
             var map={
             action:"HCU_Wechat_Binding",
             type:"query",
             body: body,
             user:"null"
             };
            * */
                $body=$payload["body"];
                $openid = "12312312312312312312";
                $y=rand(0,1);
                $cpuactive = 'false';
                if($y==1) $cpuactive='true';
                $y=rand(0,1);
                $stationactive = 'false';
                if($y==1) $stationactive='true';
                $user=array(
                    'username'=> 'Liuzehong',
                    'userid'=>'123123123',
                    'CPU'=>$cpuactive,
                    'station'=>$stationactive
                );
                $x=rand(1,5);
                $sta = 'false';
                if($x>2) $sta='true';
                $retval=array(
                    'status'=>$sta,
                    'auth'=>'true',
                    'ret'=>$user,
                    'msg'=>'12345'
                );

                $jsonencode = _encode($retval);
                echo $jsonencode; break;
    case "HCU_Re_Login": //Use Wechat to login the Server, response is the userID in system.
                /*
                     var body = {
                             code:wechat_id,
                             userid:app_handle.getuser()
                         };
                     var map={
                     action:"HCU_Session_Binding",
                     type:"query",
                     body: body,
                     user:"null"
                     };
                    * */
                        $body=$payload["body"];
                        $openid = "12312312312312312312";
                        $y=rand(0,1);
                        $cpuactive = 'false';
                        if($y==1) $cpuactive='true';
                        $y=rand(0,1);
                        $stationactive = 'false';
                        if($y==1) $stationactive='true';
                        $user=array(
                            'username'=> 'Liuzehong',
                            'userid'=>'123123123',
                            'CPU'=>$cpuactive,
                            'station'=>$stationactive
                        );
                        $sta='true';
                        $retval=array(
                            'status'=>$sta,
                            'auth'=>'true',
                            'ret'=>$user,
                            'msg'=>'12345'
                        );

                        $jsonencode = _encode($retval);
                        echo $jsonencode; break;
    case "HCU_Session_Binding": //Use Wechat to login the Server, response is the userID in system.
            /*
                 var body = {
                                code:DevCode,
                                session:session};
                 var map={
                 action:"HCU_Session_Binding",
                 type:"query",
                 body: body,
                 user:"null"
                 };
                * */
                    $body=$payload["body"];
                    $openid = "12312312312312312312";
                    $y=rand(0,1);
                    $cpuactive = 'false';
                    if($y==1) $cpuactive='true';
                    $y=rand(0,1);
                    $stationactive = 'false';
                    if($y==1) $stationactive='true';
                    $user=array(
                        'username'=> 'Liuzehong',
                        'userid'=>'123123123',
                        'CPU'=>$cpuactive,
                        'station'=>$stationactive
                    );
                    $x=rand(1,5);
                    $sta = 'false';
                    if($x>2) $sta='true';
                    $retval=array(
                        'status'=>$sta,
                        'auth'=>'true',
                        'ret'=>$user,
                        'msg'=>'12345'
                    );

                    $jsonencode = _encode($retval);
                    echo $jsonencode; break;
    case "HCU_CPU_Binding": //Use Wechat to login the Server, response is the userID in system.
        /*
             var body = {
                            username:username,
                            password:password};
             var map={
             action:"HCU_Wechat_Binding",
             type:"query",
             body: body,
             user:"null"
             };
            * */
                $body=$payload["body"];
                $x=rand(1,5);
                $sta = 'false';
                if($x>2) $sta='true';
                $retval=array(
                    'status'=>$sta,
                    'auth'=>'true',
                    'msg'=>'12345'
                );

                $jsonencode = _encode($retval);
                echo $jsonencode; break;
    case "HCU_CPU_Query": //Query How many lock is autherized to user,response is a list of StatCode and Name and Location and so on
    /*
        var listreq = {
            action:"HCU_Lock_Query",
            type:"query",
            user:app_handle.getuser()
        }
    */
        $retlist =array();
        $randdata = rand(1000,9999);
        for($i=1;$i<20;$i++){
            $map= array(
                'cpucode'=>(string)$randdata.(string)$i,
                'cpuname'=>'cpu['.(string)$i.']'.(string)$randdata,
                'cpudetail'=>'xxxxx'.(string)$i.'sssss'
            );
            array_push($retlist,$map);
        }
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'msg'=>'',
            'ret'=>($retlist)
        );
        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "HCU_Info_Query": //Query How many lock is autherized to user,response is a list of StatCode and Name and Location and so on
        /*
            var listreq = {
                action:"HCU_Lock_Query",
                type:"query",
                user:app_handle.getuser()
            }
        */
            $retlist =array();
            $randdata = rand(1000,9999);
            for($i=1;$i<10;$i++){
                $map="项目:".(string)$randdata.(string)$i.'sssss';
                array_push($retlist,$map);
            }
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>'',
                'ret'=>($retlist)
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "HCU_Lock_Status": //Query A Lock status by statCode.
            $body=$payload["body"];
            $id=$payload["user"];
            $statcode=$body["statcode"];
            $temp = rand(0,10);
            $locked = 'true';
            if($temp == 5){
                $locked = 'false';
            }


            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>'',
                'ret'=>$locked
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "HCU_Lock_open": //Open a lock
            $body=$payload["body"];
            $id=$payload["user"];
            $statcode=$body["statcode"];
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>'123456'
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "HCU_Get_Binding_Station":
        $i=400;
        $projcode = ($i)%14;
        $temp = array(
            'StatCode'=> (string)(($i+1)),
            'StatName'=>"测量点".(string)($i),
            'ProjCode'=> $projcode,
            'ChargeMan'=>"用户".(string)($i),
            'Telephone'=>"139139".(string)($i),
            'Longitude'=>"121.0000",
            'Latitude'=>"31.0000",
            'Department'=>"单位".(string)($i),
            'Address'=>"地址".(string)($i),
            'Country'=>"区县".(string)($i),
            'Street'=>"街镇".(string)($i),
            'Square'=>"10000",
            'ProStartTime'=>"2016-01-01",
            'Stage'=>"备注".(string)($i)
        );
        $retval=array(
            'status'=>'true',
            'ret'=>$temp,
            'auth'=>'true',
            'msg'=>'123456'
        );
        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "HCU_Get_Free_Station":

        $pointtable = array();
    	for($i=0;$i<20;$i++){

    	    $projcode = ($i)%14;
    		$temp = array(
    			'StatCode'=> (string)(($i+1)),
    			'StatName'=>"测量点".(string)($i),
    			'ProjCode'=> $projcode,
    			'ChargeMan'=>"用户".(string)($i),
    			'Telephone'=>"139139".(string)($i),
    			'Longitude'=>"121.0000",
    			'Latitude'=>"31.0000",
    			'Department'=>"单位".(string)($i),
    			'Address'=>"地址".(string)($i),
    			'Country'=>"区县".(string)($i),
    			'Street'=>"街镇".(string)($i),
    			'Square'=>"10000",
    			'ProStartTime'=>"2016-01-01",
    			'Stage'=>"备注".(string)($i)
    		);
    		array_push($pointtable,$temp);
    	}
        $retval=array(
            'status'=>'true',
            'ret'=>$pointtable,
            'auth'=>'true',
            'msg'=>'123456'
        );
        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "ProjectList":
    	$projlist = array();
    	for($i=0;$i<14;$i++){
    		$temp = array(
    			'id'=> (string)($i),
    			'name'=> "项目".(string)$i
    		);
    		array_push($projlist,$temp);
    	}
    	$retval=array(
    		'status'=>'true',
    		'ret'=> $projlist,
    		'auth'=>'true',
    		'msg'=>''
    	);
    	$jsonencode = _encode($retval);
    	echo $jsonencode; break;
    case "HCU_Lock_close": //Close a lock
    case "HCU_Station_Bind": //Open a lock
            $body=$payload["body"];
            $code=$body["code"];
            $ret_stat = "false";
            $i=_getfilecounts('./upload/'.$code.'/');
            if($i>=2) $ret_stat = "true";
            $retval=array(
                'status'=>$ret_stat,
                'auth'=>'true',
                'msg'=>'123456'
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "HCU_Station_Unbind": //Open a lock
            $body=$payload["body"];
            $code=$body["code"];
            $ret_stat = "true";
            $retval=array(
                'status'=>$ret_stat,
                'auth'=>'true',
                'msg'=>'123456'
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "HCU_sys_config_save":
        $body=$payload["body"];
        $conf=$body["configure"];
        $sta='true';
        confmod(_encode($conf));
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>'12345'
            );

            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "HCU_sys_config":
        $retarray;
        $retarray = getfiledetail("./sysconf/configure.json");
        //echo "file content".$retarray;
        $obj=json_decode($retarray,true);
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'ret'=>$obj,
            'msg'=>''
        );

        $jsonencode = _encode($retval);

        echo $jsonencode; break;
    case "HCU_Loop_Status": //Query A Lock status by statCode.
            $body=$payload["body"];
            $id=$payload["user"];
            $code=$body["code"];
            $temp = rand(0,10);
            $locked = 'pending';
            if($temp == 5){
                $locked = 'false';
            }else if($temp >= 9){
                $locked = 'true';
            }
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>'',
                'ret'=>$locked
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "HCU_Start_Loop": //Query A Lock status by statCode.
            $body=$payload["body"];
            $id=$payload["user"];
            $code=$body["code"];
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>''
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "HCU_Reboot": //Query A Lock status by statCode.
            $body=$payload["body"];
            $id=$payload["user"];
            $code=$body["code"];
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>''
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "HCU_NGROK": //Query A Lock status by statCode.
            $body=$payload["body"];
            $id=$payload["user"];
            $code=$body["code"];
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>''
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "HCU_Software_Reboot": //Query A Lock status by statCode.
            $body=$payload["body"];
            $id=$payload["user"];
            $code=$body["code"];
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>''
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
	default:
	break;
}


?>