import { Box } from '@mui/material'
import QuestionsTabel from '../../../components/muiComponents/questionsTabel/QuestionsTabel'
import useGetQuestions from '../../../hooks/supervisorHooks/useGetQuestions';

function ReportQuestions() {
    const { isError, error, isLoading, data } = useGetQuestions();
        console.log("data  ", data);

  return (
    <Box>
      <QuestionsTabel data={data}/>
    </Box>
  )
}

export default ReportQuestions