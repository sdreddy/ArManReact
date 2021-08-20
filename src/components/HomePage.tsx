import React from "react";
import wareimg from "./../imgs/ware.jpg";
function HomeView(){
    return(
        <div className="center">
        <div className="hmfirst">
        <h1 className="lgmainhm">
        Welcome to <span className="">ARTOS</span> Management Application
        <br/>
        <span className="lgfnt ilargehead gld">ArMan</span>
        </h1>
        <div className="hmbody">
        <span className="lgmainsub">
            Now You Can Manage Products,Stock And Sales at one Place.
        </span>
        </div>
        </div>
        <div className="hmsecond">
                <div className="row">
                <div className="col-lg-1" />
                <div className="whitediv col-lg-6">
                <img src={wareimg} width="600" height="300"/>
                </div>
                <div className="itxt gld col-lg-5">
                <h1>Add Stock And Return </h1>
                <h2>Click Here for more</h2>
                </div>
                </div>
        </div>
        <div className="hmthird">
                <h1>Manage Products </h1>
                <h2>Click Here for more</h2>
        </div>
        </div>
    )
}


export default HomeView;