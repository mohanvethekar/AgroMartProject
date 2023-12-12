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
import preview from "../../../src/assets/images/browse.jpg";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Overview() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [inputField, setInputField] = useState({
    name: '',
    category: '',
    date: '',
    prize: '',
    description: '',
    instruction: ''
  })

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function clearInput() {
    setInputField({
      name: '',
      category: '',
      date: '',
      prize: '',
      description: '',
      instruction: ''
    });
    setFile(null);
    setSelectedFile('');
  }

  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
  }

  const handleSubmission = async () => {
    // console.log(isFilePicked);
    if (selectedFile == '' || inputField.name == '' || inputField.category == '' || inputField.date == '' || inputField.prize == '' || inputField.description == '' || inputField.instruction == '') {
      alert("Please fill all details !") // eslint-disable-line no-alert
    }
    else {

      const formData = new FormData();

      formData.append('File', selectedFile);
      formData.append('pname', inputField.name);
      formData.append('pcategory', inputField.category);
      formData.append('pdate', inputField.date);
      formData.append('pprize', inputField.prize);
      formData.append('description', inputField.description);
      formData.append('instruction', inputField.instruction);
      formData.append('user', localStorage.getItem('LoginUsername'));

      const res = await axios.post(`${ipofserver}addProduct`, formData);

      if (res.data == "success") {
        alert("Product added sucessfully !")
        clearInput()
      }
      else {
        alert("Product not uploaded !")
      }

    }
  };


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
          <ArgonBox pt={2} px={3}>
            <ArgonBox>
              <ArgonTypography variant="h4" fontWeight="medium">
                Add product
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
          <ArgonBox component="form" role="form" m={5}>
            <div className="App">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <label htmlFor="file1">
                  <img src={file == null ? preview : file} style={{
                    width: 370, height: 270, borderWidth: 2, borderStyle: 'dashed', borderColor: 'black', borderRadius: 4
                  }} />
                </label>
              </div>
              <input type="file" id="file1" onChange={handleChange} hidden />
            </div>
            <ArgonBox mb={2}>
              <ArgonInput type="text" placeholder="Product name" size="large" name="name" value={inputField.name}
                onChange={inputsHandler} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="text" placeholder="Product category" size="large" name="category" value={inputField.category}
                onChange={inputsHandler} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="date" placeholder="Product manufature date" size="large" name="date" value={inputField.date}
                onChange={inputsHandler} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="number" placeholder="Product prize" size="large" name="prize" value={inputField.prize}
                onChange={inputsHandler} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="text" placeholder="Product description" size="large" name="description" value={inputField.description}
                onChange={inputsHandler} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="text" placeholder="How to use?" size="large" name="instruction" value={inputField.instruction}
                onChange={inputsHandler} />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton color="info" size="large" style={{ fontSize: 17 }} onClick={handleSubmission} fullWidth>
                Add product
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </Card>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
