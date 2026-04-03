import usePatch from "../generalHooks/usePatch";

export default function useBlockUser(){
 return usePatch('/Identity/Users/block');
}