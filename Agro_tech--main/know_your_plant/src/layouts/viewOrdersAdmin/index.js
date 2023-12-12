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

// Know Your Plant MUI components
import ArgonBox from "components/ArgonBox";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout1";

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';
import Icon from "@mui/material/Icon";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import PropTypes from "prop-types";
import { useArgonController } from "context";

import Table from "examples/Tables/Table";
import Card from "@mui/material/Card";

import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

import team2 from "assets/images/team-2.jpg";
import Grid from "@mui/material/Grid";
import { fontSize } from "@mui/system";

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";



function Illustration({ noGutter }) {

  const [controller] = useArgonController();
  const { darkMode } = controller;

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get(`${ipofserver}viewOrders/all`)
      // .then(res => res.json())
      .then(data => {
        // alert(data.data)
        setHospitals(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const handleChange = (param1, param2, param3, param4, param5) => e => {
    // alert(param3+"  "+document.getElementById('selectofquqntity'+param1+param3+param4+param5).value)
    axios.post(ipofserver + 'updateOrderStatus', {
      id: param1,
      title: param2,
      prize: param3,
      quantity: param4,
      buyer: param5,
      status: document.getElementById('selectofquqntity'+param1+param3+param4+param5).value
    })
      .then(function (response) {
        // alert(typeof(response.data))
        if (response.data == "success") {
          alert("Status updated successfully !")
        }
        else {
          alert("Something wrong !")
        }
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <IllustrationLayout
      title="All orders"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      {hospitals.map((hospital, index) => (
        <ArgonBox mb={5} mt={-3} key={hospital[0]}>
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
                <Grid container spacing={1}>
                  <Grid item xs={0.5}>
                    {index + 1}
                  </Grid>
                  <Grid item xs={2}>
                    <div>
                      <img
                        src={ipofserver + hospital[1]}
                        width={50}
                        alt='Player'
                      />
                    </div>
                    <div>
                      <b>{hospital[2]}</b>
                    </div>
                  </Grid>
                  <Grid item xs={1.5} style={{ fontSize: 17 }}>
                    {"Prize : " + hospital[3]}
                  </Grid>
                  <Grid item xs={1.5} style={{ fontSize: 17 }}>
                    {"Quantity : " + hospital[4]}
                  </Grid>
                  <Grid item xs={1.5} style={{ fontSize: 17 }}>
                    {hospital[5]}
                  </Grid>
                  <Grid item xs={2} style={{ fontSize: 17 }}>
                    {"Buyer : " + hospital[6]}
                  </Grid>
                  <Grid item xs={1.5} style={{ fontSize: 17 }}>
                    {hospital[7]}
                  </Grid>
                  <Grid item xs={1.5}>
                    <ArgonBox mb={3} lineHeight={0}>
                      <select style={{ width: '100%', height: 30, fontSize: 13 }} id={"selectofquqntity"+hospital[0]+hospital[3]+hospital[4]+hospital[6]}>
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </ArgonBox>

                    <ArgonButton color="info" size="small" style={{ fontSize: 15 }} onClick={handleChange(hospital[0], hospital[2], hospital[3], hospital[4], hospital[6])} fullWidth>
                      Update
                    </ArgonButton>
                  </Grid>
                </Grid>
              </ArgonBox>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      ))}

      {/* {hospitals.map(hospital => (
        <ArgonBox mb={5} mt={-3} key={hospital[0]}>
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
              <Grid container spacing={2}>
                <Grid item xs={1.7} style={{marginTop: 30}}>
                  <img src={ipofserver + hospital[1]} style={{ width: 50, height: 50, marginTop: -30 }} />
                </Grid>
                <Grid item xs={10.3}>
                  <ArgonTypography variant="button" fontWeight="medium" textTransform="capitalize" style={{}}>
                    {hospital[2]}
                  </ArgonTypography>
                  <ArgonBox lineHeight={0}>
                    <ArgonTypography variant="caption" color="text">
                      Product Category:&nbsp;&nbsp;&nbsp;
                      <ArgonTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                        {hospital[4]}
                      </ArgonTypography>
                    </ArgonTypography>
                  </ArgonBox>
                  <ArgonBox lineHeight={0}>
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
      ))} */}
    </IllustrationLayout>
  );
}


// Setting default values for the props of Bill
Illustration.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Illustration.propTypes = {
  noGutter: PropTypes.bool,
};

export default Illustration;
