import { Box} from "@mui/material";
import useConfirmEmail from "../../../hooks/authHooks/useConfirmEmail";

export default function ConfirmEmail() {

  useConfirmEmail();


  return (
    <Box sx={{bgcolor:'#000',height:'100vh'}}>
    </Box>
  );
}