import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./pages/authPages/login/Login.jsx"
import Register from "./pages/authPages/register/Register.jsx"
import Home from "./pages/studentPages/home/Home.jsx";
import ForgetPassword from "./pages/authPages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "./pages/authPages/resetPassword/ResetPassword.jsx";
import ConfirmEmail from "./pages/authPages/confirmEmail/ConfirmEmail.jsx";
import SetPassword from "./pages/authPages/setPassword/SetPassword.jsx";
import PredictTumor from "./pages/studentPages/predictTumor/PredictTumor.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import SupervisorDashboard from "./pages/supervisorPages/supervisorDashboard/SupervisorDashboard.jsx";
import AdminDashboard from "./pages/adminPages/adminDashboard/AdminDashboard.jsx";
import AdminProfile from "./pages/adminPages/adminProfile/AdminProfile.jsx";
import UserManagement from "./pages/userManagement/UserManagement.jsx";
import SuperAdminDashboard from "./pages/superAdminPages/superAdminDashboard/SuperAdminDashboard.jsx";
import StudentProfile from "./pages/studentPages/studentProfile/StudentProfile.jsx";
import SupervisorProfile from "./pages/supervisorPages/supervisorProfile/SupervisorProfile.jsx";
import SupervisorStudents from "./pages/supervisorPages/supervisorStudents/SupervisorStudents.jsx";

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
        },{
            path:'profile',
            element:<StudentProfile/>
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
        element:<AdminProfile/>
       },{
        path:"admin/user-management",
        element:<UserManagement/>
       },{
        path:"super-admin",
        element:<SuperAdminDashboard/>
       },
       {path:"super-admin/profile",
        element:<AdminProfile/>
       },{
        path:"super-admin/user-management",
        element:<UserManagement/>
       },{
        path:"supervisor/profile",
        element:<SupervisorProfile/>
       },{
        path:"supervisor/students",
        element:<SupervisorStudents/>
       }
    ]

   }
]);
export default router;