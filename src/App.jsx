import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import NewReg from './pages/NewReg';
import RegList from './pages/RegList';

const App = () => {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/form" element={<NewReg/>}/>
                <Route path="/" element={<RegList/>}/>
            </Routes>
    </BrowserRouter>
  );
};

export default App;