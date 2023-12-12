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
// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";


function Overview() {

  const [hospitals, setHospitals] = useState([]);
  const [catlst, setCatlst] = useState([]);

  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue1, setSelectedValue1] = useState('');
  const handleChange = e => {
    setSelectedValue(e.target.value);    
    if(e.target.value == '' && selectedValue1 == ''){
      // alert(e.target.value+" "+selectedValue1)
      axios.get(`${ipofserver}loadAllProduct/${localStorage.getItem('LoginUsername')}`)
      // .then(res => res.json())
      .then(data => {
        // alert(data.data)
        setHospitals(data.data[0]);
      })
      .catch(err => {
        console.log(err);
      })
    }
    else if(e.target.value == ''){
      
      // alert(e.target.value+" "+selectedValue1)
      axios.get(`${ipofserver}searchProduct/${localStorage.getItem('LoginUsername')}/None/${selectedValue1}`)
        // .then(res => res.json())
        .then(data => {
          // alert(data.data)
          setHospitals(data.data);
        })
        .catch(err => {
          console.log(err);
        })
    }    
    else if(selectedValue1 == ''){
      
      // alert(e.target.value+" "+selectedValue1)
      axios.get(`${ipofserver}searchProduct/${localStorage.getItem('LoginUsername')}/${e.target.value}/None`)
        // .then(res => res.json())
        .then(data => {
          // alert(data.data)
          setHospitals(data.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
    else{
      
      // alert(e.target.value+" "+selectedValue1)
      axios.get(`${ipofserver}searchProduct/${localStorage.getItem('LoginUsername')}/${e.target.value}/${selectedValue1}`)
        // .then(res => res.json())
        .then(data => {
          // alert(data.data)
          setHospitals(data.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  const handleChange1 = e => {
    setSelectedValue1(e.target.value);    
    if(e.target.value == '' && selectedValue == ''){
      // alert(e.target.value+" "+selectedValue)
      axios.get(`${ipofserver}loadAllProduct/${localStorage.getItem('LoginUsername')}`)
      // .then(res => res.json())
      .then(data => {
        // alert(data.data)
        setHospitals(data.data[0]);
      })
      .catch(err => {
        console.log(err);
      })
    }
    else if(e.target.value == ''){
      
      // alert(e.target.value+" "+selectedValue)
      axios.get(`${ipofserver}searchProduct/${localStorage.getItem('LoginUsername')}/${selectedValue}/None`)
        // .then(res => res.json())
        .then(data => {
          // alert(data.data)
          setHospitals(data.data);
        })
        .catch(err => {
          console.log(err);
        })
    }    
    else if(selectedValue == ''){
      
      // alert(e.target.value+" "+selectedValue)
      axios.get(`${ipofserver}searchProduct/${localStorage.getItem('LoginUsername')}/None/${e.target.value}`)
        // .then(res => res.json())
        .then(data => {
          // alert(data.data)
          setHospitals(data.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
    else{
      
      // alert(e.target.value+" "+selectedValue)
      axios.get(`${ipofserver}searchProduct/${localStorage.getItem('LoginUsername')}/${selectedValue}/${e.target.value}`)
        // .then(res => res.json())
        .then(data => {
          // alert(data.data)
          setHospitals(data.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    axios.get(`${ipofserver}loadAllProduct/${localStorage.getItem('LoginUsername')}`)
      // .then(res => res.json())
      .then(data => {
        // alert(data.data)
        setHospitals(data.data[0]);
        setCatlst(data.data[1])
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
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <ArgonTypography variant="h4" fontWeight="medium">
                    All products
                  </ArgonTypography>
                </Grid>
                <Grid item xs={2}>
                  <select style={{ fontFamily: "Calibri", fontSize: '18px' }} onChange={handleChange}>
                    <option value=''>Sort by Prize</option>
                    <option value='500'>Below 500</option>
                    <option value='1000'>Below 1000</option>
                    <option value='5000'>Below 5000</option>
                    <option value='7000'>Below 7000</option>
                  </select>
                </Grid>
                <Grid item xs={3}>
                  <select style={{ fontFamily: "Calibri", fontSize: '18px' }} onChange={handleChange1}>
                    <option value=''>Sort by category</option>
                    {catlst.map((category,i) => (
                      <option key={i} value={category}>{category}</option>
                    ))}
                  </select>
                </Grid>
              </Grid>
            </ArgonBox>
          </ArgonBox>
          <ArgonBox p={2}>
            <Grid container spacing={3}>
              {hospitals.map(hospital => (
                <Grid item xs={12} md={6} xl={4} key={hospital[0]}>
                  <DefaultProjectCard
                    image={ipofserver + hospital[2]}
                    label={hospital[6] + "/- INR"}
                    title={hospital[3]}
                    description={"Category : " + hospital[4] + " M.D : " + hospital[5]}
                    click={hospital}
                    // description={"Category : "+hospital[4]+" M.D : "+hospital[5]}
                    action={{
                      type: "internal",
                      route: "",
                      color: "info",
                      label: "View Product",
                    }}
                  />
                </Grid>
              ))}
              {/* <Grid item xs={12} md={6} xl={4}>
                <DefaultProjectCard
                  image={homeDecor2}
                  label="project #1"
                  title="scandinavian"
                  description="Music is something that every person has his or her own specific opinion about."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "View Project",
                  }}
                  authors={[
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                  ]}
                />
              </Grid> */}
            </Grid>
          </ArgonBox>
        </Card>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
