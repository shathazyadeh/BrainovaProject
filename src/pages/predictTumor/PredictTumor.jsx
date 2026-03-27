import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import usePredictMRI from "../../hooks/usePredictMRI";
import { FaCloudUploadAlt } from "react-icons/fa"; //ايقونة الابلود من مكتبة رياكت ايكونز
import { FaFolderOpen } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";
import { GiCycle } from "react-icons/gi";
import { IoInformationCircle } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { LuBrain } from "react-icons/lu";
import { useState } from "react";
import style from "./PredictTumor.module.css";
import useUploadMRI from "../../hooks/useUploadMRI";
import useMRIPreview from "../../hooks/useMRIPreview";
import useGetQuestions from "../../hooks/report/studentReport/useGetQuestions";
import TooltipButton from "../../components/uiVerseComponents/tooltipButton/TooltipButton";
import SendButton from "../../components/uiVerseComponents/sendButton/SendButton";
import Loader from "../../components/uiVerseComponents/loader/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import useSubmitReport from "../../hooks/report/studentReport/useSubmitReport";

function PredictTumor() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({

  });

  const fileRegister = register("file"); // ربط input تبع الملف مع react-hook-form عشان يخزن قيمة الفايل (FileList) ويتحكم فيه
  const [fileValue, setFileValue] = useState(null);
  const [previewGradCam, setPreviewGradCam] = useState(null);
  const [caseId, setCaseId] = useState(null);
  

  const { predictMRIMutation } = usePredictMRI();
  const { uploadMRIMutation } = useUploadMRI();
  const { preview, handelImagePreview } = useMRIPreview();
  const {serverErrors,submitReportMutation} = useSubmitReport();

  const { isError, error, isLoading, data } = useGetQuestions();
  console.log("data ",data);

  const viewGradCam = (e) => {
    e.target.classList.add(style.change_btn);
    e.target.textContent = "Viewing Heatmap";
    setPreviewGradCam(predictMRIMutation.data?.gradCamUrl);
    console.log(previewGradCam);
  };

  const uploadMRI = async () => {
  if (!fileValue) return;

  // 1. upload
  const uploadResponse = await uploadMRIMutation.mutateAsync(fileValue);
  const newCaseId = uploadResponse.caseId;
  setCaseId(newCaseId);

  return newCaseId;
};

const submitReport = async (formValues) => {
  if (!fileValue) return;

  // 1️ upload MRI
  const newCaseId = await uploadMRI();

  // 2️ prepare answers array
  const answersArray = data.map(q => ({
    questionId: q.id,
    answerValue: formValues[q.id] || ""  // لو ما جاوب خليها ""
  }));

  // 3️ submit report
  await submitReportMutation.mutateAsync({
    caseId: newCaseId,
    answers: answersArray,
  });

  // 4️ AI prediction
  const modelResponse = await predictMRIMutation.mutateAsync(newCaseId);
  console.log("model ", modelResponse);

  // 5️ reset state
  setCaseId(null);
  setPreviewGradCam(null);
  setFileValue(null);
};


  return (
    <Box className="predict_tumor_section" sx={{ padding: "1px" }}>
      <Container maxWidth="lg">
        <Box
          className="header_section flex_column"
          component={"section"}
          sx={{
            alignItems: "center",
            paddingTop: "80px",
            gap: "20px",
            bgcolor: "var(--navy-color)",
          }}
        >
          <Typography
            component={"p"}
            sx={{
              border: "1px solid var(--primary-color)",
              width: "fit-content",
              borderRadius: "60px",
              color: "var(--light-red-color)",
              px: "18px",
              py: "10px",
              bgcolor: "rgba(255, 0, 0, 0.1)",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Typography component={"span"} className={style.pulse_wrapper}>
              <LuBrain size={18} color="var(--light-red-color)" />
            </Typography>
            AI-Powered Medical Platform
          </Typography>
          <Typography
            component={"h1"}
            variant="h1"
            sx={{
              fontFamily: "Fredoka, sans-serif",
              fontWeight: "800",
              color: "var(--primary-color)",
              background: "linear-gradient(90deg, #ec827c, #e80d0d, #ff0000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Predict Tumor
          </Typography>
          <Typography
            sx={{
              color: "var(--secondary-color)",
              fontFamily: "Fredoka, sans-serif",
              fontSize: "24px",
            }}
          >
            Upload an MRI scan, analuze it with AI, and Submit your diagnosis
            for review.
          </Typography>
        </Box>
        <Box
          component={"section"}
          className="upload_mri_form"
          sx={{
            position: "relative",
            zIndex: 20,
            background:
              "linear-gradient(90deg, #2a2a2a 0%, #181818 50%, #2a2a2a 100%)",
            boxShadow: "0 0 10px 0 rgb(249, 10, 10)",
            paddingX: "26px",
            paddingTop: "30px",
            paddingBottom: "30px",
            borderRadius: "29px",
            minHeight: "540px",
            marginTop: "60px",
            marginBottom: "100px",
          }}
        >
          <Typography
            component={"h2"}
            sx={{
              color: "#fff",
              fontWeight: "500",
              paddingBottom: "20px",
              fontSize: "30px",
              fontFamily: "Fredoka, sans-serif",
            }}
          >
            MRI Upload
          </Typography>

          {!preview ? (
            <Box
              className="flex_column"
              component={"form"}
              //onSubmit={handleSubmit(uploadMRI)}
              sx={{
                minHeight: "450px",
              }}
            >
              <Box
                className={`flex_column ${style.dashed_form_hover}`}
                component={"label"}
                sx={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px dashed var(--mid-gray-color)",
                  bgcolor: "#0e0d0d3a",
                  gap: "20px",
                  cursor: "pointer",
                  borderRadius: "20px",
                  paddingTop: "20px",
                  paddingBottom: "80px",
                }}
              >
                <input
                  className={style.opacity_0}
                  {...register("file")}
                  type="file"
                  onChange={(e) => {
                    fileRegister.onChange(e); // خبرنا الفورم انه صار تغيير
                    handelImagePreview(e);
                    setFileValue(e.target.files[0]);
                  }}
                />
                <FaCloudUploadAlt
                  className={style.animatedIcon}
                  color="var(--primary-color)"
                  size={100}
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(232, 6, 6, 0.44))",
                  }}
                />
                <Typography
                  component={"p"}
                  variant="h5"
                  sx={{
                    color: "#fff",
                    letterSpacing: "1px",
                    fontFamily: "Fredoka, sans-serif",
                  }}
                >
                  Upload MRI Image
                </Typography>
                <Button
                  startIcon={<FaFolderOpen size={18} />}
                  sx={{
                    bgcolor: "var(--primary-color)",
                    color: "#fff",
                    textTransform: "capitalize",
                    fontSize: "18px",
                    paddingY: "7px",
                    paddingX: "35px",
                    borderRadius: "8px",
                    boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                  }}
                >
                  Browse File
                </Button>
              </Box>

              {/* <Button type="submit" sx={{
    mt: 2,
    flexShrink: 0,
  }}>Send to AI Model</Button> */}
            </Box>
          ) : (
            <Box
              className="image_preview_gradcam flex_column"
              sx={{
                background:
                  "linear-gradient(90deg, #767575 0%, #494848 50%, #3c3a3a 100%)",
                border: "1px solid #4b4848",
                boxShadow: "0 0 20px 0 rgba(213, 211, 211, 0.2)",
                borderRadius: "20px",
                padding: "15px",
                height: "100%",
              }}
            >
              <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <Box
                    className="image"
                    sx={{
                      position: "relative",
                      bgcolor: "#000",
                      paddingX: "60px",
                      paddingY: "10px",
                      borderRadius: "20px",
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={preview}
                      style={{ height: "100%", width: "100%" }}
                    />
                    <Box
                      className="gradcam_container"
                      sx={{
                        position: "absolute",
                        left: "60px",
                        right: "60px",
                        top: "10px",
                        bottom: "10px",
                      }}
                    >
                      <img
                        src={predictMRIMutation.data?.gradCamUrl}
                        style={{ height: "100%", width: "100%" }}
                        alt=""
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  size={{ xs: 12, md: 6 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className="ready_to_analysis flex_column"
                    sx={{
                      bgcolor: "#000",
                      alignItems: "center",
                      paddingX: "20px",
                      paddingY: "25px",
                      width: "fit-content",
                      borderRadius: "20px",
                    }}
                  >
                    <Typography
                      component={"h3"}
                      sx={{
                        fontSize: "25px",
                        textAlign: "center",
                        fontWeight: "600",
                        color: "var(--primary-color)",
                        background:
                          "linear-gradient(90deg, #ec827c, #e80d0d, #ff0000)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Ready to analysis
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        textAlign: "center",
                        marginTop: "3px",
                        marginBottom: "20px",
                      }}
                    >
                      Click the button below to
                      <br />
                      upload a different X-ray
                      <br />
                      image.
                    </Typography>
                    {/* 
                    <Button
                      className={`${style.toggle_btn}`}
                      type="button"
                      sx={{
                        bgcolor: "var(--primary-color)",
                        color: "#fff",
                        textTransform: "capitalize",
                        paddingY: "5px",
                        paddingX: "15px",
                        marginTop: "30px",
                        display: "flex",
                        gap: "20px",
                        borderRadius: "20px",
                        boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                        cursor: "not-allowed",
                      }}
                      onClick={viewGradCam}
                    >
                      <GiCycle size={20} />
                      <Typography sx={{ fontSize: "17px", fontWeight: "500" }}>
                        Toggle
                        <br />
                        Heatmap
                      </Typography>
                    </Button>
                    <Button
                      className={style.color_to_gray_hover}
                      type="button"
                      sx={{
                        color: "var(--primary-color)",
                        textTransform: "capitalize",
                        marginTop: "10px",
                      }}
                    >
                      <Box
                        className="icon"
                        sx={{ marginRight: "5px", paddingTop: "6px" }}
                      >
                        <FaExchangeAlt size={16} />
                      </Box>
                      Change Image
                    </Button>
                    */}
                    <TooltipButton></TooltipButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>

      <Box
        component={"section"}
        className="predict_tumor_form"
        sx={{ bgcolor: "#fff" }}
      >
        {/*<ScrollAnimatedHorizontalLine /> */}
        <Box
          className="student_diagnosis_form"
          sx={{
            backgroundColor: "#171717",
            paddingX: "26px",
            paddingTop: "30px",
            paddingBottom: "30px",
            minHeight: "540px",
            position: "relative",
            paddingRight: "650px",
          }}
        >
          <Typography
            component={"h2"}
            sx={{
              color: "#fff",
              fontWeight: "500",
              paddingBottom: "20px",
              fontSize: "30px",
              fontFamily: "Fredoka, sans-serif",
            }}
          >
            Student Diagnosis
          </Typography>
          <Box
            className="student_form flex_column"
            component={"form"}
            onSubmit={handleSubmit(submitReport)}
            sx={{
              minHeight: isLoading ? "880px" : "auto",
              position: "relative",
            }}
          >
            {/* Loader فوق الفورم */}
            {isLoading && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10,
                }}
              >
                <Loader />
              </Box>
            )}

            {/* الفورم */}
            {!isLoading &&
              data?.map((q, index) => (
                <FormControl
                  key={q.id}
                  error={!!errors[q.id]}
                  fullWidth
                  sx={{ marginY: "20px" }}
                >
                  <FormLabel
                    sx={{
                      color: "#fff",
                      "&.Mui-focused": { color: "#fff" },
                      mb: 2,
                      fontSize: "17px",
                    }}
                  >
                    <Typography
                      className={style.pulse_wrapper}
                      component="span"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        backgroundColor: "var(--primary-color)",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        marginRight: "12px",
                      }}
                    >
                      {index + 1}
                    </Typography>
                    {q.text}
                  </FormLabel>

                  {q.type === 2 && (
                    <Controller
                      name={q.id}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <Grid container spacing={2}>
                            {" "}
                            {q.options.map((opt) => (
                              <Grid item size={{ xs: 12, md: 6 }} key={opt}>
                                {" "}
                                <FormControlLabel
                                  control={
                                    <Radio
                                      {...register(q.id)}
                                      value={opt}
                                      sx={{ display: "none" }}
                                    />
                                  }
                                  label={opt}
                                  sx={{
                                    m: 0,
                                    width: "100%",
                                    borderRadius: "14px",
                                    border: "1px solid #333",
                                    backgroundColor: "#111",
                                    color: "#fff",
                                    py: 2,
                                    px: 2,
                                    textTransform: "capitalize",
                                    "&:hover": {
                                      backgroundColor: "#1a1a1a",
                                      transform: "scale(1.02)",
                                    },
                                    "&:has(input:checked)": {
                                      backgroundColor: "#ff2d2d",
                                      borderColor: "#ff2d2d",
                                    },
                                  }}
                                />{" "}
                              </Grid>
                            ))}{" "}
                          </Grid>
                        </RadioGroup>
                      )}
                    />
                  )}

                  {q.type === 1 && (
                    <TextField
                      {...register(q.id)}
                      variant="filled"
                      label={q.code}
                      fullWidth
                      multiline
                      rows={2}
                      error={!!errors[q.id]}
                      helperText={errors[q.id]?.message}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          color: "#ccd6f6",
                          paddingInline: "1em",
                          borderRadius: "10px",
                          boxShadow: "inset 2px 5px 10px rgb(5,5,5)",
                          backgroundColor: "#171717",
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "var(--mid-gray-color)",
                          marginLeft: "10px",
                          fontWeight: "500",
                          "&.Mui-focused": {
                            color: "var(--mid-gray-color)",
                          },
                        },
                      }}
                    />
                  )}
                </FormControl>
              ))}
          </Box>
          <Box
            className="flex_column"
            sx={{
              bgcolor: "#fff",
              position: "absolute",
              right: "0",
              top: "0",
              bottom: "0",
              borderBottomLeftRadius: "50%",
              borderTopLeftRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              paddingX: "45px",
            }}
          >
            <Typography
              component={"h2"}
              sx={{
                fontFamily: "Fredoka, sans-serif",
                fontSize: "70px",
                fontWeight: "600",
              }}
            >
              Case Evaluation
            </Typography>
            <Typography
              sx={{
                fontFamily: "Fredoka, sans-serif",
                fontSize: "17px",
                color: "var(--mid-gray-color)",
                marginBottom: "60px",
                marginTop: "10px",
              }}
            >
              Carefully analyze the MRI image and answer the questions based{" "}
              <br /> on your observation. This step helps you practice clinical
              thinking
              <br />
              before viewing the AI results.
            </Typography>
            <SendButton onClick={handleSubmit(submitReport)}></SendButton>

            {serverErrors?.length > 0 ? (
              <Typography
                component={"p"}
                sx={{
                  border: "1px solid var(--primary-color)",
                  width: "fit-content",
                  borderRadius: "60px",
                  color: "#fff",
                  px: "18px",
                  py: "10px",
                  bgcolor: "#171717",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                  marginTop: "40px",
                }}
              >
                <Typography component={"span"} className={style.pulse_wrapper}>
                  <FaCircle size={18} color="ff2d2d" />
                </Typography>
                {serverErrors}
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PredictTumor;