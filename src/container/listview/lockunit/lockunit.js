/**
 * Created by hyj on 2016/12/22.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import "./lockunit.css"
import '../../../../resource/css/font-awesome.min.css';
export default class Lockunit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            winwidth:800,
            cpudetail:"",
            cpuname:"guest",
            cpucode:"12345",
            callback:null
        };
    }
    updateprop(prop){
        this.setState(prop);
    }
    handle_click(){
        //console.log("click");
        this.state.callback(this.state.cpucode);
    }
    render() {
        return (
            <div  style={{position:"relative",flex:1,width:this.state.winwidth,border: "1px solid #EAEAEA",boxShadow:"2px 2px 1px #EAEAEA",background:"#FFFFFF"}} >
                <div   style={{margin:10}}>
                    <button type="button" className="btn btn-success btn-xs" style={{height:"30px",width:"45px",verticalAlign:"middle"}} onClick={this.handle_click.bind(this)}><i>绑定 </i></button>
                    <a className="framelabel" style={{marginLeft:"15px",verticalAlign:"middle"}}>{this.state.cpuname} </a>
                </div>
                <div style={{margin:10}}>
                    <p className="framelabel_s">{this.state.cpudetail}</p>
                </div>
            </div>
        );
    }
}