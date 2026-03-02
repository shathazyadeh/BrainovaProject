import { Box} from "@mui/material";
import useConfirmEmail from "../../hooks/useConfirmEmail";

export default function ConfirmEmailPage() {

  useConfirmEmail();


  return (
    <Box sx={{bgcolor:'#000',height:'100vh'}}>
    </Box>
  );
}