import { useMutation } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";
import { Box } from "@mui/material";
import axiosInstance from "../../Api/axiosInstance";

export default function useDeleteUser(){

    const deleteUserMutation = useMutation({
        mutationFn: async(selectedUserIds)=>{
            const response = await axiosInstance.delete(
    `/Identity/Users/bulk-delete`,
    {
      data: {
        userIds: selectedUserIds
      }
    }
  );
            return response.data;
        }, 
        onSuccess: (data) => {
            const deletedCount = data.deleted?.length || 0;
            const failedCount = data.failed?.length || 0;

            if(deletedCount && !failedCount){ // all users deleted
            toast.success(`Deleted ${deletedCount} users successfully`);}
            else if(deletedCount && failedCount){ //some of them deleted
                 toast.warning(
                    <Box>

            <Box>Deleted <Box component={'span'} sx={{color:'rgb(239, 229, 87)'}}>{deletedCount}</Box> users, but</Box>
            <Box>Failed to delete:</Box>
            {data.failed.map((user) => (
                <Box key={user.userId}>
                    <Box component={'span'} sx={{color:'rgb(239, 229, 87)'}}>{user.userName}</Box> because {user.reason}
                </Box>
            ))}
        </Box>,
                {
                    position: "top-center",
                    theme: "dark",
                    transition: Bounce,
                }
            );
            }
            else if(!deletedCount && failedCount){ // none of them deleted
    toast.error(
        <Box>
            <Box>Failed to delete:</Box>
            {data.failed.map((user) => (
                <Box key={user.userId}>
                     <Box component={'span'} sx={{color:'rgb(218, 72, 72)'}}>{user.userName}</Box> because {user.reason}
                </Box>
            ))}
        </Box>,
        {
            position: "top-center",
            theme: "dark",
            transition: Bounce,
            dangerouslyHTMLString: true,
        }
    );
}

        },
        onError: (error) => {
            toast.error('Operation failed. Please try again.')
        }
    })

    return {deleteUserMutation};
}