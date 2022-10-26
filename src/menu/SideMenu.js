import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'primereact/button';
import "./SideMenu.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-native";

const SideMenu = (props) => {

  const navigate = useNavigate();

  const onClickDashboard = () => {
    // return <Navigate to="/dashboard" replace={true} />  ;
    navigate("/dashboard");

  }

  return (
    <div className='side-menu-content'>
      <div className='side-menu-title'>ADF Configuration</div>
      <Button type="button" label="Dashboard" icon="pi pi-th-large" className='side-menu-button' onClick={() => navigate("/dashboard")}/>
      <Button type="button" label="Monitoring" icon="pi pi-chart-bar" className='side-menu-button' onClick={() => navigate("/monitoring")}/>
      <Button type="button" label="Manage" icon="pi pi-database" className='side-menu-button' onClick={() => navigate("/managing")}/>
      <Button type="button" label="Configuration" icon="pi pi-sliders-h" className='side-menu-button' onClick={() => navigate("/configuration")}/>
      <div className='side-menu-spacer'></div>
    </div>
  );
};

export default SideMenu;