import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Typography } from "@mui/material";
import { SubmitFeedbackSchema } from "../../validations/SubmitFeedbackSchema";
import useSubmitFeedback from "../../hooks/supervisorHooks/useSubmitFeedback";

export default function FeedbackForm({ reportData, handleClose }) {
  const reportId = reportData?.reportId;

  const { usePostMutation : submitFeedbackMutation, serverErrors, isLoading } = useSubmitFeedback(reportId, {
    onSuccess: () => handleClose(),
  });

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }
 } = useForm({
    resolver: yupResolver(SubmitFeedbackSchema),
    mode: "onBlur",
    defaultValues: { comment: "" },
  });

  const commentValue = watch("comment");

 
  const submitFeedback = (data) => {
    submitFeedbackMutation.mutate({comment : data.comment});
   };

  return (
    <Box className="feedback_container" sx={{ color: "#fff" }}>
      <Typography variant="h5" sx={{ fontFamily: "var(--primary-font)", fontWeight: "600" }}>
        Submit Feedback
      </Typography>

      <Typography sx={{ color: "#718296", marginBottom: "30px" }}>
        Report:{` REP-${reportData?.reportId?.slice(0, 6)}`}
      </Typography>

      {serverErrors && (
        <Typography sx={{ color: "var(--primary-color)", marginBottom: "20px" }}>
          {serverErrors}
        </Typography>
      )}

      <Box component={'form'} onSubmit={handleSubmit(submitFeedback)}>
        <TextField
          fullWidth
          multiline
          rows={5}
          placeholder="Write your feedback on this report. Include observations about the student's analysis, areas for improvement, and any corrections."
          {...register("comment")}
          error={errors?.comment}
          helperText={errors.comment?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              borderRadius: "12px",
              backgroundColor: "#38373757",
              "& fieldset": { borderColor: "#5b5b5b62" },
              "&:hover fieldset": { borderColor: "var(--primary-color)" },
              "&.Mui-focused fieldset": { borderColor: "var(--primary-color)" },
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
          <Typography sx={{ color: "#718296", fontSize: "12px" }}>
            {commentValue.length} characters
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              sx={{
                color: "#ccc",
                bgcolor: "var(--dark-gray-color)",
                paddingX: "10px",
                paddingY: "7px",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "#555", color: "#fff" },
              }}
              onClick={handleClose}
            >
              Cancel
            </Typography>

            <Box
              component="button"
              type="submit"
              disabled={isLoading}
              sx={{
                bgcolor: "var(--primary-color)",
                paddingX: "10px",
                paddingY: "7px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "#ff000077" },
              }}
            >
              {isLoading ? "Submitting..." : "Submit Feedback"}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}