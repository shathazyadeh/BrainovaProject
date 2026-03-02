import { RouterProvider } from "react-router-dom";
import router from "./route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
function App() {
  const queryClient = new QueryClient();
  {
    /*عشان نستعمل مكتبة رياكت كويري بنعمل كرييت كلاينت*/
  }
  return (
    <QueryClientProvider client={queryClient}>
      {/*عملنا بروفايد للكلاينت في مشروعنا عشان اي كومبوننت تقدر تستعملها*/}
      <ToastContainer 
        position="top-center"
        autoClose={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition={Bounce}
      />
      <RouterProvider router={router}></RouterProvider>{" "}
      {/*استدعينا الراوتر من route.jsx*/}
    </QueryClientProvider>
  );
}

export default App;
