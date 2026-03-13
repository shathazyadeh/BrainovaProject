import useAuth from "./useAuth";

export default function useCreateSupervisor(){ // تعريف custom hook اسمه useRegister

  const {serverErrors,authMutation} = useAuth('/Identity/Users/create-supervisor',null);



  return { serverErrors,
           authMutation,
    }; // نرجع القيم اللي بدنا نستخدمها بالكومبوننت
}