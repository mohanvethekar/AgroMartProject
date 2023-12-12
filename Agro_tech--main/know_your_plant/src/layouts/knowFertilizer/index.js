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
import IllustrationLayout from "layouts/authentication/components/IllustrationLayoutknow";

import axios from "axios";
import { ipofserver } from 'global';
import Select from "react-select";
import Modal from 'react-bootstrap/Modal';

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

const options = [
  { label: "Select crop", value: "" },
  { label: "rice", value: "rice" },
  { label: "maize", value: "maize" },
  { label: "chickpea", value: "chickpea" },
  { label: "kidneybeans", value: "kidneybeans" },
  { label: "pigeonpeas", value: "pigeonpeas" },
  { label: "mothbeans", value: "mothbeans" },
  { label: "mungbean", value: "mungbean" },
  { label: "blackgram", value: "blackgram" },
  { label: "lentil", value: "lentil" },
  { label: "pomegranate", value: "pomegranate" },
  { label: "banana", value: "banana" },
  { label: "mango", value: "mango" },
  { label: "grapes", value: "grapes" },
  { label: "watermelon", value: "watermelon" },
  { label: "muskmelon", value: "muskmelon" },
  { label: "apple", value: "apple" },
  { label: "orange", value: "orange" },
  { label: "papaya", value: "papaya" },
  { label: "cotton", value: "cotton" },
  { label: "jute", value: "jute" },
  { label: "coffee", value: "coffee" }
];

const styles = {
  control: base => ({
    ...base,
    fontFamily: "Calibri",
    fontSize: '18px'
  }),
  menu: base => ({
    ...base,
    fontFamily: "Calibri",
    fontSize: '18px'
  })
};
function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [selectedValue, setSelectedValue] = useState('');
  const [modalval, setModalVal] = useState('');


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange1 = e => {
    setSelectedValue(e.value);
  }

  const [inputField, setInputField] = useState({
    Nitrogen: '',
    Phosphorous: '',
    Pottasium: ''
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
      Nitrogen: '',
      Phosphorous: '',
      Pottasium: ''
    });
    setSelectedValue('')
  }

  const handleSubmission = async () => {
    // console.log(isFilePicked);
    if (inputField.Nitrogen == '' || inputField.Phosphorous == '' || inputField.Pottasium == '' || selectedValue == '') {
      alert("Please fill all details !") // eslint-disable-line no-alert
    }
    else {

      axios.post(ipofserver + 'knowFertilizer', {
        Nitrogen: inputField.Nitrogen,
        Phosphorous: inputField.Phosphorous,
        Pottasium: inputField.Pottasium,
        plantname: selectedValue
      })
        .then(function (response) {
          // alert(response.data)
          clearInput()
          const regex = /(<([^>]+)>)/gi;
          const newString = response.data.replace(regex, " ");
          setModalVal(newString)
          handleShow()
        })
        .catch(function (error) {
          return error;
        });

    }
  };

  return (
    <IllustrationLayout
      title="Add details"
      description="Get informed advice on fertilizer based on soil"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput type="number" placeholder="Nitrogen" size="large" name="Nitrogen" value={inputField.Nitrogen}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="number" placeholder="Phosphorous" size="large" name="Phosphorous" value={inputField.Phosphorous}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="number" placeholder="Pottasium" size="large" name="Pottasium" value={inputField.Pottasium}
            onChange={inputsHandler} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <Select className="select" styles={styles} options={options} onChange={handleChange1}
            value={options.find(obj => obj.value === selectedValue)} />
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
        <ArgonBox mt={4} mb={15}>
          <ArgonButton color="info" size="large" style={{ fontSize: 17 }} onClick={handleSubmission} fullWidth>
            Predict fertilizer
          </ArgonButton>
        </ArgonBox>
        <Modal
          size="lg"
          aria-labelledby="example-modal-sizes-title-lg"
          show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Predicted Fertilizer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center" style={{ color: '#000', fontSize: 20 }}>{modalval}</p>
          </Modal.Body>
          <Modal.Footer>
            <ArgonButton
              color="info"
              fontSize='15'
              variant='dark'
              fontWeight='bold'
              onClick={handleClose}>
              Close
            </ArgonButton>
          </Modal.Footer>
        </Modal>

      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
