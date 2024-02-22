import {BrowserRouter,Routes,Route} from "react-router-dom";
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";

const App = () => {
  return (
    <BrowserRouter>
            <Routes>
                {/* <Route path="/form" element={<NewReg/>}/> */}
                {/* <Route path="/" element={<RegList/>}/>
                <Route path="/otp" element={<OTPComponent/>}/>
                <Route path="/login" element={<LoginComponent/>}/> */}
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/"  element={<DashBoard/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
    </BrowserRouter>
  );
};

export default App;