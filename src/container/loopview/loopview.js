/**
 * Created by hyj on 2016/9/29.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../resource/css/font-awesome.min.css';
import './loopview.css';

import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export default class loopview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            code:"12345",
            title_height:210,
            button_height:350,
            note_height:140,
            activated:"Pending",
            notes:"点击图标开始",
            cycle:30,
            second:0,
            interval:0,
            hide:"block",
            startcallback:null,
            backcallback:null
        }
    }
    update_size(width,height){
        this.setState({height:height,width:width,title_height:height*0.3,button_height:height*0.5,note_height:height*0.2});

    }
    update_callback(startcallback,backcallback){
        this.setState({startcallback:startcallback,backcallback:backcallback});
    }
    update_second(second){
        this.setState({second:second});
    }
    update_code(statcode){
        this.setState({code:"Code:"+statcode});
    }
    update_notes(notes){
        this.setState({notes:notes});
    }
    update_status(status){
        if(status === "Pending"){
            this.setState({activated:status,notes:"点击图标开始",second:0});
        }else if(status === "Running") {
            this.setState({activated:status,notes:"回环测试中",second:0});
        }else if(status === "Success") {
            this.setState({activated:status,notes:"测试成功,点击图标重新开始"});
        }else if(status === "Fail") {
            this.setState({activated:status,notes:"测试失败,点击图标重新开始"});
        }
        return;
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
        this.update_status("Pending");
    }
    handle_click_loop(){
        if(this.state.activated === "Running") return;
        if(this.state.activated === "Pending") {

            this.update_status("Running");
            this.state.startcallback();
            return;
        }
        if(this.state.activated === "Success" ||this.state.activated === "Fail") {
            this.update_status("Pending");
            return;
        }
    }
    handle_click_back(){
        if(this.status!== "Running"){
            this.state.backcallback();
        }
    }
    render() {
        let pad_value = this.state.height/50+"px "+this.state.height*0.1+"px";
        let button = <i className="fa fa-check" style={{padding:pad_value }}></i>;
        if(this.state.activated == "Pending"){
            button = <i className="fa fa-play" style={{padding:pad_value }}></i>;

            //button = <i style={{padding:pad_value }}> {20} </i>;
        }else if(this.state.activated == "Running"){
            button = <i style={{padding:pad_value,fontSize: this.state.height*0.1}}> {this.state.second} </i>;
        }else if(this.state.activated == "Success"){
            button = <i className="fa fa-check" style={{padding:pad_value }}></i>;
        }else{
            button = <i className="fa fa-close" style={{padding:pad_value }}></i>;
        }
        return (
            <div style={{position:"relative",background:"#62b900",height:this.state.height,width:'100%',display:this.state.hide}}>
                <div style={{position:"relative",width:'100%',height:50,textAlign : 'left',display:"table"}}>
                    <div className="unlocklabel" style={{position:"relative",width:"100%",height:50 ,float:"left",fontSize:28,display:"table-cell",verticalAlign:"middle",margin:"auto",paddingLeft:"10px"}} onClick={this.handle_click_back.bind(this)}>返回
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
                <div style={{position:"relative",width:'100%',height:this.state.title_height-50,textAlign : 'center',display:"table"}}>
                    <div className="unlocklabel" style={{position:"relative",width:"100%",height:this.state.title_height-50 ,float:"left",fontSize:this.state.height/16,display:"table-cell",verticalAlign:"middle",margin:"auto"}} >{this.state.code}
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
                <div style={{position:"relative",width:'100%',height:this.state.button_height,textAlign : 'center',display:"table"}}>
                    <div className="lockbutton" style={{position:"relative",height:this.state.button_height, fontSize:this.state.height/3,float:"left",display:"table-cell",verticalAlign:"middle",margin:"auto"}} onClick={this.handle_click_loop.bind(this)}>
                        {button}
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
                <div style={{position:"relative",width:'100%',height:this.state.note_height,textAlign : 'center',display:"table"}}>
                    <div className="unlocklabel" style={{position:"relative",width:"100%",height:this.state.title_height,float:"left",fontSize:this.state.height/24,display:"table-cell",verticalAlign:"middle",margin:"auto"}} >{this.state.notes}
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
            </div>
        );
    }
}