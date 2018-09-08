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
import './sysconfview.css';



export default class sysconfview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            footheight:100,
            hide:"block",
            callback:null,
            margintop:20,
            configure:null,
            key:"sys_conf_key",
            key2:"sys_conf_input",
            callbackSave:null
        }
        //this.keyboard_initialize();
    }
    update_size(width,height,footheight){
        this.setState({height:height,width:width,footheight:footheight});
    }
    update_callback(callback){
        this.setState({callback:callback});
    }
    update_config(configure){
        this.setState({configure:configure});
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    componentDidMount(){
    }
    componentDidUpdate(){
    }
    handleChange(){

    }
    handleBlur(){

    }
    handleSave(){

    }
    getUpdatedValue(){
        let config = this.state.configure;
        for(let i=0;i<config.parameter.groups.length;i++){
            for(let j=0;j<config.parameter.groups[i].list.length;j++){
                if(config.parameter.groups[i].list[j].type === "int"){
                    let temp =parseInt( $("#"+this.state.key2+"G"+i+"P"+j+config.parameter.groups[i].list[j].type).val());
                    if(isNaN(temp) || temp<parseInt(config.parameter.groups[i].list[j].min) || temp>parseInt(config.parameter.groups[i].list[j].max)){
                        $("#"+this.state.key2+"G"+i+"P"+j+config.parameter.groups[i].list[j].type).val(config.parameter.groups[i].list[j].value);
                        return null;
                    }
                    config.parameter.groups[i].list[j].value=$("#"+this.state.key2+"G"+i+"P"+j+config.parameter.groups[i].list[j].type).val();
                }
                if(config.parameter.groups[i].list[j].type === "float"){
                    let temp =parseFloat( $("#"+this.state.key2+"G"+i+"P"+j+config.parameter.groups[i].list[j].type).val());
                    if(isNaN(temp) || temp<parseFloat(config.parameter.groups[i].list[j].min) || temp>parseFloat(config.parameter.groups[i].list[j].max)){
                        $("#"+this.state.key2+"G"+i+"P"+j+config.parameter.groups[i].list[j].type).val(config.parameter.groups[i].list[j].value);
                        return null;
                    }
                    config.parameter.groups[i].list[j].value=$("#"+this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type).val();
                }
                if(this.state.configure.parameter.groups[i].list[j].type === "string"){
                    let temp =( $("#"+this.state.key2+"G"+i+"P"+j+config.parameter.groups[i].list[j].type).val());
                    if(temp.length>parseInt(config.parameter.groups[i].list[j].max) || temp.length === 0){
                        $("#"+this.state.key2+"G"+i+"P"+j+config.parameter.groups[i].list[j].type).val(config.parameter.groups[i].list[j].value);
                        return null;
                    }
                    this.state.configure.parameter.groups[i].list[j].value=$("#"+this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type).val();
                }
                if(this.state.configure.parameter.groups[i].list[j].type === "choice"){
                    this.state.configure.parameter.groups[i].list[j].value=$("#"+this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type).get(0).selectedIndex+"";//val();
                }
                if(this.state.configure.parameter.groups[i].list[j].type === "checkbox"){
                    this.state.configure.parameter.groups[i].list[j].value=$("#"+this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type).is(":checked");
                }
            }
        }
        return config;
    }

    update_callback_save(callback){
        this.setState({callbackSave:callback})
    }

    handle_click_save(){
        let newconf = this.getUpdatedValue();
        if(newconf===null) return;
        this.state.callbackSave(newconf);

    }
    render() {
        let groups1 = [];
        let grougs1size=0;
        if(this.state.configure!= null){

            for(let i=0;i<this.state.configure.parameter.groups.length;i++){
                let param = [];
                for(let j=0;j<this.state.configure.parameter.groups[i].list.length;j++){
                    if(this.state.configure.parameter.groups[i].list[j].type === "int"){
                        let contentline = "["+this.state.configure.parameter.groups[i].list[j].min+"->"+this.state.configure.parameter.groups[i].list[j].max+"]:"+this.state.configure.parameter.groups[i].list[j].note;
                        let className="form-control "+"sys_conf_input_"+this.state.configure.parameter.groups[i].list[j].type;
                        param.push(
                            <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div className="input-group">
                                    <span className="input-group-addon"  style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configure.parameter.groups[i].list[j].paraname+":"}</span>
                                    <input type="text" className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                           key={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} data-group={i} data-parameter={j}
                                           defaultValue={this.state.configure.parameter.groups[i].list[j].value}
                                           data-min={this.state.configure.parameter.groups[i].list[j].min} data-max={this.state.configure.parameter.groups[i].list[j].max}/>
                                </div>
                                <h3 style={{fontSize:15,marginRight:5,color:"#333"}}  key={this.state.key2+i+"p"+j+"2"}>{contentline}</h3>
                            </div>);
                    }
                    if(this.state.configure.parameter.groups[i].list[j].type === "float"){
                        let contentline = "["+this.state.configure.parameter.groups[i].list[j].min+"->"+this.state.configure.parameter.groups[i].list[j].max+"]:"+this.state.configure.parameter.groups[i].list[j].note;
                        let className="form-control "+"sys_conf_input_"+this.state.configure.parameter.groups[i].list[j].type;
                        param.push(
                            <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div className="input-group">
                                    <span className="input-group-addon" style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configure.parameter.groups[i].list[j].paraname+":"}</span>
                                    <input type="text" className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                           key={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} data-group={i} data-parameter={j}
                                           defaultValue={this.state.configure.parameter.groups[i].list[j].value}
                                           data-min={this.state.configure.parameter.groups[i].list[j].min} data-max={this.state.configure.parameter.groups[i].list[j].max}/>
                                </div>
                                <h3 style={{fontSize:15,marginRight:5,color:"#333"}}  key={this.state.key2+i+"p"+j+"2"}>{contentline}</h3>
                            </div>);
                    }
                    if(this.state.configure.parameter.groups[i].list[j].type === "string"){
                        //let contentline = "Max length:["+this.state.configure.parameter.groups[i].list[j].max+"];Note:"+this.state.configure.parameter.groups[i].list[j].note;
                        let contentline = this.state.configure.parameter.groups[i].list[j].note;
                        let className="form-control "+"sys_conf_input_"+this.state.configure.parameter.groups[i].list[j].type;
                        param.push(
                            <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div className="input-group">
                                    <span className="input-group-addon"  style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configure.parameter.groups[i].list[j].paraname+":"}</span>
                                    <input type="text" className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                           key={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} data-group={i} data-parameter={j}
                                           defaultValue={this.state.configure.parameter.groups[i].list[j].value}
                                           data-min={this.state.configure.parameter.groups[i].list[j].min} data-max={this.state.configure.parameter.groups[i].list[j].max}/>
                                </div>
                                <h3 style={{fontSize:15,marginRight:5,color:"#333"}}  key={this.state.key2+i+"p"+j+"2"}>{contentline}</h3>
                            </div>);
                    }
                    if(this.state.configure.parameter.groups[i].list[j].type === "choice"){
                        let contentline = this.state.configure.parameter.groups[i].list[j].note;
                        let className="form-control "+"sys_conf_choice";
                        let choice_items = [];
                        this.state.configure.parameter.groups[i].list[j].defaultvalue = this.state.configure.parameter.groups[i].list[j].items[parseInt(this.state.configure.parameter.groups[i].list[j].value)];
                        for(let k=0;k<this.state.configure.parameter.groups[i].list[j].items.length;k++){
                            choice_items.push(<option value={this.state.configure.parameter.groups[i].list[j].items[k]} key={"choice_item_"+i+"_"+j+"_"+k}>{this.state.configure.parameter.groups[i].list[j].items[k]}</option>);

                        }
                        param.push(
                            <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div className="input-group">
                                    <span className="input-group-addon"  style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configure.parameter.groups[i].list[j].paraname+":"}</span>
                                    <select className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                            key={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} data-group={i} data-parameter={j}

                                            defaultValue={this.state.configure.parameter.groups[i].list[j].defaultvalue} >{choice_items}</select>
                                </div>
                                <h3 style={{fontSize:15,marginRight:5,color:"#333"}}  key={this.state.key2+i+"p"+j+"2"}>{contentline}</h3>
                            </div>);



                    }
                    if(this.state.configure.parameter.groups[i].list[j].type === "checkbox"){
                        if(this.state.configure.parameter.groups[i].list[j].value){

                            let temp =<div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div>
                                <label className="sys-conf-checkbox-label" style={{fontSize: "16px",color:"#555"}}>
                                    {this.state.configure.parameter.groups[i].list[j].paraname+":"}&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} className="js-switch sys_conf_checkbox" defaultChecked="checked" onChange={this.handleChangecheck} data-switchery="true" value="on"/>
                                </label>
                            </div></div>;
                            param.push(temp);
                        }else{
                            let temp = <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div>
                                <label className="sys-conf-checkbox-label" style={{fontSize: "16px",color:"#555"}}>
                                    {this.state.configure.parameter.groups[i].list[j].paraname+":"}&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} className="js-switch sys_conf_checkbox" onChange={this.handleChangecheck} data-switchery="true" value="on"/>
                                </label>
                            </div></div>;
                            param.push(temp);
                        }
                    }
                }
                    groups1.push(
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" key={this.state.key+i+"p"}>
                            <div className="tile-stats" key={"configure_group_"+this.state.configure.parameter.groups[i].groupname} style={{marginTop:"15px"}}>
                                <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.configure.parameter.groups[i].groupname}</div>
                                {param}
                            </div>
                        </div>
                    );
                    grougs1size = grougs1size+this.state.configure.parameter.groups[i].list.length;



            }

        }

        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'hidden',overflowX:'hidden'}}>
                <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" style={{marginTop:15}}>
                    <button  type="button" className="btn btn-warning btn-sm pull-right" style={{width:"100%",display:this.state.hideSave}} disabled={this.state.disabled} onClick={this.handle_click_save.bind(this)}>
                        <i className="fa fa-save" style={{fontSize:25}}> </i>
                    </button>
                </div>
                <div id='sysconfview'   style={{float: "left",position:"relative",width:"100%",height:(this.state.height-53),overflowY:"auto",overflowX:"hidden"}}>
                    <div className="container" >
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12">
                            {groups1}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}