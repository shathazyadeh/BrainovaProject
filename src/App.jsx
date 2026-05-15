import { RouterProvider } from "react-router-dom";
import router from "./route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import AuthSessionInitializer from "./components/authSession/authSessionInitializer/AuthSessionInitializer.jsx";

const queryClient = new QueryClient(); /*عشان نستعمل مكتبة رياكت كويري بنعمل كرييت كلاينت*/

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthSessionInitializer>
      {/*عملنا بروفايد للكلاينت في مشروعنا عشان اي كومبوننت تقدر تستعملها*/}
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition={Bounce}
      />
      <RouterProvider router={router}></RouterProvider>{" "}
      </AuthSessionInitializer>
      {/*استدعينا الراوتر من route.jsx*/}
    </QueryClientProvider>
  );
}

export default App;