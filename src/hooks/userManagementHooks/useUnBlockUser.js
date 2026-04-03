import usePatch from "../generalHooks/usePatch";

export default function useUnBlockUser(){
 return usePatch('/Identity/Users/unblock');
}