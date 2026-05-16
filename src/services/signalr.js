import * as signalR from "@microsoft/signalr"; // بنستورد مكتبة SignalR عشان نستخدمها

// بنجيب الرابط من env
const baseURL = import.meta.env.VITE_API_BASE_URL;

// بنشيل /api من آخر الرابط
const hubURL = baseURL.replace("/api", "") + "/hubs/notifications";

// هون بنعمل connection مع السيرفر
const connection = new signalR.HubConnectionBuilder()
  .withUrl(hubURL, {
    withCredentials: true, // هاي عشان يبعت الكوكيز مع الريكوست (لأنه عندنا auth)
  })
  .withAutomaticReconnect() // اذا الاتصال قطع لحاله، برجع يحاول يتصل بدون ما نتدخل
  .build(); // بنبني الاتصال

export default connection; // بنصدره عشان نستخدمه بأي مكان بالمشروع

// هيك جهزنا الاتصال مع السيرفر (بس لسا ما اشتغل)