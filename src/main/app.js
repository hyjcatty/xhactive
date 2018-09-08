/**
 * Created by hyj on 2016/9/28.
 */

import React,  {
    Component,
    PropTypes
    }from "react";
import ReactDOM from "react-dom";
import classNames from 'classnames';
import Foot from "../foot/foot"
import Head from "../head/head"
import Activateview from "../container/activateview/activateview"
import Loopview from "../container/loopview/loopview"
import Uploadview from "../container/Uploadview/Uploadview"
import Stationview from "../container/stationview/stationview"
import Loginview from "../container/loginview/loginview"
import Baseview from "../container/baseview/baseview"
import Listview from "../container/listview/listview"
import Sysconfview from "../container/calibrationview/sysconfview"
import './App.css';

import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();


var winWidth;
var winHeight;
var Longitude = null;
var Latitude = null;
var basic_address = getRelativeURL()+"/";
var request_head= basic_address+"request.php";
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            width: 1280, //
            height: 800,
            headfootheight: 50,
            headfootminheight: 50,
            canvasheight: 700,
            userid: "user",
            username:"Activate",
            hculist: [],
            cpuactive:false,
            stationactive:false
        };
    }
    getuser(){
        return this.state.userid;
    }
    initializeSize(width,height){
        let winlength= (width>height)?width:height;
        let headfootheight = (parseInt(winlength/10)>this.state.headfootminheight)?parseInt(winlength/10):this.state.headfootminheight;
        let canvasheight = height - 2*headfootheight;
        console.log("headfootheight:"+headfootheight+"canvasheight:"+canvasheight);
        this.setState({width:width,height:height,headfootheight:headfootheight,canvasheight:canvasheight});
        this.refs.head.update_size(headfootheight);
        this.refs.foot.update_size(headfootheight);
        this.refs.Loginview.update_size(width,canvasheight);
        this.refs.Baseview.update_size(width,canvasheight);
        this.refs.Listview.update_size(width,canvasheight);
        this.refs.Activateview.update_size(width,canvasheight);
        this.refs.Uploadview.update_size(width,canvasheight);
        this.refs.Stationview.update_size(width,canvasheight);
        this.refs.Sysconfview.update_size(width,canvasheight,headfootheight);
        this.refs.Loopview.update_size(width,canvasheight);
    }
    update_cpu_active(cpu){
        this.setState({cpuactive:cpu});
    }
    update_station_active(station){
        this.setState({stationactive:station});
        if(!station) this.refs.Stationview.updatebinding(null);
    }
    update_binding_station(station){
        this.refs.Stationview.updatebinding(station);
    }
    loop_second(second){
        this.refs.Loopview.update_second(second);
    }
    loop_result(bool){
        if(bool){
            this.refs.Loopview.update_status("Success");
        }else{
            this.refs.Loopview.update_status("Fail");
        }
    }
    if_cpu_active(){
        return this.state.cpuactive;
    }
    if_station_active(){
        return this.state.stationactive;
    }
    foot_content_station(){
        if(this.state.cpuactive) return "设备未绑定站点";
        else return "设备已绑定站点";
    }
    foot_content_cpu(){
        if(this.state.cpuactive) return "设备未绑定网关";
        else return "设备已绑定网关";
    }
    initializesysconf(savecallback,backcallback,configuration){

        this.refs.Sysconfview.update_callback_save(savecallback);

        this.refs.Sysconfview.update_callback_back(backcallback);
        this.refs.Sysconfview.update_config(configuration);
    }
    initializeLogin(callback){
        this.refs.Loginview.update_callback(callback);
    }
    initializehead(id){
        this.refs.head.update_username(id);
    }
    initializeList(map,callback){
        this.refs.Listview.update_locklist(map);
        this.refs.Listview.updatecallback(callback);
    }
    initializeBase(map,callback,callback2,callback3,callback4,callback5){
        this.refs.Baseview.update_info(map);
        this.refs.Baseview.updatecallback(callback,callback2,callback3,callback4,callback5);
    }
    initializefoot(callback){
        this.refs.foot.update_callback(callback);
    }
    initializestation(projlist,statlist,callback,callback2){
        this.refs.Stationview.update_freestationlist(statlist);
        this.refs.Stationview.update_projlist(projlist);
        this.refs.Stationview.updatecallback(callback,callback2);
    }
    initializeloop(code,callback1,callback2){
        this.refs.Loopview.update_callback(callback1,callback2);
        this.refs.Loopview.update_code(code);
    }
    getSelectedStat(){
        return this.refs.Stationview.getSelectedStat();
    }
    updateactivestatus(status){
        this.refs.Activateview.update_status(status);
    }
    updateactivecode(code){
        this.refs.Activateview.update_code(code);
    }
    updateactivenotes(notes){
        this.refs.Activateview.update_notes(notes);
    }
    showloopview(){
        this.refs.Loopview.show();
        this.refs.Loginview.hide();
        this.refs.Stationview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Uploadview.hide();
        this.refs.Activateview.hide();
        this.refs.Listview.hide();
        this.refs.foot.hide();
        this.refs.Baseview.hide();
        this.refs.foot.update_content("回环测试工具");
    }
    showloginview(){
        this.refs.Loopview.hide();
        this.refs.Loginview.show();
        this.refs.Stationview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Uploadview.hide();
        this.refs.Activateview.hide();
        this.refs.Listview.hide();
        this.refs.foot.hide();
        this.refs.Baseview.hide();
        this.refs.foot.update_content("激活管理工具");
    }
    showactiveview(){
        this.refs.Loopview.hide();
        this.refs.Loginview.hide();
        this.refs.Stationview.hide();
        this.refs.Uploadview.hide();
        this.refs.Activateview.show();
        this.refs.Sysconfview.hide();

        this.refs.Listview.hide();
        this.refs.foot.hide();
        this.refs.Baseview.hide();

        this.refs.foot.update_content("");
    }
    showuploadview(){
        this.refs.Loopview.hide();
        this.refs.Loginview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Stationview.hide();
        this.refs.Activateview.hide();
        this.refs.Uploadview.show();

        this.refs.Listview.hide();
        this.refs.foot.hide();
        this.refs.Baseview.hide();

        this.refs.foot.update_content("上传照片以完成激活");
    }
    showstationview(){
        this.refs.Loopview.hide();
        this.refs.Loginview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Stationview.show();
        this.refs.Activateview.hide();
        this.refs.Uploadview.hide();

        this.refs.Listview.hide();

        this.refs.Baseview.hide();
        this.refs.foot.show("设备");
        this.refs.foot.update_content("设备站点信息");
    }
    showlistview(){
        this.refs.Loopview.hide();
        this.refs.Loginview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Stationview.hide();
        this.refs.Activateview.hide();
        this.refs.Uploadview.hide();
        this.refs.Listview.show();
        this.refs.Baseview.hide();
        this.refs.foot.show("站点");

        this.refs.foot.update_content("选择网关用以绑定设备");
    }
    showbaseview(){
        this.refs.Loopview.hide();
        this.refs.Loginview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Stationview.hide();
        this.refs.Activateview.hide();
        this.refs.Uploadview.hide();
        this.refs.Listview.hide();
        this.refs.Baseview.show();
        this.refs.foot.show("站点");
        this.refs.foot.update_content("设备网关基本信息");
    }
    showsysconfview(){
        this.refs.Loopview.hide();
        this.refs.Loginview.hide();
        this.refs.Sysconfview.show();
        this.refs.Stationview.hide();
        this.refs.Activateview.hide();
        this.refs.Uploadview.hide();
        this.refs.Listview.hide();
        this.refs.Baseview.hide();
        this.refs.foot.show("站点");
        this.refs.foot.update_content("请输入校准数据");
    }
    buttonlock(input){
        this.refs.foot.disable(input);
    }
    setuser(username,userid){
        this.setState({userid:userid,username:username});
        this.refs.head.update_username(this.state.username);
        //this.showstationview();
    }
    render() {
        return(
        <div>
            <div>
                <Head ref="head"/>
            </div>
            <div>
                <Uploadview ref="Uploadview"/>
                <Activateview ref="Activateview"/>
                <Loopview ref="Loopview"/>
                <Stationview ref="Stationview"/>
                <Loginview ref="Loginview"/>
                <Listview ref="Listview"/>
                <Baseview ref="Baseview"/>
                <Sysconfview ref="Sysconfview"/>
            </div>
            <div>
                <Foot ref="foot"/>
            </div>
        </div>
        );
    }


}




get_size();
var project_list = [];
var free_station =[];


var wechat_id = getWechatScope();
var session_id= getSession();
var react_element = <App/>;
var app_handle = ReactDOM.render(react_element,document.getElementById('app'));
var cycle_number = 0;
var Intervalhandle;
var Loop_second = 0;
var Loophandle;
var basic_address = getRelativeURL()+"/";
var upload_url=basic_address+"upload.php";
fetchProjectList();
$('#file-zh').fileinput({
    language: 'zh',
    uploadUrl: upload_url+"?id="+wechat_id,
    allowedFileExtensions : ['jpg','jpeg','JPG' ,'JPEG','png','PNG'],
    showPreview : true,
    maxFileSize:5000
});

app_handle.initializeSize(winWidth,winHeight);
app_handle.initializeLogin(login_binding);
app_handle.initializefoot(shift);
app_handle.initializeloop(wechat_id,fetchstartloop,hcubacksysconf);
app_handle.updateactivecode(wechat_id);
if(session_id !== null){
    session_binding(session_id);
}else{
    app_handle.showloginview();
}
getLocation();


function get_size(){
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    console.log("winWidth = "+winWidth);
    console.log("winHeight= "+winHeight);
}

function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

function getRelativeURL(){
    var url = document.location.toString();
    var arrUrl= url.split("//");
    var start = arrUrl[1].indexOf("/");
    var reUrl=arrUrl[1].substring(start);
    if(reUrl.indexOf("?")!=-1) {
        reUrl = reUrl.split("?")[0];
    }
    var end = reUrl.lastIndexOf("/");
    reUrl=reUrl.substring(0,end);
    return reUrl;
}
function getLocation()
{
    //alert("正在获取位置！");
    app_handle.updateactivenotes("正在获取位置！");
    /*
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        app_handle.showactiveview();
        app_handle.updateactivenotes("无法获得当前位置！");
        alert("无法获得当前位置！");
    }*/

    let bmap = new BMap.Map("GuildMap");
    var t_point = new BMap.Point(116.501573, 39.900877);
    bmap.centerAndZoom(t_point,15);
    var geoc = new BMap.Geocoder();
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            let coords = {
                latitude:r.point.lat ,longitude:r.point.lng
            }
            let postion = {
                coords:coords
            }
            showPosition(postion);
            //var mk = new BMap.Marker(r.point);
            //map.addOverlay(mk);
            //map.panTo(r.point);
            //$("#start_point").val(r.point.lng+','+r.point.lat);
            //alert("当前位置经度为:"+r.point.lng+"纬度为:"+r.point.lat);
        }else {
            console.log("无法获得当前位置！");
            alert("无法获得当前位置！");
        }
    },{enableHighAccuracy: true});
}
function showPosition(position)
{
    //alert("获取位置！");

    //var TO_BLNG = function(lng){return lng+0.0065;};

    //var TO_BLAT = function(lat){return lat+0.0060;};

    //var TO_GLNG = function(lng){return lng-0.0065;};

    //var TO_GLAT = function(lat){return lat-0.0060;};
    console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude);
    //Latitude = TO_BLAT(position.coords.latitude);
    //Longitude = TO_BLNG(position.coords.longitude);
    Latitude = (position.coords.latitude);
    Longitude = (position.coords.longitude);
    //fetchactivate();

    Intervalhandle= setInterval(function() {
        if(cycle_number >=100) return;
        fetchactivate();
        cycle_number++;
    }, 3000);
}
function query_callback(res){
    if(res.jsonResult.status == "false"){
        //app_handle.updateactivestatus(false);
        //app_handle.updateactivenotes("激活失败:"+res.jsonResult.msg);
        return;
    }
    if(res.jsonResult.auth == "false"){
        app_handle.updateactivestatus(false);
        app_handle.updateactivenotes("激活失败:"+res.jsonResult.msg);
        cycle_number = 101;
        return;
    }
    app_handle.showactiveview();
    app_handle.updateactivestatus(true);
    app_handle.updateactivenotes("设备已激活！");
    //alert("设备已激活！");
    cycle_number = 101;
    return;

}
function jsonParse(res) {
    return res.json().then(jsonResult => ({ res, jsonResult }));
}
function fetchactivate(){
    //console.log(app_handle.getSelectedStat());
    if(app_handle.getSelectedStat() == "--") return;
    let body={
        code:wechat_id,
        StatCode:app_handle.getSelectedStat(),
        latitude:""+Latitude,
        longitude:""+Longitude
    };
    let listreq = {
        action:"HCU_Station_Bind",
        body:body,
        type:"query",
        user:"activeuser"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(query_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}

function fetchProjectList(){
    var listreq={
        action:"ProjectList",
        type:"query",
        user:"activeuser"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(fetchProjectListcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function fetchProjectListcallback(res){
    project_list = res.jsonResult.ret;
    fetchFreeStation();
    return;

}
function fetchFreeStation(){
    var listreq={
        action:"HCU_Get_Free_Station",
        type:"query",
        user:"activeuser"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(fetchFreeStationcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function changeview(){
    app_handle.showuploadview();
}
function fetchFreeStationcallback(res){
    free_station = res.jsonResult.ret;
    app_handle.initializestation(project_list,free_station,changeview,fetchunbind);
    return;

}
function getWechatScope(){
    var url = document.location.toString();
    if(url.indexOf("code=")!=-1){
        var arrUrl= url.split("code=");
        var scope_value = arrUrl[1].split("&")[0];
        //log("code="+scope_value);
        if(scope_value.length>0 ){
            return scope_value;
        }
    }
    return "test";
}
function getSession(){
    var url = document.location.toString();
    if(url.indexOf("session=")!=-1){
        var arrUrl= url.split("session=");
        var scope_value = arrUrl[1].split("&")[0];
        //log("code="+scope_value);
        if(scope_value.length>0 ){
            return scope_value;
        }
    }
    return null;
}
function login_binding(username,password){

    var body = {
        code:wechat_id,
        username:username,
        password:b64_sha1(password)
    };
    var map={
        action:"HCU_Login_Binding",
        type:"query",
        body: body,
        user:"null"
    };

    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(login_binding_callback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function login_binding_callback(res){
    if(res.jsonResult.status == "false"){
        alert("校验出错"+res.jsonResult.msg);
        return;
    }
    if(res.jsonResult.auth == "false"){
        alert("登陆错误"+res.jsonResult.msg);
        return;
    }
    let userinfo = res.jsonResult.ret;
    app_handle.setuser(userinfo.username,userinfo.userid);
    let cpu=false;
    let station=false;
    if(userinfo.CPU === "true") cpu = true;
    if(userinfo.station === "true") station = true;
    app_handle.update_cpu_active(cpu);
    app_handle.update_station_active(station);
    if(station){
        fetchstation();
    }else{
        app_handle.showstationview();
    }
    //fetchlist();
}

function session_binding(session){
    var body = {
        code:wechat_id,
        session:session
    };
    var map={
        action:"HCU_Session_Binding",
        type:"query",
        body: body,
        user:"null"
    };
    app_handle.showloginview();
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(session_binding_callback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function session_binding_callback(res){
    if(res.jsonResult.status == "false"){
        alert("未找到会话，请登录"+res.jsonResult.msg);
        app_handle.showloginview();
        return;
    }
    if(res.jsonResult.auth == "false"){
        alert("登陆错误"+res.jsonResult.msg);
        app_handle.showloginview();
        return;
    }
    let userinfo = res.jsonResult.ret;
    app_handle.setuser(userinfo.username,userinfo.userid);
    let cpu=false;
    let station=false;
    if(userinfo.CPU === "true") cpu = true;
    if(userinfo.station === "true") station = true;
    app_handle.update_cpu_active(cpu);
    app_handle.update_station_active(station);
    if(station){
        fetchstation();
    }else{
        app_handle.showstationview();
    }
    //fetchlist();
}
function cpu_binding(cpu){

    var body = {
        code:wechat_id,
        cpu:cpu
    };
    var map={
        action:"HCU_CPU_Binding",
        type:"query",
        body: body,
        user:"null"
    };

    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(cpu_binding_callback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function cpu_binding_callback(res){
    if(res.jsonResult.status == "false"){

        app_handle.showactiveview();
        app_handle.updateactivestatus(false);
        app_handle.updateactivenotes("绑定失败！");
        return;
    }
    if(res.jsonResult.auth == "false"){
        alert("校验出错"+res.jsonResult.msg);
        return;
    }
    app_handle.showactiveview();
    app_handle.updateactivestatus(true);
    app_handle.updateactivenotes("绑定成功！");
    app_handle.update_active(true);
}
function shift(name){
    if(name ==="设备"){
        if(app_handle.if_cpu_active()){
            fetchinfo();
        }else{
            fetchlist();
        }
    }else{
        if(app_handle.if_station_active()) {
            fetchstation();
        }else{
            app_handle.showstationview();
        }
    }
}


function list_callback(res){
    if(res.jsonResult.status == "false"){
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let getcpulist = res.jsonResult.ret;
    let buildcpulist = [];
    for(let i=0;i<getcpulist.length;i++){
        let map = {
            winwidth:winWidth,
            cpudetail:getcpulist[i].cpudetail,
            cpuname:getcpulist[i].cpuname,
            cpucode:getcpulist[i].cpucode,
            callback:cpu_binding,
            callback2:null
        }
        buildcpulist.push(map);
    }
    app_handle.initializeList(buildcpulist,fetchlist);

    app_handle.showlistview();
    //app_handle.listview();
}
function fetchlist(){
    var body={
        key:wechat_id
    }
    var listreq = {
        action:"HCU_CPU_Query",
        body:body,
        type:"query",
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(list_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}

function info_callback(res){
    if(res.jsonResult.status == "false"){
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let getinfolist = res.jsonResult.ret;
    app_handle.initializeBase(getinfolist,fetchinfo,sysconffetch,fetchlist,showloop,fetchreboot);

    app_handle.showbaseview();
    //app_handle.listview();
}
function showloop(){
    app_handle.showloopview();
}
function fetchinfo(){
    var body={
        key:wechat_id
    }
    var listreq = {
        action:"HCU_Info_Query",
        body:body,
        type:"query",
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(info_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function station_callback(res){
    if(res.jsonResult.status == "false"){
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let getstation = res.jsonResult.ret;
    //console.log("test");
    app_handle.update_binding_station(getstation);
    app_handle.showstationview();

    //console.log("test2");

}
function fetchstation(){
    var body={
        key:wechat_id
    }
    var listreq = {
        action:"HCU_Get_Binding_Station",
        body:body,
        type:"query",
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(station_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function hcubacksysconf(){
    app_handle.showbaseview();
}
function hcusavesysconf(configure){

    var map={
        action:"HCU_sys_config_save",
        type:"mod",
        body:{
            code:wechat_id,
            configure:configure
        },
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(hcusavesysconfcallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}

function hcusavesysconfcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert9);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    app_handle.showbaseview();
}
function sysconffetch(){
    var map={
        action:"HCU_sys_config",
        body:{
            code:wechat_id
        },
        type:"query",
        user:null
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(sysconffetchcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function sysconffetchcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert1);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let configuration = res.jsonResult.ret;

    app_handle.initializesysconf(hcusavesysconf,hcubacksysconf,configuration);
    app_handle.showsysconfview();
}

function unbind_callback(res){
    if(res.jsonResult.status == "false"){
        alert('解除绑定失败，请联系管理员');
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    fetchProjectList();
    app_handle.update_station_active(false);
    app_handle.showstationview();


}
function fetchunbind(){
    //console.log(app_handle.getSelectedStat());
    let body={
        code:wechat_id
    };
    let listreq = {
        action:"HCU_Station_Unbind",
        body:body,
        type:"query",
        user:"activeuser"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(unbind_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function startloop_callback(res){
    if(res.jsonResult.status == "false"){
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    Loop_second = 0;
    Loophandle = setTimeout(function(){
        fetchloopstatus();
    },1000);

}
function fetchstartloop(){
    //console.log(app_handle.getSelectedStat());
    let body={
        code:wechat_id
    };
    let listreq = {
        action:"HCU_Start_Loop",
        body:body,
        type:"query",
        user:"activeuser"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(startloop_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function loopstatus_callback(res){
    if(res.jsonResult.status == "false"){
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let loop_status = res.jsonResult.ret;
    if(loop_status === "true"){
        Loop_second =0;
        app_handle.loop_result(true);
    }else if(loop_status === "false"){
        Loop_second =0;
        app_handle.loop_result(false);
    }else{
        app_handle.loop_second(Loop_second);
        Loop_second++;
        if(Loop_second >30){
            Loop_second =0;
            app_handle.loop_result(false);
        }else{
            Loophandle = setTimeout(function(){
                fetchloopstatus();
            },1000);
        }
    }


}
function fetchloopstatus(){
    //console.log(app_handle.getSelectedStat());
    let body={
        code:wechat_id
    };
    let listreq = {
        action:"HCU_Loop_Status",
        body:body,
        type:"query",
        user:"activeuser"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(loopstatus_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function reboot_callback(res){
    if(res.jsonResult.status == "false"){
        alert("重启失败，请联系管理员");
        return;
    }
    if(res.jsonResult.auth == "false"){
        alert("重启失败，请联系管理员");
        return;
    }
    alert("重启成功，请稍后刷新状态");

}
function fetchreboot(){
    //console.log(app_handle.getSelectedStat());
    let body={
        code:wechat_id
    };
    let listreq = {
        action:"HCU_Reboot",
        body:body,
        type:"query",
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(reboot_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase     */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance  */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode    */
/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s) {
    return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}
function b64_sha1(s) {
    return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}
function str_sha1(s) {
    return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}
function hex_hmac_sha1(key, data) {
    return binb2hex(core_hmac_sha1(key, data));
}
function b64_hmac_sha1(key, data) {
    return binb2b64(core_hmac_sha1(key, data));
}
function str_hmac_sha1(key, data) {
    return binb2str(core_hmac_sha1(key, data));
}
/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test() {
    return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}
/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;
    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
}
/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d) {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
}
/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t) {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
}
/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data) {
    var bkey = str2binb(key);
    if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);
    var ipad = Array(16),
        opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 512 + 160);
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}
/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
    return bin;
}
/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
        str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask);
    return str;
}
/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
    }
    return str;
}
/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}