import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { LuSparkles } from "react-icons/lu";
import { PiPulseBold } from "react-icons/pi";
import { CgDanger } from "react-icons/cg";
import { RxLoop } from "react-icons/rx";
import { FaRegStar } from "react-icons/fa";
import { TiFlashOutline } from "react-icons/ti";
import { GoClock } from "react-icons/go";
import PsychologyIcon from "@mui/icons-material/Psychology";
import HearingIcon from "@mui/icons-material/Hearing";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const brainData = {
  Frontal: {
    Glioma: (
      <>
        {/* Section 1 */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px" ,alignItems:"center"}}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: " #bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": {padding: "5px"}
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 , "@media (max-width:400px)": {fontSize: "16px"}}}>
                Early Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": {display:"none"}
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px" , "@media (max-width:400px)": {fontSize: "12px"}}}>
            Initial presentation involves subtle executive dysfunction due to
            involvement of the prefrontal cortex.
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1 ,"@media (max-width:400px)": {fontSize: "14px"}}}>
            Symptoms include:
          </Typography>

          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": {fontSize: "12px"}
            }}
          >
            <li>Impaired planning</li>
            <li>Poor decision-making</li>
            <li>Reduced cognitive flexibility</li>
          </Box>

          <Typography sx={{ color: "var(--mid-gray-color)" ,"@media (max-width:400px)": {fontSize: "12px"}}}>
            These changes may precede overt neurological deficits and can be
            misinterpreted as psychiatric conditions.
          </Typography>
        </Box>

        {/* Section 2 */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: " #FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intermediate Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            As the tumor progresses within the frontal lobe, behavioral and
            personality changes become more evident depending on the affected
            subregion:
          </Typography>

          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>
              <b>Orbitofrontal Cortex:</b>
              <ul>
                <li>Disinhibition</li>
                <li>Socially inappropriate behavior</li>
              </ul>
            </li>

            <li>
              <b>Medial Frontal Cortex:</b>
              <ul>
                <li>Apathy</li>
                <li>Reduced initiative</li>
                <li>Loss of motivation</li>
              </ul>
            </li>

            <li>
              <b>Dorsolateral Prefrontal Cortex:</b>
              <ul>
                <li>Impaired logical reasoning</li>
                <li>Difficulty in problem-solving</li>
                <li>Poor organization</li>
                <li>Attention deficits</li>
              </ul>
            </li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: " #FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Tumor extension into primary motor cortex or corticospinal tracts
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>Leads to:</Typography>

          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Progressive motor weakness</li>
            <li>
              Contralateral paralysis (due to decussation of motor fibers)
            </li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: " #F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 4
            </Typography>
          </Box>

          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>
              Cerebral edema contributes to increased intracranial pressure
            </li>
            <li>Compression of surrounding brain tissue</li>
          </Box>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>Resulting in:</Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Worsening neurological symptoms</li>
            <li>Accelerated clinical deterioration</li>
          </Box>
        </Box>
      </>
    ),
    Meningioma: (
      <>
        {/* Section 1 - Early Stage */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Early Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Initial presentation is often insidious and slow-growing, due to the
            extra-axial origin of the tumor.
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>
            Symptoms include:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Mild executive dysfunction</li>
            <li>Subtle personality changes</li>
            <li>Reduced concentration</li>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Symptoms may remain unnoticed for long periods due to gradual
            progression.
          </Typography>
        </Box>

        {/* Section 2 - Intermediate Stage */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intermediate Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            As the tumor enlarges, it exerts mass effect on frontal lobe
            structures:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>
              <b>Orbitofrontal Cortex:</b>
              <ul>
                <li>Disinhibition</li>
                <li>Socially inappropriate behavior</li>
              </ul>
            </li>
            <li>
              <b>Medial Frontal Cortex:</b>
              <ul>
                <li>Apathy</li>
                <li>Reduced initiative</li>
                <li>Emotional blunting</li>
              </ul>
            </li>
            <li>
              <b>Dorsolateral Prefrontal Cortex:</b>
              <ul>
                <li>Impaired planning</li>
                <li>Reduced problem-solving ability</li>
                <li>Cognitive slowing</li>
              </ul>
            </li>
          </Box>
        </Box>

        {/* Section 3 - Advanced Stage */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Progressive compression may extend to the primary motor cortex and
            adjacent cortical and subcortical structures.
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>Leads to:</Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Motor weakness (often gradual)</li>
            <li>Possible contralateral deficits</li>
          </Box>
        </Box>

        {/* Section 4 - Secondary Effects */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 4
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>May be associated with peritumoral edema, although variable</li>
          </Box>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>Resulting in:</Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Increased intracranial pressure</li>
            <li>Headache and cognitive decline</li>
          </Box>
        </Box>
      </>
    ),
    Pituitary: (
      <Box sx={{ height: "400px", display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            bgcolor: "#ff00002d",
            borderRadius: "20px",
            textAlign: "center",
            paddingX: "10px",
            paddingY: "5px",
            color: "var(--dark-gray-color)",
            fontWeight: "500",
            "@media (max-width:400px)": {fontSize: "12px"}
          }}
        >
          Pituitary tumors do not originate within the frontal lobe; therefore,
          they do not directly affect it.
        </Typography>
      </Box>
    ),
    NoTumor: (
      <>
        {/* Section 1 - Normal Function */}
        <Box
          className="normal_function"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <FaRegStar size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Normal Function
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Baseline State
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            The frontal lobe operates with intact neural networks.
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>
            Functions include:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Executive control</li>
            <li>Decision-making</li>
            <li>Behavioral regulation</li>
            <li>Motor planning</li>
          </Box>
        </Box>

        {/* Section 2 - Cognitive & Behavioral Stability */}
        <Box
          className="cognitive_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #378ADD",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#E6F1FB",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#378ADD",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <GoClock size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Cognitive Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#E6F1FB",
                color: "#378ADD",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Subregions
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Proper functioning of all frontal lobe subregions:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#378ADD" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>
              <b>Orbitofrontal Cortex:</b>
              <ul>
                <li>Socially appropriate behavior</li>
                <li>Emotional regulation</li>
              </ul>
            </li>
            <li>
              <b>Medial Frontal Cortex:</b>
              <ul>
                <li>Motivation</li>
                <li>Initiative</li>
              </ul>
            </li>
            <li>
              <b>Dorsolateral Prefrontal Cortex:</b>
              <ul>
                <li>Logical reasoning</li>
                <li>Problem-solving</li>
                <li>Attention control</li>
              </ul>
            </li>
          </Box>
        </Box>

        {/* Section 3 - Motor Function */}
        <Box
          className="motor_function"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <TiFlashOutline size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Motor Function
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Intact Pathways
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Intact motor pathways ensure:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Normal voluntary movement</li>
            <li>Balanced coordination</li>
          </Box>
        </Box>

        {/* Section 4 - Physiological Stability */}
        <Box
          className="physiological_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Physical Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Normal Baseline
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>No edema</li>
            <li>No intracranial pressure elevation</li>
            <li>Normal cerebral perfusion and metabolism</li>
          </Box>
        </Box>
      </>
    ),
  },

  Temporal: {
    Glioma: (
      <>
        {/* Section 1 */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Early Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Initial involvement of cortical and medial temporal structures
            begins subtly.
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>Symptoms:</Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Mild short-term memory impairment (Hippocampus involvement)</li>
            <li>Difficulty recalling recent events</li>
            <li>Subtle language comprehension issues (Superior temporal gyrus – dominant hemisphere)</li>
            <li>Occasional déjà vu or sensory distortions</li>
            <li>Mild auditory perception changes</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intermediate Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            As the tumor expands, symptoms become region-specific and more
            clinically evident:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>
              <b>Superior Temporal Gyrus (Wernicke's area – dominant hemisphere):</b>
              <ul>
                <li>Impaired language comprehension</li>
                <li>Fluent but meaningless speech (receptive aphasia)</li>
                <li>Difficulty understanding spoken/written language</li>
              </ul>
            </li>
            <li>
              <b>Medial Temporal Lobe (Hippocampus):</b>
              <ul>
                <li>Progressive memory loss</li>
                <li>Inability to form new memories (anterograde amnesia)</li>
                <li>Disorientation in recent events</li>
              </ul>
            </li>
            <li>
              <b>Inferior / Middle Temporal Gyrus:</b>
              <ul>
                <li>Difficulty recognizing objects (visual agnosia)</li>
                <li>Loss of semantic memory (word/object meaning)</li>
              </ul>
            </li>
            <li>
              <b>Amygdala involvement:</b>
              <ul>
                <li>Emotional instability</li>
                <li>Increased anxiety or abnormal fear responses</li>
              </ul>
            </li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Severe multi-domain dysfunction:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Global memory failure</li>
            <li>Severe aphasia (if dominant hemisphere)</li>
            <li>Temporal lobe seizures</li>
            <li>Auditory or visual hallucinations</li>
          </Box>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>
            Possible spread causing:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Increased intracranial pressure</li>
            <li>Cognitive collapse</li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 4
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Cerebral edema</li>
            <li>Seizure activity (temporal epilepsy)</li>
            <li>Increased ICP → headache, vomiting, confusion</li>
          </Box>
        </Box>
      </>
    ),

    Meningioma: (
      <>
        {/* Section 1 */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Early Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Slow compression of temporal cortex:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Mild memory impairment</li>
            <li>Subtle language comprehension difficulty</li>
            <li>Mild headache</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intermediate Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Compression-based subregion effects:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>
              <b>Hippocampus compression:</b>
              <ul>
                <li>Gradual memory decline</li>
                <li>Difficulty learning new information</li>
              </ul>
            </li>
            <li>
              <b>Superior Temporal Gyrus compression:</b>
              <ul>
                <li>Mild receptive language difficulty</li>
                <li>Slowed comprehension</li>
              </ul>
            </li>
            <li>
              <b>Inferior Temporal Cortex compression:</b>
              <ul>
                <li>Reduced object recognition ability</li>
                <li>Visual association deficits</li>
              </ul>
            </li>
            <li>
              <b>Amygdala compression:</b>
              <ul>
                <li>Emotional blunting or irritability</li>
              </ul>
            </li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Marked cognitive decline:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Severe memory impairment</li>
            <li>Language comprehension deficits</li>
            <li>Possible temporal lobe seizures</li>
            <li>Contralateral neurological deficits (if mass effect spreads)</li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 4
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Peritumoral edema (variable)</li>
            <li>Increased intracranial pressure</li>
            <li>Chronic headache</li>
          </Box>
        </Box>
      </>
    ),

    Pituitary: (
      <Box sx={{ height: "400px", display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            bgcolor: "#ff00002d",
            borderRadius: "20px",
            textAlign: "center",
            paddingX: "10px",
            paddingY: "5px",
            color: "var(--dark-gray-color)",
            fontWeight: "500",
            "@media (max-width:400px)": {fontSize: "12px"}
          }}
        >
          Pituitary tumors do not originate within the temporal lobe; therefore,
          they do not directly affect it.
        </Typography>
      </Box>
    ),

    NoTumor: (
      <>
        {/* Section 1 */}
        <Box
          className="baseline_state"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <FaRegStar size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Baseline State
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Normal
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Normal temporal lobe function with intact processing across all
            subregions.
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Normal auditory processing</li>
            <li>Intact language comprehension</li>
            <li>Proper memory encoding (hippocampus)</li>
            <li>Stable emotional processing (amygdala)</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="cognitive_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #378ADD",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#E6F1FB",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#378ADD",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <GoClock size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Cognitive Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#E6F1FB",
                color: "#378ADD",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Baseline
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#378ADD" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Normal speech understanding</li>
            <li>Normal recognition of objects and meaning</li>
            <li>Stable short- and long-term memory</li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="physiological_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Physical Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Normal Baseline
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>No edema</li>
            <li>Normal intracranial pressure</li>
            <li>Normal cortical metabolism</li>
          </Box>
        </Box>
      </>
    ),
  },

  Parietal: {
    Glioma: (
      <>
        {/* Section 1 */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Early Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Mild sensory disturbances due to early cortical involvement of the
            parietal lobe.
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>
            Symptoms include:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Contralateral numbness or paresthesia</li>
            <li>Subtle visuospatial impairment</li>
            <li>Mild deficits in coordination and spatial judgment</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intermediate Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Progressive cortical dysfunction depending on the affected
            subregion:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>
              <b>Superior Parietal Lobule:</b>
              <ul>
                <li>Impaired spatial orientation</li>
              </ul>
            </li>
            <li>
              <b>Inferior Parietal Lobule:</b>
              <ul>
                <li>Apraxia (inability to perform learned motor tasks)</li>
                <li>Acalculia (difficulty with mathematical processing)</li>
                <li>Agraphia (impaired writing ability)</li>
              </ul>
            </li>
            <li>
              <b>Postcentral Gyrus (Primary Somatosensory Cortex):</b>
              <ul>
                <li>Contralateral sensory loss</li>
                <li>Impaired tactile discrimination</li>
              </ul>
            </li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Severe cortical involvement leads to:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Hemispatial neglect (especially with non-dominant hemisphere involvement)</li>
            <li>Severe contralateral sensory deficits</li>
            <li>Significant functional disability affecting daily activities</li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 4
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Cerebral edema leading to increased intracranial pressure (↑ ICP)</li>
            <li>Tumor-related cortical irritation causing seizures</li>
          </Box>
        </Box>
      </>
    ),

    Meningioma: (
      <>
        {/* Section 1 */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Early Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Slow-growing extra-axial mass with gradual compression effect.
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Mild headache</li>
            <li>Subtle sensory or spatial disturbances</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intermediate Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Compression of parietal cortex leads to:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Sensory deficits</li>
            <li>Mild apraxia</li>
            <li>Cognitive slowing</li>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", mt: 1, "@media (max-width:400px)": { fontSize: "12px" } }}>
            Gradual clinical onset compared to gliomas.
          </Typography>
        </Box>

        {/* Section 3 */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Significant mass effect causing:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Contralateral sensory loss</li>
            <li>Hemispatial neglect</li>
            <li>Possible indirect motor involvement</li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 4
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Possible peritumoral edema (variable)</li>
            <li>Increased intracranial pressure</li>
            <li>Chronic headache</li>
          </Box>
        </Box>
      </>
    ),

    Pituitary: (
      <Box sx={{ height: "400px", display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            bgcolor: "#ff00002d",
            borderRadius: "20px",
            textAlign: "center",
            paddingX: "10px",
            paddingY: "5px",
            color: "var(--dark-gray-color)",
            fontWeight: "500",
            "@media (max-width:400px)": {fontSize: "12px"}
          }}
        >
          Pituitary tumors do not originate within the parietal lobe; therefore,
          they do not directly affect it.
        </Typography>
      </Box>
    ),

    NoTumor: (
      <>
        {/* Section 1 */}
        <Box
          className="baseline_state"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <FaRegStar size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Baseline State
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Normal
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Normal parietal lobe function with intact sensory integration.
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Normal sensory integration</li>
            <li>Proper spatial awareness</li>
            <li>Intact coordination</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="cognitive_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #378ADD",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#E6F1FB",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#378ADD",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <GoClock size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Cognitive Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#E6F1FB",
                color: "#378ADD",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Subregions
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            All parietal subregions functioning normally:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#378ADD" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Accurate body perception</li>
            <li>Normal calculation and writing</li>
            <li>Proper visuospatial processing</li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="physiological_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Physical Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Normal Baseline
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>No edema</li>
            <li>Normal ICP</li>
            <li>Normal cortical activity</li>
          </Box>
        </Box>
      </>
    ),
  },

  Occipital: {
    Glioma: (
      <>
        {/* Section 1 */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Early Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Initial involvement of the primary visual cortex (V1 – calcarine
            cortex) begins subtly.
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>
            Symptoms include:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Blurred or reduced visual clarity</li>
            <li>Difficulty processing fine visual details</li>
            <li>Mild visual field disturbances</li>
            <li>Occasional visual distortions</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intermediate Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            As the tumor progresses, visual processing becomes region-specific
            and more clinically evident:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>
              <b>Primary Visual Cortex (V1):</b>
              <ul>
                <li>Contralateral visual field defects (homonymous visual field loss)</li>
                <li>Reduced visual perception accuracy</li>
              </ul>
            </li>
            <li>
              <b>Visual Association Cortex (V2–V5):</b>
              <ul>
                <li>Difficulty interpreting visual information</li>
                <li>Impaired motion detection (V5 area)</li>
                <li>Difficulty recognizing shapes and patterns</li>
              </ul>
            </li>
            <li>
              <b>Extrastriate Areas:</b>
              <ul>
                <li>Visual agnosia (inability to recognize objects despite seeing them)</li>
                <li>Visual hallucinations (simple flashes, shapes)</li>
              </ul>
            </li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Severe visual dysfunction due to extensive cortical involvement:
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>Leads to:</Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Cortical blindness (partial or complete)</li>
            <li>Complete loss of visual interpretation</li>
            <li>Complex visual hallucinations</li>
            <li>Possible seizure activity (occipital lobe epilepsy)</li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 4
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Increased intracranial pressure (ICP)</li>
            <li>Peritumoral edema affecting visual pathways</li>
            <li>Occipital seizures (visual aura: flashing lights, zigzag patterns)</li>
          </Box>
        </Box>
      </>
    ),

    Meningioma: (
      <>
        {/* Section 1 */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Early Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Slow compression of the occipital cortex due to the extra-axial
            origin of the tumor.
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>
            Symptoms include:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Mild visual blurring</li>
            <li>Occasional headaches</li>
            <li>Subtle visual discomfort</li>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Symptoms may remain unnoticed for long periods due to gradual
            progression.
          </Typography>
        </Box>

        {/* Section 2 */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intermediate Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            As the tumor enlarges, compression becomes region-specific and more
            clinically evident:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>
              <b>Primary Visual Cortex (V1) compression:</b>
              <ul>
                <li>Progressive visual field loss</li>
                <li>Homonymous hemianopia</li>
              </ul>
            </li>
            <li>
              <b>Visual Association Cortex compression:</b>
              <ul>
                <li>Difficulty recognizing objects or shapes</li>
                <li>Visual processing delay</li>
              </ul>
            </li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Significant visual impairment due to progressive mass effect:
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>Leads to:</Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Severe visual field loss</li>
            <li>Cortical visual dysfunction</li>
            <li>Possible cortical blindness</li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 4
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Chronic headache</li>
            <li>Variable peritumoral edema</li>
            <li>Increased ICP</li>
          </Box>
        </Box>
      </>
    ),

    Pituitary: (
      <Box sx={{ height: "400px", display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            bgcolor: "#ff00002d",
            borderRadius: "20px",
            textAlign: "center",
            paddingX: "10px",
            paddingY: "5px",
            color: "var(--dark-gray-color)",
            fontWeight: "500",
            "@media (max-width:400px)": {fontSize: "12px"}
          }}
        >
          Pituitary tumors do not originate within the occipital lobe;
          therefore, they do not directly affect it.
        </Typography>
      </Box>
    ),

    NoTumor: (
      <>
        {/* Section 1 */}
        <Box
          className="baseline_state"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <FaRegStar size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Baseline State
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Normal
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Normal occipital lobe function with intact visual processing across
            all subregions.
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>
            Functions include:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Normal visual perception</li>
            <li>Accurate interpretation of shapes, colors, and motion</li>
            <li>Intact visual field processing</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="cognitive_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #378ADD",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#E6F1FB",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#378ADD",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <GoClock size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Cognitive Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#E6F1FB",
                color: "#378ADD",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Subregions
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Proper integration of visual information across all pathways:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#378ADD" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Normal recognition of objects and faces (via occipito-temporal pathway)</li>
            <li>Accurate spatial processing (via occipito-parietal pathway)</li>
            <li>Intact motion perception</li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="physiological_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Physical Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Normal Baseline
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>No ICP elevation</li>
            <li>No cortical dysfunction</li>
            <li>Normal visual cortex activity</li>
          </Box>
        </Box>
      </>
    ),
  },

  PreFrontal: {
    Glioma: (
      <>
        {/* Section 1 */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Early Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Subtle impairment in high-level executive functions.
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 1, "@media (max-width:400px)": { fontSize: "14px" } }}>Symptoms:</Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Reduced judgment and foresight</li>
            <li>Mild personality changes</li>
            <li>Difficulty with complex planning</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intermediate Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Progressive disruption of executive control:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Severe decision-making impairment</li>
            <li>Emotional dysregulation</li>
            <li>Reduced social cognition and empathy</li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Extensive cortical involvement:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Profound behavioral disinhibition or apathy</li>
            <li>Loss of goal-directed behavior</li>
            <li>Possible involvement of adjacent motor areas → motor deficits</li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 4
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Increased intracranial pressure (ICP)</li>
            <li>Peritumoral edema worsening cognitive decline</li>
          </Box>
        </Box>
      </>
    ),

    Meningioma: (
      <>
        {/* Section 1 */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Early Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Slow compression of prefrontal cortex.
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Mild cognitive slowing</li>
            <li>Subtle personality changes</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intermediate Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Progressive frontal compression:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Executive dysfunction</li>
            <li>Reduced attention and working memory</li>
            <li>Emotional flattening</li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Significant mass effect:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Severe apathy or disinhibition</li>
            <li>Cognitive decline resembling dementia</li>
            <li>Possible motor involvement</li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Stage 4
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Chronic headache</li>
            <li>Variable edema</li>
            <li>Increased ICP</li>
          </Box>
        </Box>
      </>
    ),

    Pituitary: (
      <Box sx={{ height: "400px", display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              bgcolor: "#ff00002d",
              borderRadius: "20px",
              textAlign: "center",
              paddingX: "10px",
              paddingY: "5px",
              color: "var(--dark-gray-color)",
              fontWeight: "500",
              mb: 2,
              "@media (max-width:400px)": {fontSize: "12px"}
            }}
          >
            Pituitary tumors do not originate within the prefrontal cortex;
            therefore, they do not directly affect it.
          </Typography>
        </Box>
      </Box>
    ),

    NoTumor: (
      <>
        {/* Section 1 */}
        <Box
          className="baseline_state"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <FaRegStar size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Intact Executive Control
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Normal
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Full prefrontal cortex function with intact executive control:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Planning and reasoning</li>
            <li>Decision-making</li>
            <li>Emotional regulation</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="behavioral_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #378ADD",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#E6F1FB",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#378ADD",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <GoClock size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Behavioral Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#E6F1FB",
                color: "#378ADD",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Baseline
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#378ADD" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Stable personality and social behavior</li>
            <li>Normal social cognition and empathy</li>
            <li>Goal-directed behavior intact</li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="physiological_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Physiological Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": { display: "none" },
              }}
            >
              Normal Baseline
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>No ICP elevation</li>
            <li>No edema</li>
            <li>Normal cerebral perfusion</li>
          </Box>
        </Box>
      </>
    ),
  },
  PituitaryGland: {
    Glioma: (
      <Box sx={{ height: "400px", display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            bgcolor: "#ff00002d",
            borderRadius: "20px",
            textAlign: "center",
            paddingX: "10px",
            paddingY: "5px",
            color: "var(--dark-gray-color)",
            fontWeight: "500",
            "@media (max-width:400px)": {fontSize: "12px"}
          }}
        >
          Gliomas do not originate within the pituitary gland; therefore, they
          do not directly affect it or its hormonal functions.
        </Typography>
      </Box>
    ),

    Meningioma: (
      <Box sx={{ height: "400px", display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            bgcolor: "#ff00002d",
            borderRadius: "20px",
            textAlign: "center",
            paddingX: "10px",
            paddingY: "5px",
            color: "var(--dark-gray-color)",
            fontWeight: "500",
            "@media (max-width:400px)": {fontSize: "12px"}
          }}
        >
          Meningiomas do not originate within the pituitary gland; therefore,
          they do not directly affect it or its hormonal functions.
        </Typography>
      </Box>
    ),

    Pituitary: (
      <>
        {/* Section 1 */}
        <Box
          className="early_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <LuSparkles size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Early Structural Impact
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": {display:"none"}
              }}
            >
              Stage 1
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Early compression of adjacent structures leads to initial visual and
            structural changes.
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Compression of the optic chiasm</li>
            <li>Development of visual field defects</li>
            <li>
              Most commonly results in bitemporal hemianopia (loss of peripheral
              vision on both sides)
            </li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="intermediate_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Endocrine Dysfunction
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": {display:"none"}
              }}
            >
              Stage 2
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Compression of the pituitary gland disrupts normal hormone
            secretion, leading to hormonal imbalance depending on tumor type:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>
              <b>Hormone-secreting tumors:</b> excessive hormone levels
            </li>
            <li>
              <b>Non-functioning tumors:</b> hormonal deficiency due to
              compression
            </li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="advanced_stage"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #EF4343",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDECEC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#EF4343",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <CgDanger size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Advanced Stage
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDECEC",
                color: "#EF4343",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": {display:"none"}
              }}
            >
              Stage 3
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Extension of tumor pressure to the hypothalamus disturbs central
            regulatory functions:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#EF4343" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Sleep regulation</li>
            <li>Appetite control</li>
            <li>Autonomic body balance</li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="secondary_effects"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <RxLoop size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Secondary Effects
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": {display:"none"}
              }}
            >
              Stage 4
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Increased intracranial pressure (ICP) in large tumors leads to:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Headache</li>
            <li>Nausea and vomiting</li>
            <li>General cognitive slowing and fatigue</li>
          </Box>
        </Box>
      </>
    ),

    NoTumor: (
      <>
        {/* Section 1 */}
        <Box
          className="baseline_state"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #2FC770",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#bcd7c6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#2FC770",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <FaRegStar size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Baseline State
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#bcd7c6",
                color: "#2FC770",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": {display:"none"}
              }}
            >
              Normal
            </Typography>
          </Box>
          <Typography sx={{ color: "var(--mid-gray-color)", marginTop: "6px", "@media (max-width:400px)": { fontSize: "12px" } }}>
            Normal endocrine regulation with proper pituitary-hypothalamus
            communication.
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#2FC770" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Normal endocrine regulation of the body</li>
            <li>
              Balanced hormone secretion (GH, TSH, ACTH, LH, FSH, Prolactin,
              ADH, Oxytocin)
            </li>
            <li>Proper communication with hypothalamus</li>
            <li>No compression of optic chiasm or surrounding structures</li>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          className="hormonal_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #378ADD",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginY: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#E6F1FB",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#378ADD",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <GoClock size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Hormonal Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#E6F1FB",
                color: "#378ADD",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": {display:"none"}
              }}
            >
              Baseline
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#378ADD" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Normal growth and metabolic regulation</li>
            <li>Stable reproductive function</li>
            <li>Normal stress response (cortisol regulation via ACTH)</li>
            <li>Normal thyroid function control</li>
            <li>Normal fluid balance via ADH</li>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          className="neurological_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #F59F0A",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#FDF5E6",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#F59F0A",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <TiFlashOutline size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Neural Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#FDF5E6",
                color: "#F59F0A",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": {display:"none"}
              }}
            >
              Intact Pathways
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#F59F0A" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>Intact visual pathways (no visual field defects)</li>
            <li>Normal hypothalamic regulation of body functions</li>
            <li>No mass effect on adjacent brain structures</li>
            <li>Normal cognitive and energy levels</li>
          </Box>
        </Box>

        {/* Section 4 */}
        <Box
          className="physiological_stability"
          sx={{
            padding: "20px",
            borderRadius: "20px",
            borderLeft: "4px solid #9234EA",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.28)",
            marginTop: "20px",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                component={"span"}
                sx={{
                  bgcolor: "#F4EAFC",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  justifyContent: "center",
                  color: "#9234EA",
                  alignItems: "center",
                  "@media (max-width:400px)": { padding: "5px" },
                }}
              >
                <PiPulseBold size={"19"} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, "@media (max-width:400px)": { fontSize: "16px" } }}>
                Physical Stability
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                bgcolor: "#F4EAFC",
                color: "#9234EA",
                paddingX: "10px",
                borderRadius: "15px",
                "@media (max-width:415px)": {display:"none"}
              }}
            >
              Normal Baseline
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "var(--dark-gray-color)",
              "& li::marker": { color: "#9234EA" },
              "@media (max-width:400px)": { fontSize: "12px" },
            }}
          >
            <li>No intracranial mass effect</li>
            <li>No increased intracranial pressure (ICP)</li>
            <li>Normal pituitary size and architecture</li>
            <li>Stable systemic homeostasis</li>
          </Box>
        </Box>
      </>
    ),
  },
};

const TUMOR_TYPES = ["Glioma", "Meningioma", "Pituitary", "NoTumor"];

export default function BrainCard({ activeLabel }) {
  const [tumorType, setTumorType] = useState("Glioma");
  const isMobile = useMediaQuery("(max-width: 1474px)");

  const region = activeLabel?.key;
  const content =
    region && brainData[region] ? brainData[region][tumorType] : null;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        width: "100%",
        borderTopLeftRadius: "30px",
        borderBottomLeftRadius: "30px",
        padding: 2,
        color: "#000",
        height: "500px",
        maxWidth:isMobile?"600px":"400px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f0f0f0",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--primary-color)",
          cursor: "grab",
        },
        "@media (max-width:600px)": {
            padding: "10px",
          }
      }}
    >
      <Box
        sx={{
          display: "flex",
          bgcolor: "#151414",
          borderRadius: "13px",
          mb: 2,
          paddingY: "4px",
          paddingX: "3px",
        }}
      >
        {TUMOR_TYPES.map((type) => (
          <Button
            key={type}
            onClick={(e) => {
              setTumorType(type);
            }}
            sx={{
              color: tumorType === type ? "#fff" : "#7D7D7D",
              flexGrow:"1",
              bgcolor:
                tumorType === type ? "var(--primary-color)" : "transparent",
              borderRadius: "10px",
              fontWeight: tumorType === type ? 800 : 500,
              fontSize: "13px",
              fontFamily: "var(--primary-font)",
              minWidth: 0,
              paddingX: "16px",
              py: 0.5,
              textTransform: "none",
              whiteSpace: "nowrap",
              "@media (max-width:600px)": {
               fontSize: "9px",
               fontWeight: tumorType === type ? 800 : 600,
              }
            }}
          >
            {type === "NoTumor" ? "No Tumor" : type}
          </Button>
        ))}
      </Box>

      {/* Content */}
      {activeLabel ? (
        <Box sx={{ mt: 1 }}>
          {content ?? (
            <Typography sx={{ color: "#666","@media (max-width:400px)": {fontSize: "12px"}}}>
              No data available for this region.
            </Typography>
          )}
        </Box>
      ) : (
        <Box
      sx={{
        padding: {xs:"5px",sm:"10px",md:"25px"},
        borderRadius: "20px",
        background: "#17171720",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        height:"90%"
      }}
    >

      <Typography sx={{ fontWeight: 600, mb: 1 ,display:"flex" ,alignItems: "center",marginTop:{xs:"10px",md:"0px"},marginLeft:{xs:"10px",md:"0px"},"@media (max-width:400px)": {fontSize: "13px"}}}>
        <FmdGoodIcon sx={{ fontSize: "20px" }} />
        Available Regions:
     </Typography>

      <Box className="flex_column" sx={{gap:"10px"}}>
        {[
          {
            icon: <PsychologyIcon />,
            text: "Frontal – Decision making",
            color: "#479EB9",
          },
          {
            icon: <HearingIcon sx={{fontSize:"18px"}}/>,
            text: "Temporal – Memory & hearing",
            color: "#409748",
          },
          {
            icon: <TouchAppIcon sx={{fontSize:"20px"}} />,
            text: "Parietal – Sensory processing",
            color: "#CECF5A",
          },
          {
            icon: <VisibilityIcon sx={{fontSize:"18px"}}/>,
            text: "Occipital – Vision",
            color: "#96241F",
          },
          {
            icon: <DeviceThermostatIcon sx={{fontSize:"18px"}}/>,
            text: "Pituitary – Hormone regulation",
            color: "#6E2C1E",
          },
        ].map((item, i) => (
            <Box key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                transition: "0.2s",
                "&:hover": {
                  background: "#f5f5f5",
                },
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                {item.icon}
              </Box>

              <Typography sx={{ fontSize: "14px","@media (max-width:400px)": {fontSize: "12px"} }}>
                {item.text}
              </Typography>
            </Box>
        ))}
      </Box>

      <Box
        sx={{
          height: "1px",
          background: "#eee",
          marginY: "20px",
        }}
      />

      <Box
        sx={{
          marginTop: "20px",
          padding: "10px",
          borderRadius: "12px",
          background: "var(--primary-color)",
          fontSize: "13px",
          textAlign: "center",
          fontWeight: 600,
          fontFamily:"var(--primary-font)",
          color:"#fff",
          marginBottom:{xs:"10px",md:"0px"}
          ,"@media (max-width:400px)": {fontSize: "10px",padding:"7px"}
        }}
      >
        Start by selecting a brain region
      </Box>
    </Box>
      )}
    </Box>
  );
}