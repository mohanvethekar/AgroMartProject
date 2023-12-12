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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Know Your Plant MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import preview from "../../../src/assets/images/browse.jpg";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout1";

import axios from "axios";
import { ipofserver } from 'global';

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function View() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [inputField, setInputField] = useState({
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    mobile: localStorage.getItem('mob'),
    password: localStorage.getItem('pass')
  })

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmission = async () => {
    // console.log(isFilePicked);
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (inputField.name == '' || inputField.email == '' || inputField.mobile == '' || inputField.password == '') {
      alert("Please fill all details !") // eslint-disable-line no-alert
    }
    else if (inputField.mobile.length != 10) {
      alert("Please enter valid mobile number !")
      // clearInput()
    }
    else if (!filter.test(inputField.email)) {
      alert("Please enter valid email !")
      // clearInput()
    }
    else {
      // alert(inputField.name + " " + inputField.email + " " + inputField.mobile + " " + inputField.password )
      axios.post(ipofserver + 'updateUser', {
        id: localStorage.getItem('id'),
        username: inputField.name,
        email: inputField.email,
        mobile: inputField.mobile,
        password: inputField.password
      })
        .then(function (response) {
          // alert(typeof(response.data))
          if (response.data == "success") {
            alert("User updated successfully !")
            window.location.href = '/viewUsers'
          }
          else {
            alert("Something wrong !")
          }
        })
        .catch(function (error) {
          return error;
        });
    }
  };

  return (
    <IllustrationLayout
      title="Edit User"
      description="Enter user details"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput type="text" placeholder="" size="large" name="name" value={inputField.name}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="text" placeholder="Product category" size="large" name="email" value={inputField.email}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="number" placeholder="Product manufature date" size="large" name="mobile" value={inputField.mobile}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="password" placeholder="Product prize" size="large" name="password" value={inputField.password}
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
            Update user
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default View;
