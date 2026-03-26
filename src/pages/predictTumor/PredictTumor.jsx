import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import usePredictMRI from "../../hooks/usePredictMRI";
import { FaCloudUploadAlt } from "react-icons/fa"; //ايقونة الابلود من مكتبة رياكت ايكونز
import { FaFolderOpen } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";
import { GiCycle } from "react-icons/gi";
import { useState } from "react";
import style from "./PredictTumor.module.css";
import useUploadMRI from "../../hooks/useUploadMRI";
import useMRIPreview from "../../hooks/useMRIPreview";
function PredictTumor() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const fileRegister = register("file"); // ربط input تبع الملف مع react-hook-form عشان يخزن قيمة الفايل (FileList) ويتحكم فيه

  const [previewGradCam, setPreviewGradCam] = useState(null);

  const { predictMRIMutation } = usePredictMRI();
  const { uploadMRIMutation } = useUploadMRI();
  const { preview, handelImagePreview } = useMRIPreview();

  const viewGradCam = (e) => {
    e.target.classList.add(style.change_btn);
    e.target.textContent = "Viewing Heatmap";
    setPreviewGradCam(predictMRIMutation.data?.gradCamUrl);
    console.log(previewGradCam);
  };

  const uploadMRI = async (value) => {
    console.log("value ",value);
    console.log("value.file " ,value.file);
    // 1. upload
    const uploadResponse = await uploadMRIMutation.mutateAsync(value);
    console.log("uploadResponse : ", uploadResponse);
    const caseId = uploadResponse.caseId;

    // 2. predict
    const predictResponse = await predictMRIMutation.mutateAsync(caseId);
    console.log("predictResponse : ", predictResponse);
  };

  return (
    <Box
      className="predict_tumor_section"
      sx={{ bgcolor: "var(--navy-color)", padding: "1px", height: "5000px" }}
    >
      <Container maxWidth="lg">
        <Box
          component={"section"}
          className="predict_tumor_from"
          sx={{
            background:
              "linear-gradient(90deg, #2a2a2a 0%, #181818 50%, #2a2a2a 100%)",
            boxShadow: "0 0 30px 0 rgba(249, 10, 10, 0.45)",
            paddingX: "26px",
            paddingTop: "30px",
            paddingBottom: "30px",
            borderRadius: "29px",
            marginTop: "100px",
            minHeight: "540px",
          }}
        >
          <Typography
            component={"h2"}
            sx={{
              color: "#fff",
              fontWeight: "500",
              paddingBottom: "20px",
              fontSize: "30px",
              background: "linear-gradient(90deg, #f0f0f0, #c4a6a6, #ff0000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
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
                  handleSubmit(uploadMRI)();
                  }}
                />
                <FaCloudUploadAlt
                  color="var(--primary-color)"
                  size={100}
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(232, 6, 6, 0.44))",
                  }}
                />
                <Typography
                  component={"p"}
                  variant="h5"
                  sx={{ color: "#fff", letterSpacing: "1px" }}
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
                      style={{ height: "100%", width: "100%"}}
                    />
                    <Box
                      className="gradcam_container"
                      sx={{position: "absolute" ,left:"60px",right:"60px",top:"10px",bottom:"10px"}}
                    >
                      <img src={predictMRIMutation.data?.gradCamUrl} style={{ height: "100%", width: "100%"}} alt="" />
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
                      padding: "20px",
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
                      }}
                    >
                      Click the button below to
                      <br /> analyze this X-ray for possible
                      <br />
                      fractures.
                    </Typography>
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
                        cursor:'not-allowed'
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
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default PredictTumor;