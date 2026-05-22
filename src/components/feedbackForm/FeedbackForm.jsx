import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SubmitFeedbackSchema } from "../../validations/SubmitFeedbackSchema";
import useSubmitFeedback from "../../hooks/supervisorHooks/useSubmitFeedback";
import useChangeFeedback from "../../hooks/supervisorHooks/useChangeFeedback";
import { useEffect } from "react";

export default function FeedbackForm({ reportId, handleClose, feedback }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    usePostMutation: submitFeedbackMutation,
    serverErrors,
    isLoading,
  } = useSubmitFeedback(reportId, {
    onSuccess: () => handleClose(),
  });

  const { changeFeedbackMutation } = useChangeFeedback({
    onSuccess: () => handleClose(),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SubmitFeedbackSchema),
    mode: "onBlur",
    defaultValues: { comment: "" },
  });

  const commentValue = watch("comment");

  useEffect(() => {
    // عشان لما نفتح فيدباك نعمله ابديت يكون نصه موجود
    if (feedback) {
      reset({
        comment: feedback.comment,
      });
    }
  }, [feedback, reset]);

  const submitFeedback = (data) => {
    if (feedback) {
      // edit
      changeFeedbackMutation.mutate({
        feedbackId: feedback.id,
        comment: data.comment,
      });
    } else {
      // add
      submitFeedbackMutation.mutate({ comment: data.comment });
    }
  };

  return (
    <Box className="feedback_container" sx={{ color: "#fff" }}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "var(--primary-font)",
          fontWeight: "600",
          "@media (max-width:600px)": {
            fontSize: "20px",
          },
        }}
      >
        Submit Feedback
      </Typography>

      <Typography
        sx={{
          color: "#718296",
          marginBottom: "30px",
          "@media (max-width:600px)": {
            fontSize: "13px",
          },
        }}
      >
        Report:{` REP-${reportId?.slice(0, 6)}`}
      </Typography>

      {serverErrors && (
        <Typography
          sx={{ color: "var(--primary-color)", marginBottom: "20px" }}
        >
          {serverErrors}
        </Typography>
      )}

      <Box component={"form"} onSubmit={handleSubmit(submitFeedback)}>
        <TextField
          fullWidth
          multiline
          rows={5}
          placeholder={
            isMobile
              ? "Write feedback..."
              : "Write your feedback on this report. Include observations about the student's analysis, areas for improvement, and any corrections."
          }
          {...register("comment")}
          error={errors?.comment}
          helperText={errors.comment?.message}
          sx={{
            "& textarea": {
              overflowY: "auto",

              "&::-webkit-scrollbar": {
                width: "6px",
              },

              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "var(--primary-color)",
                borderRadius: "3px",
                cursor: "grab",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#2a2a3d",
              },
            },
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <Typography sx={{ color: "#718296", fontSize: "12px" }}>
            {commentValue?.length || 0} characters
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
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
                "@media (max-width:400px)": {
                  paddingX: "6px",
                  fontSize: "13px",
                },
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
                "@media (max-width:400px)": {
                  paddingX: "6px",
                  fontSize: "13px",
                },
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