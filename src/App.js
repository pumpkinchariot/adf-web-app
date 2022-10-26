import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './menu/SideMenu.js';
// import SideMenu from './menu/SideMenu.js';
import Dashboard from './dashboard/Dashboard.js';
import Monitoring from './monitoring/Monitoring.js'
import Managing from './managing/Managing.js'
import Configuration from './configuration/Configuration.js'


import SideMenu from './menu/SideMenu';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

function App() {
  return (
    <BrowserRouter>
    <div style={{height: "100%"}}>
      <div className='app-header'>
       <div className='app-title'>Advanced Diagnostic Framework</div> 
       <i className='pi pi-cog settings-icon'></i>
      </div>

      <div className='app-container'>

        <div className='app-side-menu'>
          <SideMenu/>
        </div>

        <div className='app-page-container'>
            <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/managing" element={<Managing />} />
            <Route path="/configuration" element={<Configuration />} />


            </Routes>
          {/* <Dashboard /> */}
        </div>
      </div>
    </div>
    </BrowserRouter>

  );
}

export default App;
