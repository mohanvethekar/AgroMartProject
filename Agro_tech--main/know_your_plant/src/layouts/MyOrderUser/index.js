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
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/userHome/components/Header";
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Overview() {

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get(`${ipofserver}viewOrders/${localStorage.getItem('LoginUsername')}`)
      // .then(res => res.json())
      .then(data => {
        // alert(data.data)
        setHospitals(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

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
      <ArgonBox mb={3} mt={-10}>
        <Card>
          <ArgonBox pt={2} px={2}>
            <ArgonBox mb={0.5}>
              <ArgonTypography variant="h4" fontWeight="medium">
                My orders
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
          <ArgonBox p={2} m={2}>
            <Table striped bordered hover>
              <thead style={{ fontSize: 18 }}>
                <tr>
                  <th>No.</th>
                  <th>Product</th>
                  <th>Product prize</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 16 }}>
                {hospitals.map((hospital, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <img
                          src={ipofserver + hospital[1]}
                          width={100}
                          alt='Player'
                        />
                      </div>
                      <div>
                        <b>{hospital[2]}</b>
                      </div>
                    </td>
                    <td>{hospital[3]}</td>
                    <td>{hospital[4]}</td>
                    <td>{hospital[5]}</td>
                    <td>{hospital[8]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* {hospitals.map(hospital => (
              ))} */}
          </ArgonBox>
        </Card>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
