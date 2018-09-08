/**
 * Created by hyj on 2016/12/22.
 */

/**
 * Created by hyj on 2016/9/29.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import classNames from 'classnames';
import '../../../resource/css/font-awesome.min.css';
import './baseview.css';



export default class baseview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            key:"baseinfo",
            hide:"block",
            info:[],
            clickcallback:null,
            sysconfcallback:null
        }
    }
    updatecallback(callback,callback2){
        this.setState({clickcallback:callback,sysconfcallback:callback2});
    }
    update_size(width,height){
        this.setState({height:height,width:width});

    }
    update_info(info){
        this.setState({info:info});
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    handleClick(){
        this.state.clickcallback();
        //TODO: changeview
    }
    handleClick2(){
        this.state.sysconfcallback();
        //TODO: changeview
    }
    render() {
        let infodata = [];
        for(let i=0;i<this.state.info.length;i++){
            infodata.push(
                <p key={this.state.key+"_"+i} style={{fontSize:16,paddingTop:0,paddingLeft:10,fontWeight:"bold",color:"#333",marginLeft:"15px",marginTop:"-5px",width:"100%"}} className="pull-right">{this.state.info[i]}</p>);
        }
        return (
            <div style={{position:"relative",background:"#ffffff",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
                <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" style={{marginTop:25}}>
                    <button type="button" data-loading-text="确定" className="btn btn-primary" autoComplete="off" style={{width:"100%"}} onClick={this.handleClick.bind(this)}>
                        刷新
                    </button>
                </div>
                <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" >

                    <div className="animated flipInY" style={{paddingTop:15}}>
                        <div className="tile-stats">
                            <div className="count" style={{fontSize:32,color:this.state.color,textAlign:"center",width:"100%",marginLeft:"0px"}}>{"设备工作情况"}</div>
                            {infodata}
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" >
                    <button type="button" data-loading-text="确定" className="btn btn-primary" autoComplete="off" style={{width:"100%"}} onClick={this.handleClick2.bind(this)}>
                        校准
                    </button>
                </div>
            </div>
        );
    }
}