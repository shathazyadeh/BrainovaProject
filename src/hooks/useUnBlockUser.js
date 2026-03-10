import usePatch from "./usePatch";

export default function useUnBlockUser(){
 
 return usePatch('/Identity/Users/unblock');
    } 

