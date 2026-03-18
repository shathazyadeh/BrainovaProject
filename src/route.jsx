import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./pages/login/Login.jsx"
import Register from "./pages/register/Register.jsx"
import Home from "./pages/home/Home.jsx";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";
import ConfirmEmail from "./pages/confirmEmail/ConfirmEmail.jsx";
import PredictTumor from "./pages/predictTumor/PredictTumor.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import SupervisorDashboard from "./pages/supervisorDashboard/SupervisorDashboard.jsx";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UserManagement from "./pages/userManagement/UserManagement.jsx";
import SetPassword from "./pages/setPassword/SetPassword.jsx";
import SuperAdminDashboard from "./pages/superAdminDashboard/SuperAdminDashboard.jsx";

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
            path:"security-verification",
            element:<ForgetPassword/>
        },
        {
            path:"reset-password",
            element:<ResetPassword/>
        },
        {
            path:"set-password",
            element:<SetPassword/>
        },{
            path:"confirm-email",
            element:<ConfirmEmail/>
        }
     ]
   },
   { path:"dashboard/",
    element: <DashboardLayout/>,
    children:[
       { 
        path:"supervisor",
        element:<SupervisorDashboard/>
       },{
        path:"admin",
        element:<AdminDashboard/>
       },{
        path:"admin/profile",
        element:<Profile/>
       },{
        path:"admin/user-management",
        element:<UserManagement/>
       },{
        path:"super-admin",
        element:<SuperAdminDashboard/>
       },
       {path:"super-admin/profile",
        element:<Profile/>
       },{
        path:"super-admin/user-management",
        element:<UserManagement/>
       }
    ]

   }
]);
export default router;