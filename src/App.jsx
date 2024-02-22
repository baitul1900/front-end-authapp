import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
// import NewReg from './pages/NewReg';
import RegList from './pages/RegList';
import OTPComponent from './components/OTPComponent';

const App = () => {
  return (
    <BrowserRouter>
            <Routes>
                {/* <Route path="/form" element={<NewReg/>}/> */}
                <Route path="/" element={<RegList/>}/>
                <Route path="/otp" element={<OTPComponent/>}/>
            </Routes>
    </BrowserRouter>
  );
};

export default App;