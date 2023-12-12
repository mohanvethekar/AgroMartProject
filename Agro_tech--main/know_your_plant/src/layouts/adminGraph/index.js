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
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';
import Icon from "@mui/material/Icon";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import PropTypes from "prop-types";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import Grid from "@mui/material/Grid";

import typography from "assets/theme/base/typography";
// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";


function Illustration({ noGutter }) {

  const [graphlabel, setGraphlabel] = useState([])
  const [graphdata, setGraphdata] = useState([])
  const [usercount, setusercount] = useState()
  const [ordercount, setordercount] = useState()
  const [salescount, setsalescount] = useState()

  useEffect(() => {
    axios.get(`${ipofserver}getGraphData`)
      // .then(res => res.json())
      .then(data => {
        // alert(data.data)
        setusercount(data.data[4])
        setordercount(data.data[0])
        setsalescount(data.data[1])

        setGraphlabel(data.data[2])
        setGraphdata(data.data[3])
        // setGraphlabel(["Apr", "May", "Jun"])
        // setGraphdata([50, 40, 300])
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const gradientLineChartData = {
    labels: graphlabel,
    datasets: [
      {
        label: "Mobile apps",
        color: "info",
        data: graphdata,
      },
    ],
  };

  const { size } = typography;
  return (
    <IllustrationLayout
      title="All graphs"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox mb={10} mt={-3}>

      <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={4}>
            <DetailedStatisticsCard
              title="Total users"
              count={usercount}
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              percentage={{ color: "success", count: "+55%", text: "since yesterday" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DetailedStatisticsCard
              title="Total orders"
              count={ordercount}
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              percentage={{ color: "success", count: "+3%", text: "since last week" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DetailedStatisticsCard
              title="Total sales"
              count={salescount+" Rs."}
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              percentage={{ color: "error", count: "-2%", text: "since last quarter" }}
            />
          </Grid>
        </Grid>
        <GradientLineChart
          title="Sales Overview"
          description={
            <ArgonBox display="flex" alignItems="center">
              <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
              </ArgonBox>
              <ArgonTypography variant="button" color="text" fontWeight="medium">
                4% more{" "}
                <ArgonTypography variant="button" color="text" fontWeight="regular">
                  in 2022
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          }
          chart={gradientLineChartData}
        />
      </ArgonBox>


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
