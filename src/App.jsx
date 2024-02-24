import {BrowserRouter,Routes,Route} from "react-router-dom";
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import Profile from "./components/Profile";
import ProfilePage from "./pages/ProfilePage";
import SideNavigation from "./pages/SideNavigation";
import BrandPage from "./pages/BrandPage";
import BrandUpdate from "./pages/BrandUpdate";
import CategoryPage from "./pages/CategoryPage";
import CategoryUpdateModal from "./components/Category/CategoryUpdateModal";
import ProductList from "./pages/ProductList";
import ProductUpdate from "./pages/ProductUpdate";
import OTPComponent from "./components/OTPComponent";

const App = () => {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/"  element={<SideNavigation/>}/>
                <Route path="/otp"  element={<OTPComponent/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/brands" element={<BrandPage/>}/>
                <Route path="/brands/:id" element={<BrandUpdate/>}/>
                <Route path="/category" element={<CategoryPage/>}/>
                <Route path="/category/:id" element={<CategoryUpdateModal/>}/>
                <Route path="/product" element={<ProductList/>}/>
                <Route path="/product-update/:productId" element={<ProductUpdate/>}/>
            </Routes>
    </BrowserRouter>
  );
};

export default App;