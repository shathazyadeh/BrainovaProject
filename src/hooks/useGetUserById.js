import useAuthStore from "../store/useAuthStore.js";
import useFetch from "./useFetch.js";

export default function useGetUserById(){
  const user = useAuthStore(store=>store.user);

  return useFetch(
  `/Identity/Users/${user?.id}`,['userInfo', user?.id], // رياكت كويري لما يكون في براميتر بنحطه عشان يميز المفتاح لكل طالب فما يرجع نفس المعلومات لكل الطلاب
  {
    enabled: !!user?.id // الطلب بنبعت بس اذا كان في يوزر اصلا عشان لا يضرب ايرور
  }
);
}