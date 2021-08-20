import { render } from "@testing-library/react";
import React,{useState} from "react";

const Shownav:React.FC=()=>{
    const[showmini,setshowmini]=useState(false);
    function hidemobinav(){
        setshowmini(!(showmini));
    }
    let minidiv:any;
    if(showmini){
        minidiv=<nav id="inav" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand largeonly lgfnt">ArMan</a>
            <a className="navbar-brand ilg" onClick={()=>{
                hidemobinav();
            }}>=</a>
            <a className="navbar-brand bgb largeonly" href="#/PRODUCTS/PRODMAN">Products</a>
            <a className="navbar-brand bgb largeonly" href="#/INVMAN/INV">Inventory</a>
            <a className="navbar-brand bgb largeonly" href="#">Navbar</a>
            <a className="navbar-brand bgb largeonly" href="#">Navbar</a>
            <a className="navbar-brand bgb largeonly" href="#">Navbar</a>
            </nav>
    }
    else{
        minidiv=
        <nav id="inav" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" onClick={()=>{
            hidemobinav();
        }}>=</a>
        </nav>
    }
    return(
      <div>
      <div className="largenav">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark largenav">
            <a className="navbar-brand lgfnt">ArMan</a>
            <a className="navbar-brand ilg" href="#/PRODUCTS/PRODMAN">Products</a>
            <a className="navbar-brand ilg" href="#/INVMAN/INV">Inventory</a>
            <a className="navbar-brand ilg" href="#">Navbar</a>
            <a className="navbar-brand ilg " href="#">Navbar</a>
            <a className="navbar-brand ilg" href="#">Navbar</a>
            
        </nav>
        </div>
        <div className="mininav">
        {minidiv}
        </div>
      </div>
    )
}

export default Shownav;