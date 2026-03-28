import { useState } from "react";

export default function useMRIPreview(){
    const [preview,setPreview] = useState(null);

    const handelImagePreview = (e)=>{
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

        return{preview,setPreview,handelImagePreview};
}