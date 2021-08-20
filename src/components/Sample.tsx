import React, { useEffect, useState } from "react";
import axios from "axios";
const Iview:React.FC=()=>{
    let cc:any[]=[];
    const[idata,setidata]=useState(cc);
    const[vdata,setvdata]=useState("LD");
    function dataload(){
        axios.get("http://localhost:9444/products/").then((resp)=>{
            setidata(resp.data.rows);
            console.log(resp.data.rows);
            setvdata("MD");
        })
    }
    useEffect(() => {
        dataload();
      },[]);
    return(
        <div>
            {vdata}
            <h1>VIEWING</h1>
            {
                idata.map((k)=>(
                    <h1>{k.productname}</h1>
                ))
            }
        </div>
    )
}

export class Noki extends React.Component{
    componentDidMount(){

    }
    render(){
        return(
            <Iview />
        )
    }
}