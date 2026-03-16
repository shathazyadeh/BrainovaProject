import { create } from 'zustand' //Zustand = طريقة خفيفة ومرنة لتخزين ومشاركة البيانات عبر التطبيق بدون تعقيد

const useAuthStore = create((set) => ({
  accessToken : localStorage.getItem('accessToken'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, // اذا فيه قيمة جيبها وحولها من سترنج لأصلها
  
  setAccessToken : (newAccessToken)=>{
    localStorage.setItem('accessToken',newAccessToken);
    set({accessToken:newAccessToken});
  },
  setUser : (user)=>{
    localStorage.setItem('user', JSON.stringify(user)); // خزنها في اللوكال ستوريج عشان لما يصير رفرش
    set({user});
  },
  updateUser: (updatedData) => //دالة داخل الستيت بتستقبل البيانات الجديدة للمستخدم لما احدث معلوماته بنادي عليها وببعتلها المعلومات الجديدة
  set((state) => {
    console.log('updateUser called with:', updatedData); // هل تظهر هذه؟
  console.log('Current user in state:', state.user); // ما هي القيمة الحالية؟
  
  const newUser = { ...state.user, ...updatedData };
  console.log('New user object:', newUser); // هل الكود الجديد صحيح؟
  
  localStorage.setItem("user", JSON.stringify(newUser));
  console.log('localStorage after set:', localStorage.getItem('user')); // ماذا كتب في localStorage؟
  return { user: newUser };
  }),
  logout: ()=>{ 
    localStorage.removeItem('accessToken');
    set({accessToken:null});
  }
}));
export default useAuthStore;