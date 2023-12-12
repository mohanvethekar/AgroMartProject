/**
=========================================================
* Know Your Plant MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Know Your Plant MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Know Your Plant MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/userHome/components/Header";
import Switch from "@mui/material/Switch";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

import PropTypes from "prop-types";
import { useArgonController } from "context";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';
import Icon from "@mui/material/Icon";

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Overview({ noGutter }) {

  const [controller] = useArgonController();
  const { darkMode } = controller;
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get(`${ipofserver}editProduct/${localStorage.getItem('LoginUsername')}`)
      // .then(res => res.json())
      .then(data => {
        // alert(data.data)
        setHospitals(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const EditButton = (event, id, filename, pname, pcat, pdate, pprize, description, instruction) => {
    localStorage.setItem('id', id);
    localStorage.setItem('filename', filename);
    localStorage.setItem('pname', pname);
    localStorage.setItem('pcat', pcat);
    localStorage.setItem('pdate', pdate);
    localStorage.setItem('pprize', pprize);
    localStorage.setItem('pdescription', description);
    localStorage.setItem('pinstruction', instruction);

    window.location.href = '/edit1'
  }

  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <Header />
      <ArgonBox mb={10} mt={-10}>
        <Card>
          <ArgonBox pt={2} px={3}>
            <ArgonBox>
              <ArgonTypography variant="h4" fontWeight="medium">
                Edit product
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>

          {hospitals.map(hospital => (
            <ArgonBox mb={5} m={2} key={hospital[0]}>
              <ArgonBox
                component="li"
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                borderRadius="lg"
                py={1.5}
                px={3}
                mb={noGutter ? 0 : 1}
                mt={2}
                sx={({ palette: { grey, background } }) => ({
                  backgroundColor: darkMode ? background.default : grey[100],
                })}
              >
                <ArgonBox width="100%" display="flex" flexDirection="column">
                  <ArgonBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    flexDirection={{ xs: "column", sm: "row" }}
                    mb={1}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                      </Grid>
                      <Grid item xs={10}>
                        <ArgonTypography variant="button" fontWeight="medium" textTransform="capitalize">
                          {hospital[3]}
                        </ArgonTypography>
                      </Grid>
                    </Grid>

                    <ArgonBox
                      display="flex"
                      alignItems="center"
                      mt={{ xs: 2, sm: 0 }}
                      ml={{ xs: -1.5, sm: 0 }}
                    >
                      <ArgonButton variant="text" color="dark" onClick={event => EditButton(event, hospital[0], hospital[2], hospital[3], hospital[4], hospital[5], hospital[6], hospital[7], hospital[8])}>
                        <Icon>edit</Icon>&nbsp;Edit
                      </ArgonButton>
                    </ArgonBox>
                  </ArgonBox>
                  <Grid container spacing={2}>
                    <Grid item xs={1.7}>
                      <img src={ipofserver + hospital[2]} style={{ width: 100, height: 100, marginTop: -30 }} />
                    </Grid>
                    <Grid item xs={10.3}>
                      <ArgonBox mb={1} lineHeight={0}>
                        <ArgonTypography variant="caption" color="text">
                          Product Category:&nbsp;&nbsp;&nbsp;
                          <ArgonTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                            {hospital[4]}
                          </ArgonTypography>
                        </ArgonTypography>
                      </ArgonBox>
                      <ArgonBox mb={1} lineHeight={0}>
                        <ArgonTypography variant="caption" color="text">
                          Manufacture Date:&nbsp;&nbsp;&nbsp;
                          <ArgonTypography variant="caption" fontWeight="medium">
                            {hospital[5]}
                          </ArgonTypography>
                        </ArgonTypography>
                      </ArgonBox>
                      <ArgonTypography variant="caption" color="text">
                        Product Prize:&nbsp;&nbsp;&nbsp;
                        <ArgonTypography variant="caption" fontWeight="medium">
                          {hospital[6]}
                        </ArgonTypography>
                      </ArgonTypography>
                    </Grid>
                  </Grid>
                </ArgonBox>
              </ArgonBox>
            </ArgonBox>
          ))}
        </Card>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

// Setting default values for the props of Bill
Overview.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Overview.propTypes = {
  noGutter: PropTypes.bool,
};

export default Overview;
