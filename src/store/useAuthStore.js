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
  logout: ()=>{ //لسه ما استخدمناها
    localStorage.removeItem('accessToken');
    set({accessToken:null});
  }
}));

export default useAuthStore;