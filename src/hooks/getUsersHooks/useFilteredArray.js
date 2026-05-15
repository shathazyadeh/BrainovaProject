import useAuthStore from "../../store/useAuthStore";

export default function useFilteredArray(data = []){

    console.log("dataaaaaa" , data);

    const currentUser = useAuthStore((state)=>state.user);
    console.log("current ",currentUser);
    let filteredArr = data;
    let studentsNo=0;
    let supervisorsNo=0;
    let adminNo=0;

    if(currentUser?.roles[0] === "Admin" ){
    filteredArr = data.filter((user)=>user.roleName!=="Admin" && user.roleName!=="SuperAdmin");
    }
    else if(currentUser?.roles[0] === "SuperAdmin"){
    filteredArr = data.filter((user)=>user.roleName!=="SuperAdmin");
    }

    filteredArr.forEach(user => {
        if(user.roleName==="Student") studentsNo++ ;
        else if(user.roleName==="Supervisor") supervisorsNo++;
        else if(user.roleName==="Admin") adminNo++;
    });


    return {filteredArr,studentsNo,supervisorsNo,adminNo}
}