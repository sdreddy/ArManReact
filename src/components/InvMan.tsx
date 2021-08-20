import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import {Label} from '@fluentui/react/lib';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { isAwaitExpression, isPartiallyEmittedExpression } from "typescript";
import { render } from "@testing-library/react";
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { Spinner,SpinnerSize } from '@fluentui/react/lib/Spinner';
import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import axios from "axios";

const options: IDropdownOption[] = [
  { key: 'veh1', text: 'Auto 1'},
  { key: 'veh2', text: 'Auto 2'}
];



const InvView:React.FC=()=>{
    const [samp,setsamp]=useState("");
    const [sview,setsview]=useState("ZEE");
    const [seldate,setseldate]=useState("");
    const [seltype,setseltype]=useState("");
    const [selveh,setselveh]=useState("");
    const [ren,setren]=useState(9);
    let ivvv:any[]=[
    ]
    const [disptable,setdisptable]=useState(ivvv);
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const [showspinner,setshowspinner]=useState(false);
    const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
    const[tbshow,settbshow]=useState(false);
    
    
      // {pid:"1",pname:"Artos 200 ml",ostock:"200",istock:"0",rstock:"0",cstock:"200"},
      // {pid:"1",pname:"Artos 200 ml",ostock:"200",istock:"0",rstock:"0",cstock:"200"},
      // {pid:"1",pname:"Artos 200 ml",ostock:"200",istock:"0",rstock:"0",cstock:"200"},
      
    


    // useEffect(()=>{
    //   loaddata();
    // },[])


    function loaddata(){
      let idata:any[];
      axios.get("http://localhost:9444/products/").then((resp)=>{
          idata=resp.data.rows;
          idata.forEach((x,index)=>{

            axios.get("http://localhost:9444/products/closestock",{
              params:{
                idate:seldate,
                date:new Date(seldate).toLocaleDateString('en-CA'),
                pid:x.pid
              }
            }).then((rs)=>{
              let stvalue=0;
              if(rs.data.status=="-1"){
                ivvv.push({pid:x.pid,pname:x.productname,ostock:"0",istock:"0",rstock:"0",cstock:"0"})
                console.log("ADDED NULL for "+x.pid);
              }
              else{
                stvalue=rs.data[0].stock;
                ivvv.push({pid:x.pid,pname:x.productname,ostock:stvalue,istock:"0",rstock:"0",cstock:stvalue})
                console.log("ADDED VAL for "+x.pid);
              }
              setren(Math.random())
              console.log(ivvv);
              setdisptable(ivvv);
            });


            // ivvv.push({pid:x.pid,pname:x.productname,ostock:"200",istock:"0",rstock:"0",cstock:"200"})
            // console.log("PUSHING IN "+index);
          })
         
      })
      console.log("THIS IS IDATA");
    }
    function updatedataforlaststep(){
        ivvv=[];
        ivvv.push({pid:"SD",pname:"ISD",ostock:"200",istock:"0",rstock:"0",cstock:"200"})
      
        
        
        // axios.get("http://localhost:9444/products/closestock",{
        //       params:{
        //         idate:seldate,
        //         date:new Date(seldate).toLocaleDateString('en-CA'),
        //         pid:x.pid
        //       }
        //     }).then((rs)=>{
        //       console.log("RESP");
        //       console.log(rs);
        //       if(resp.data.status==="-1"){
        //         ivvv.push({pid:x.pid,pname:x.productname,ostock:"0",istock:"0",rstock:"0",cstock:"0"})
        //       }
        //       else{
        //         ivvv.push({pid:x.pid,pname:x.productname,ostock:"200",istock:"0",rstock:"0",cstock:"200"})
        //       }
        //     });
      
    }
    function sendata(){
      console.log("RUNNZ");
      console.log(ivals);
      let mydata:string=JSON.stringify(ivals);
      alert(mydata);
      if(seltype==="stock"){

        // var params = new URLSearchParams();
        // params.append("foo", "5");
        // params.append("foo", "5");
        // params.append("foo", 11);
        // var request = {
        //   params: params
        // };
        // axios.get('http://example.com/', request);


        //   var iparams = new URLSearchParams();
        //   ivals.map((tdata)=>{
        //     iparams.append("data", tdata);
        //   })
        //   iparams.append("date",seldate);
        //   iparams.append("vehicle",selveh);
        //   var req={
        //     params:iparams
        //   }
        //   let apiend="http://localhost:9444/inven/addstock";
        //   axios.post(apiend,req).then((res)=>{
        //     console.log(res);
        //   })
      }
      if(seltype==="sale"){
        let apiend="http://localhost:9444/inven/sale";
          axios.get(apiend,{
            params:{
                date:seldate,
                vehicle:selveh,
                data:JSON.stringify(disptable)
            }
          }).then((res)=>{
            console.log(res);
          })
      }
    }



    const [ivals,setivals]=useState(ivvv);


    
    let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];
    const iz=["1222","34134","324423"];

    function changeseldate(e:any){
      setseldate(e.target.value);
      printall();
    }
    function changeveh(e:any){
      setselveh(e["key"]);
      printall();
    }
    function changetype(e:any){
      setseltype(e["key"]);
      printall();
    }


    function printall(){
      console.log(seldate);
      console.log(selveh);
      console.log(seltype);
    }
    function stepchange(a:any){
      loaddata();
      if(a==="A"){
        loaddata();
        if(seltype.length>1){
          setsview(a);
          console.log("A Done");
        }
        else{
          settbshow(true);
          console.log("A not done");
        }
      }
      if(a==="B"){
        if(seldate.length>1){
          setsview(a);
        }
        else{
          settbshow(true);
        }
        updatedataforlaststep();
      }
      if(a==="C"){
        if(selveh.length>1){
          setsview(a);
        }
        else{
          settbshow(true);
        }
      }
    }

    function calc(val:any,pid:any){
      // alert(val.target.value);
        var idz=pid.pid;
        let cvals:any[]=[];
        disptable.map((x)=>{
          if(x.pid===idz){
            x.istock=val.target.value;
            let ctmp=(x.ostock*1-val.target.value*1+x.rstock*1).toString();
            if(parseInt(ctmp)>-1){
              x.cstock=ctmp;
            }else{
              alert("Closing Stock cannot be negative");
              
            }
            cvals.push(x);
          }
          else{
            cvals.push(x);
          }
        })
  
        setivals(cvals);
        console.log(cvals);
        setren(Math.random());
      }
    function rcalc(val:any,pid:any){
        // alert(val.target.value);
          var idz=pid.pid;
          let cvals:any[]=[];
          disptable.map((x)=>{
            if(x.pid===idz){
              x.rstock=val.target.value;
              x.cstock=(x.ostock*1+val.target.value*1-x.istock*1).toString();
              cvals.push(x);
            }
            else{
              cvals.push(x);
            }
          })
    
          setivals(cvals);
          console.log(cvals);
          setren(Math.random());
        }
    function panelview(){
      dosubmit(false);
      openPanel();
    }
    function dosubmit(a:boolean){
      setshowspinner(a);
      sendata();
    }

    let tbubble:any;
    if(tbshow===true){
      let id=""
      let val=""
      if(sview==="ZEE"){
        id="#ins"
        val="Please Select Type";
      }
      if(sview==="A"){
        id="#insb"
        val="Please Select Date";
      }
      if(sview==="B"){
        id="#insc"
        val="Please Select Vehicle";
      }
      tbubble=<TeachingBubble
      target={id}
      onDismiss={toggleTeachingBubbleVisible}
      headline={val}
      isWide={true}
      hasCloseButton={true}
      > <DefaultButton onClick={()=>settbshow(false)}  text="Close"/></TeachingBubble>
    }

    let ishow:any;  
    if(sview==="ZEE"){
      ishow=<div className="container center">
      <div className="row">
        <div className="col-xl-3"></div>
        <div className="col-xl-6 col-lg-12">
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">Select Entry Type</h5>
              <Dropdown
              id="ins"
                  placeholder="Select an option"
                  options={[ { key: 'sale', text: 'Add Sale'}, { key: 'stock', text: 'Add Stock'}]}
                  onChange={(e,selectedoption)=>{
                    changetype(selectedoption);
                  }}
                />
              <br/>
              <PrimaryButton ariaDescription="Detailed description used for screen reader." onClick={()=>{stepchange('A')}}>
               Next
              </PrimaryButton>
                    {tbubble}
            </div>
          </div>
        </div>
        </div>
        <div className="col-lg-3"></div>
        </div>
    }

    if(sview==="A"){
      ishow=<div className="container center">
      <div className="row">
      <div className="col-xl-3"></div>
      <div className="col-xl-6 col-lg-12">
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">Select Date</h5>
              <TextField type="date" onChange={changeseldate} id="insb"/>
              <br/>
              <PrimaryButton onClick={()=>{window.location.reload();}}>
                Back
              </PrimaryButton>
              ...
              <PrimaryButton ariaDescription="Detailed description used for screen reader." onClick={()=>{stepchange('B')}}>
               Next
              </PrimaryButton>
              {tbubble}
            </div>
          </div>
        </div>
        </div>
        <div className="col-lg-3"></div>
        </div>
    }
    if(sview==="B"){
      if(seltype=="stock"){
        setsview("SFIN");
      }
      ishow=<div className="container center">
      <div className="row">
        <div className="col-xl-3"></div>
        <div className="col-xl-6 col-lg-12">
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">Select An Vehicle</h5>
              <Dropdown
                  placeholder="Select an option"
                  options={options}
                  id="insc"
                  onChange={(e,tg)=>{
                    changeveh(tg);
                  }}
                />
              <br/>
              <PrimaryButton onClick={()=>{stepchange('A')}}>
                Back
              </PrimaryButton>
              ...
              <PrimaryButton ariaDescription="Detailed description used for screen reader." onClick={()=>{stepchange('C')}}>
               Next
              </PrimaryButton>
              {tbubble}
            </div>
          </div>
        </div>
        </div>
        <div className="col-lg-3"></div>
        </div>
    }

    if(sview==="SFIN"){
      ishow=<div className="container center ">
      <div className="row">
        <div className="col-xl-2"></div>
        <div className="col-xl-8 col-lg-12">
          <div className="card" >
            <div className="card-body">
              <h5>Type : Add New Stock, Date : {seldate} </h5>
              <h5 className="card-title"><u>Fill The Data Please</u></h5>
              <br/>
              <table className="table table-hover table-bordered" >
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Opening Stock</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Closing Stock</th>
                  </tr>
                </thead>
                <tbody>
                {
                  ivals.map((x,index)=>{
                    var pstck="Previous Value : "+x.istock;
                    return(
                      <tr id={index.toString()}>
                      <td scope="row">{x.pname}</td>
                      <td>{x.ostock}</td>
                      <td><TextField onChange={(e)=>rcalc(e,x)} placeholder={x.rstock}/></td>
                      <td>{x.cstock}</td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
              <PrimaryButton onClick={()=>{stepchange('A')}}>
                Back
              </PrimaryButton>
              ...
              <PrimaryButton onClick={panelview}>
               Next
              </PrimaryButton>
            </div>
          </div>
        </div>
        </div>
        <div className="col-lg-3"></div>
        </div>
    }

    if(sview==="C"){
      ishow=<div className="container center ">
      <div className="row">
        <div className="col-xl-2"></div>
        <div className="col-xl-8 col-lg-12">
          <div className="card" >
            <div className="card-body">
              <h5>Type : Add Sale and Return, Selected Vehicle : {selveh} , Date : {seldate} </h5>
              <h5 className="card-title">Fill The Data Please</h5>
              <br/>
              <table className="table table-hover table-bordered" >
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Opening Stock</th>
                    <th scope="col">Sale</th>
                    <th scope="col">Return</th>
                    <th scope="col">Closing Stock</th>
                  </tr>
                </thead>
                <tbody>
                {
                  disptable.map((x,index)=>{
                    var pstck="Previous Value : "+x.istock;
                    return(
                      <tr id={index.toString()}>
                      <td scope="row">{x.pname}</td>
                      <td>{x.ostock}</td>
                      <td><TextField onChange={(e)=>calc(e,x)} placeholder={pstck}/></td>
                      <td><TextField onChange={(e)=>rcalc(e,x)} placeholder={x.rstock}/></td>
                      <td>{x.cstock}</td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
              
              <br/><PrimaryButton onClick={()=>{loaddata();}}>
                Re-Load Data
              </PrimaryButton>
              <br/><br/><br/>
              <PrimaryButton onClick={()=>{stepchange('B')}}>
                Back
              </PrimaryButton>
              ...
              <PrimaryButton onClick={panelview}>
               Next
              </PrimaryButton>
            </div>
          </div>
        </div>
        </div>
        <div className="col-lg-3"></div>
        </div>
    }


    let ispin:any;
    if(showspinner===true){
      ispin=<div>
            <Spinner label="Please Wait " size={SpinnerSize.large}/>
        </div>
    }

    let ipanel;
    if(seltype=="sale"){
      ipanel=<Panel
      isOpen={isOpen}
      onDismiss={dismissPanel}
      type={PanelType.medium}
      closeButtonAriaLabel="Close"
      headerText="Please Verify The Data to proceed"
    >
    <hr/>
    <h4>Date : {seldate}</h4>
    <h4>Vehicle : {selveh}</h4>
      <table className="table table-hover table-bordered" >
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Opening Stock</th>
              <th scope="col">Sale</th>
              <th scope="col" >Return</th>
              <th scope="col">Closing Stock</th>
            </tr>
          </thead>
          <tbody>
          {
            disptable.map((x,index)=>{
              return(
                <tr id={index.toString()}>
                <td scope="row">{x.pname}</td>
                <td>{x.ostock}</td>
                <td>{x.istock}</td>
                <td>{x.rstock}</td>
                <td>{x.cstock}</td>
                </tr>
              )
            })
          }
          </tbody>
      </table>
      {ispin}
      <DefaultButton text="Close" onClick={dismissPanel} />  .. 
      <PrimaryButton text="Save" onClick={()=>dosubmit(true)} />
    </Panel>
    }
    else{
      ipanel=<Panel
      isOpen={isOpen}
      onDismiss={dismissPanel}
      type={PanelType.medium}
      closeButtonAriaLabel="Close"
      headerText="Please Verify The Data to proceed"
    >
    <hr/>
    <h4>Date : {seldate}</h4>
    <h4>Vehicle : {selveh}</h4>
      <table className="table table-hover table-bordered" >
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Opening Stock</th>
              <th scope="col" >Stock</th>
              <th scope="col">Closing Stock</th>
            </tr>
          </thead>
          <tbody>
          {
            ivals.map((x,index)=>{
              return(
                <tr id={index.toString()}>
                <td scope="row">{x.pname}</td>
                <td>{x.ostock}</td>
                <td>{x.rstock}</td>
                <td>{x.cstock}</td>
                </tr>
              )
            })
          }
          </tbody>
      </table>
      {ispin}
      <DefaultButton text="Close" onClick={dismissPanel} />  .. 
      <PrimaryButton text="Save" onClick={()=>dosubmit(true)} />
    </Panel>
    }

    return( 
     <div>
     <br/><br/>
     {ishow}
     {ipanel}
     
      <br/><br/><br/><br/><br/>
     </div>
    )
}





export default InvView;