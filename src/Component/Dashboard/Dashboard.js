import React from "react";
import Logo from "../../assets/dress.jpeg"

const Dashboard = () => {
    return (

    <>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

            <img src={Logo} style={{height:"300px",width:"350px"}}/>

            <h2 style={{color:"green",fontSize:"30px"}}>Welcome Again !!</h2>


        </div>
            
    </>

    );
};

export default Dashboard;
