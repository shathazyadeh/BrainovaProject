import {
  Box,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { LuBrain } from "react-icons/lu";
import style from "./Footer.module.css";

function Footer() {
    const location = useLocation();
    let footerBodyColor = "#000";
    if (location.pathname === "/home") footerBodyColor = "#171717";

  return (
    <Box
      component={"section"}
      sx={{
        alignItems: "center",
        bgcolor: footerBodyColor,
        paddingTop: "70px",
        borderTopLeftRadius: "90px",
        borderTopRightRadius: "90px",
      }}
      className="footer flex_column"
    >
      <Grid
        container
        sx={{
          borderBottom: "1px solid #313131",
          paddingBottom: "30px",
        }}
      >
        <Grid item className="flex_column" size={{ xs: 12, sm: 6, lg: 6 }}>
          <Box
            className="logo"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              justifyContent: { xs: "center", lg: "flex-start" },
            }}
          >
            <Typography
              component={"span"}
              sx={{
                bgcolor: "rgba(43, 25, 25)",
                padding: "10px",
                borderRadius: "15px",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LuBrain size={"30"} color="var(--light-red-color)" />
            </Typography>
            <Typography
              component={"h2"}
              variant="h4"
              sx={{
                fontWeight: "800",
                fontFamily: "monospace",
                fontSize: 40,
                letterSpacing: "5px",
                marginLeft: "5px",
                color: "#fff",
              }}
            >
              BRAINOVA
            </Typography>
          </Box>
          <Typography
            component={"p"}
            sx={{
              color: "var(--mid-gray-color)",
              fontWeight: "600",
              marginTop: "30px",
              textAlign: { xs: "center", lg: "start" },
            }}
          >
            Advanced AI-powered brain tumor detection for medical professionals
            worldwide.
          </Typography>
        </Grid>
        <Grid item className="flex_column" size={{ xs: 12, sm: 6, lg: 2 }}>
          <Typography
            component={"h3"}
            variant="h6"
            sx={{
              fontWeight: "800",
              fontSize: "22px",
              textAlign: { xs: "center", lg: "start" },
              color: "#fff",
            }}
          >
            Platform
          </Typography>
          <List dense>
            <ListItem sx={{ paddingX: "0" }}>
              <ListItemText sx={{ textAlign: { xs: "center", lg: "start" } }}>
                <Link
                  className={style.footer_link}
                  component={RouterLink}
                  to="/home"
                  sx={{ color: "var(--mid-gray-color)", fontWeight: "600" }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Home
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ paddingX: "0" }}>
              <ListItemText sx={{ textAlign: { xs: "center", lg: "start" } }}>
                <Link
                  className={style.footer_link}
                  component={RouterLink}
                  to="/predict-tumor"
                  sx={{ color: "var(--mid-gray-color)", fontWeight: "600" }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Upload MRI
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ paddingX: "0" }}>
              <ListItemText sx={{ textAlign: { xs: "center", lg: "start" } }}>
                <Link
                  className={style.footer_link}
                  component={RouterLink}
                  to=""
                  sx={{ color: "var(--mid-gray-color)", fontWeight: "600" }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Learning Hub
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item className="flex_column" size={{ xs: 12, sm: 6, lg: 2 }}>
          <Typography
            component={"h3"}
            variant="h6"
            sx={{
              fontWeight: "800",
              fontSize: "22px",
              textAlign: { xs: "center", lg: "start" },
              color: "#fff",
            }}
          >
            About Us
          </Typography>
          <List dense>
            <ListItem sx={{ paddingX: "0" }}>
              <ListItemText sx={{ textAlign: { xs: "center", lg: "start" } }}>
                <Link
                  className={style.footer_link}
                  component={RouterLink}
                  to="./home"
                  sx={{ color: "var(--mid-gray-color)", fontWeight: "600" }}
                >
                  About Brainova
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ paddingX: "0" }}>
              <ListItemText sx={{ textAlign: { xs: "center", lg: "start" } }}>
                <Link
                  className={style.footer_link}
                  component={RouterLink}
                  to="./home"
                  sx={{ color: "var(--mid-gray-color)", fontWeight: "600" }}
                >
                  Our Team
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ paddingX: "0" }}>
              <ListItemText sx={{ textAlign: { xs: "center", lg: "start" } }}>
                <Link
                  className={style.footer_link}
                  component={RouterLink}
                  to="./home"
                  sx={{ color: "var(--mid-gray-color)", fontWeight: "600" }}
                >
                  Mission & Vision
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item className="flex_column" size={{ xs: 12, sm: 6, lg: 2 }}>
          <Typography
            component={"h3"}
            variant="h6"
            sx={{
              fontWeight: "800",
              fontSize: "22px",
              textAlign: { xs: "center", lg: "start" },
              color: "#fff",
            }}
          >
            Resources
          </Typography>
          <List dense>
            <ListItem sx={{ paddingX: "0" }}>
              <ListItemText sx={{ textAlign: { xs: "center", lg: "start" } }}>
                <Link
                  className={style.footer_link}
                  component={RouterLink}
                  to="./home"
                  sx={{ color: "var(--mid-gray-color)", fontWeight: "600" }}
                >
                  Documentation
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ paddingX: "0" }}>
              <ListItemText sx={{ textAlign: { xs: "center", lg: "start" } }}>
                <Link
                  className={style.footer_link}
                  component={RouterLink}
                  to="./home"
                  sx={{ color: "var(--mid-gray-color)", fontWeight: "600" }}
                >
                  Privacy Policy
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ paddingX: "0" }}>
              <ListItemText sx={{ textAlign: { xs: "center", lg: "start" } }}>
                <Link
                  className={style.footer_link}
                  component={RouterLink}
                  to="./home"
                  sx={{ color: "var(--mid-gray-color)", fontWeight: "600" }}
                >
                  Terms of Service
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Box className="lower_footer" sx={{textAlign:"center"}}>
        <Typography
          component={"p"}
          sx={{ color: "var(--mid-gray-color)", paddingY: "30px" }}
        >
          © 2026{" "}
          <Typography
            component={"span"}
            sx={{ color: "var(--dark-red-color)" }}
          >
            Brainova
          </Typography>
          . All rights reserved. | Built for medical education and research
          purposes.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;