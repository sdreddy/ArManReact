import React, { Component, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import {Label} from '@fluentui/react/lib';
import axios from "axios";


const ProductView:React.FC<{prodlist:any[]}>=({prodlist})=>{
    const [samp,setsamp]=useState("");
    const [msg,setmsg]=useState("Product List Not Loaded");
    const[idata,setidata]=useState(prodlist);
    let cprodlist:any[]=[];
    console.log("RFC");
    console.log(prodlist);
    cprodlist=prodlist;
    let prodname:string;
    let prodlotsize:string;
    let prodprofit:string;
    let prodprice:string;
    let isloaded=false;
    useEffect(()=>{
      refreshdata();
      console.log("Called refresh");
    },[])
    function setprodname(a:any){
      prodname=a.target.value;
    }
    function setprodlot(a:any){
      prodlotsize=a.target.value;
    }
    function setprodprofit(a:any){
      prodprofit=a.target.value;
    } 
    function setprodprice(a:any){
      prodprice=a.target.value;
    }

    function refreshdata(){
        axios.get("http://localhost:9444/products/").then((resp)=>{
          setidata(resp.data.rows);
          setmsg("Loaded at "+ new Date().toString())
      }).catch((err)=>{
        setmsg("Error Occured");
      })
    }
    function subdata(){
      axios.get("http://localhost:9444/products/add",{
        params:{
          'prodname':prodname,
          'prodlot':prodlotsize,
          'prodprice':prodprice,
          'prodprofit':prodprofit,
        }
      }).then((res)=>{
          console.log("Added data");
      })
      refreshdata();
     
    }

    function delprod(pname:string,pid:string){
      axios.get("http://localhost:9444/products/del",{
        params:{
          'pname':pname,
          'pid':pid
        }
      }).then((resp)=>{
        refreshdata();
      }).catch((e)=>{
        alert(e);
        console.log(e);
      })
    }

    return( 
      <div>
      <br/><br/>
      <div className="container center">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-4 col-sm-12">
            <div className="card" >
              <div className="card-body">
                <h5 className="card-title">Add A Product</h5>
                <TextField label="Product Name" onChange={(e)=>{setprodname(e)}} className="limtext"/>
                <TextField label="Product Lot Size" onChange={(e)=>{setprodlot(e)}} className="limtext"/>
                <TextField label="Product Price" onChange={(e)=>{setprodprice(e)}} className="limtext"/>
                <TextField label="Product Profit" onChange={(e)=>{setprodprofit(e)}} className="limtext"/>
                <br/>
                <PrimaryButton ariaDescription="Detailed description used for screen reader." onClick={()=>{subdata()}}>
                 Save Product
                </PrimaryButton>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
          <div className="card" >
          <div className="card-body">
            <h5 className="card-title">Product List</h5>
              <ul className="list-group">
                {idata.map((k,index)=>{
                  return <li className="list-group-item" tabIndex={index}> {k.productname}   .<button type="button" className="btn btn-outline-danger" onClick={()=>{delprod(k.productname,k.pid)}}>Delete</button></li>
                })}
                <br/>
               <PrimaryButton text="Load Products "  onClick={refreshdata} />
               <br/>
               {msg}
              </ul>
            </div>
            </div>
          </div>
          
        </div>
      </div>
      </div>

    )
}


class ProductMan extends Component{
    prodlist:any[]=[];
    state={
      showload:true
    }
    componentDidMount(){
      console.log("COMPONENET MOUNT")
      axios.get("http://localhost:9444/products/").then((resp)=>{
          this.prodlist=resp.data.rows;
          console.log(resp.data.rows);
      }).catch((err)=>{
        console.log(err+" IERR");
      })
    }
    
    render(){
      let isshow=this.state.showload;
      // if(isshow){
      //   return(<h1>Loading</h1>);
      // }
    return(
      <div>
        <ProductView prodlist={this.prodlist} />
      </div>
    )
    }
}


export default ProductMan;