import { create } from 'zustand' //Zustand = طريقة خفيفة ومرنة لتخزين ومشاركة البيانات عبر التطبيق بدون تعقيد

const useAuthStore = create((set,get) => ({
  accessToken : localStorage.getItem('accessToken'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, // اذا فيه قيمة جيبها وحولها من سترنج لأصلها
  
 // دالة جديدة للتحقق من صلاحية التوكن
  checkTokenValidity: () => {
    const token = get().accessToken;
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // تحويل إلى ثواني
      
      // إذا انتهى التوكن
      if (decoded.exp < currentTime) {
        get().logout();
        return false;
      }
      return true;
    } catch (e) {
      get().logout();
      return false;
    }
  },
  
  setAccessToken: (newAccessToken) => {
    localStorage.setItem('accessToken', newAccessToken);

    try {
      const decoded = jwtDecode(newAccessToken);
      const expTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const timeout = expTime - currentTime;

      // إلغاء أي setTimeout سابق
      if (get().logoutTimer) {
        clearTimeout(get().logoutTimer);
      }

      if (timeout > 0) {
        // حفظ الـ timer ID
        const timer = setTimeout(() => {
          get().logout();
        }, timeout);
        
        set({ 
          accessToken: newAccessToken,
          logoutTimer: timer 
        });
      } else {
        get().logout();
      }

    } catch (e) {
      set({ accessToken: newAccessToken });
    }
  },


    // تحديث state
  setUser : (user)=>{
    localStorage.setItem('user', JSON.stringify(user)); // خزنها في اللوكال ستوريج عشان لما يصير رفرش
    set({user});
  },
  updateUser: (updatedData) => //دالة داخل الستيت بتستقبل البيانات الجديدة للمستخدم لما احدث معلوماته بنادي عليها وببعتلها المعلومات الجديدة
  set((state) => {
  
  const newUser = { ...state.user, ...updatedData };
  
  localStorage.setItem("user", JSON.stringify(newUser));
  return { user: newUser };
  }),
  logout: ()=>{ 
     // إلغاء أي timer موجود
    if (get().logoutTimer) {
      clearTimeout(get().logoutTimer);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    set({
      accessToken:null,
      user:null,
      logoutTimer: null
    });
        window.location.href = "/auth/login";

  }
}));
export default useAuthStore;