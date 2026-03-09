export default function useFilteredArray(data){

    let filteredArr = [];
    let studentsNo=0;
    let supervisorsNo=0;

    filteredArr = data.filter((user)=>user.roleName!=="Admin" && user.roleName!=="SuperAdmin");

    filteredArr.forEach(user => {
        if(user.roleName==="Student") studentsNo++ ;
        else if(user.roleName==="Supervisor") supervisorsNo++;
    });


    return {filteredArr,studentsNo,supervisorsNo}
}