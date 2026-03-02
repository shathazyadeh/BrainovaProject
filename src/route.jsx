import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./pages/login/Login.jsx"
import Register from "./pages/register/Register.jsx"
import Home from "./pages/home/Home.jsx";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";
import SetPasswordAdminOrSup from "./pages/setPasswordAdminOrSup/SetPasswordAdminOrSup.jsx";
import ConfirmEmail from "./pages/confirmEmail/ConfirmEmail.jsx";
import PredictTumor from "./pages/predictTumor/predictTumor.jsx";

const router = createBrowserRouter([
  { path: "/",
    element:<MainLayout/>,
    children:[
        {
            path:"home",
            element:<Home/>
        },{
            path:'predict-tumor',
            element:<PredictTumor/>
        }
    ]
   },
   { path:"auth/", 
     element:<AuthLayout/>,
     children:[
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"register",
            element:<Register/>
        },
        {
            path:"forget-password",
            element:<ForgetPassword/>
        },
        {
            path:"reset-password",
            element:<ResetPassword/>
        },
        {
            path:"set-password",
            element:<SetPasswordAdminOrSup/>
        },{
            path:"confirm-email",
            element:<ConfirmEmail/>
        }
     ]
   }
]);
export default router;
