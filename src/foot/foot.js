/**
 * Created by hyj on 2016/9/28.
 */
import React, {
    Component,
    PropTypes
    } from 'react';
/*
 import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 PixelRatio
 } from 'react-native';*/
import classNames from 'classnames';
import '../../resource/css/font-awesome.min.css';
import './foot.css';

export default class foot extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:50,
            content:"激活管理工具",
            hide:"none",
            callback:null,
            disabled:"",
            button:"",
            active:false
        }
    }
    update_active(active){
        if(active){
            this.setState({content:'设备已绑定网关',active:true});
        }else{
            this.setState({content:'设备未绑定网关',active:false});
        }
    }
    update_size(height){
        this.setState({height:height})
    }
    update_content(content){
        this.setState({content:content})
    }
    update_callback(callback){
        this.setState({callback:callback})
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(name){
        this.setState({hide:"block",button:name});
    }
    handle_click(){
        //console.log("click");
        this.state.callback(this.state.button);
    }
    disable(b_input){
        if(b_input){
            this.setState({disabled:"disabled"});
        }else{
            this.setState({disabled:""});
        }
    }
    render() {
        return (
            <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'100%',display:'table'}}>
                <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10),display:this.state.hide}} disabled={this.state.disabled} onClick={this.handle_click.bind(this)}>{this.state.button}</button>

                <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle'}}>
                    < span className="headlabel pull-right" style={{fontSize:this.state.height*0.4,marginRight:this.state.height*0.3}}>{this.state.content}</span>
                </a>
            </div>
        );
    }
}