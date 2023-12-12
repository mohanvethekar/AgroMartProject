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
import Modal from 'react-bootstrap/Modal';

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [modalval, setModalVal] = useState('');


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
  }

  function clearInput() {
    setFile(null)
    setSelectedFile('')
  }

  const handleSubmission = async () => {
    // console.log(isFilePicked);
    if (selectedFile == '') {
      alert("Please fill all details !") // eslint-disable-line no-alert
    }
    else {

      const formData = new FormData();

      formData.append('File', selectedFile);

      const res = await axios.post(`${ipofserver}knowDisease`, formData);

      clearInput()
      const regex = /(<([^>]+)>)/gi;
      const newString = res.data.replace(regex, " ");
      setModalVal(newString)
      handleShow()

    }
  };

  return (
    <IllustrationLayout
      title="Add Image"
      description="Find out which disease has been caught by your plant"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
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
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" style={{ fontSize: 17 }} onClick={handleSubmission} fullWidth>
            Predict disease
          </ArgonButton>
        </ArgonBox>
        <Modal
          size="lg"
          aria-labelledby="example-modal-sizes-title-lg"
          show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Predicted disease</Modal.Title>
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
