import { Box, Button, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import usePredictTumor from "../../hooks/usePredictTumor";
import { MdOutlineFileUpload } from "react-icons/md"; //ايقونة الابلود من مكتبة رياكت ايكونز
import ElectricBorder from "../../components/reactBitsComponents/electricBorder/ElectricBorder"; // البوردر الاحمر من رياكت بيتس
import { FiRefreshCw } from "react-icons/fi"; // ايقونة من رياكت ايكونز
import style from './PredictTumor.module.css'
import { useState } from "react";
function PredictTumor() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [previewGradCam, setPreviewGradCam] = useState(null);

  const { preview, handelImagePreview, predictTumorMutation, uploadMRI } =
    usePredictTumor();


  const viewGradCam = (e)=>{
    e.target.classList.add(style.change_btn);
    e.target.textContent = 'Viewing Heatmap';
    setPreviewGradCam(predictTumorMutation.data?.gradCamUrl);
    console.log(previewGradCam);
  }



  return (
    <Box
      className="predict_tumor_section"
      sx={{ bgcolor: "var(--navy-color)", height: "100vh", padding: "1px" }}
    >
      <Container maxWidth="md">
        <ElectricBorder
          color="#b30000"
          speed={0.5}
          chaos={0.01}
          thickness={2}
          style={{ borderRadius: 23 }}
        >
          <Box
            component={"section"}
            className="predict_tumor_from"
            sx={{
              bgcolor: "var(--dark-gray-color)",
              padding: "26px",
              paddingTop: "30px",
              borderRadius: "29px",
              marginTop: "100px",
            }}
          >
            <Typography
              component={"h2"}
              variant="h5"
              sx={{ color: "#fff", fontWeight: "500", paddingBottom: "20px" }}
            >
              MRI Upload
            </Typography>
            <Box component={"form"} onSubmit={handleSubmit(uploadMRI)}>
              <Box className="flex_column"
                component={"label"}
                sx={{
                  border: "1px dashed var(--secondary-color)",
                  bgcolor: "var(--navy-color)",
                  alignItems: "center",
                  gap: "20px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  paddingY: "80px",
                }}
              >
                <input className={style.opacity_0} {...register('file')} type="file" onChange={handelImagePreview} />
                <MdOutlineFileUpload color="var(--dark-red-color)" size={55} />
                <Typography
                  component={"p"}
                  sx={{ color: "var(--secondary-color)" }}
                >
                  Upload MRI Image
                </Typography>
                <Typography
                  className="upper_case"
                  type="button"
                  sx={{
                    bgcolor: "var(--dark-red-color)",
                    color: "#fff",
                    textTransform: "capitalize",
                    paddingY: "5px",
                    paddingX: "20px",
                    borderRadius: "5px",
                  }}
                >
                  Browse File
                </Typography>
              </Box>
              {preview ? (
                <Box className="image_preview_gradcam flex_column" sx={{ bgcolor: "var(--navy-color)", borderRadius: "29px",alignItems:'center' }}>
                  <Typography component={"h3"} sx={{color: "var(--secondary-color)",marginTop: "50px",padding: "20px",}}>Preview</Typography>
                  <Box className="image flex_column" sx={{gap: "10px",alignItems: "center",position:'relative'}}> <img src={preview} width="400px" />
                  <Box className={`${style.position_abs} gradcam_container`} sx={{top:'1.5px'}}>
                    <img width="400px" src={predictTumorMutation.data?.gradCamUrl} alt="" />
                  </Box>
                  </Box>
                  <Button className="fx_fill"
                      type="button"
                      sx={{
                        border: "var(--dark-red-color) solid 1px",
                        bgcolor: "var(--dark-red-color)",
                        color: "#fff",
                        textTransform: "capitalize",
                        paddingY: "5px",
                        paddingX: "20px",
                        marginY:'30px'
                      }}
                      onClick={viewGradCam}
                    >
                      <Box
                        className="icon"
                        sx={{ marginRight: "10px", paddingTop: "6px" }}
                      >
                        <FiRefreshCw />
                      </Box>
                      Toggle Heatmap View
                    </Button>

                </Box>
              ) : (
                ""
              )}

                <Button type="submit">Send to AI Model</Button>

            </Box>
          </Box>
        </ElectricBorder>
      </Container>
    </Box>
  );
}

export default PredictTumor;
