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
import ArgonInput from "components/ArgonInput";

// Overview page components
import Header from "layouts/userHome/components/Header";
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';

import Icon from "@mui/material/Icon";
import ArgonButton from "components/ArgonButton";

import { PayPalButton } from "react-paypal-button-v2";

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Overview() {

  const [hospitals, setHospitals] = useState([]);

  const [totalPrice, setTotalPrice] = useState([]);

  const [inputField, setInputField] = useState({
    address: ''
  })

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  useEffect(() => {
    axios.get(`${ipofserver}cartProducts/${localStorage.getItem('LoginUsername')}`)
      // .then(res => res.json())
      .then(data => {
        // alert(data.data)
        setHospitals(data.data);
        let x = 0
        data.data.map((i) => {
          x += Number(i[7]) * Number(i[6])
          // alert(x)
          setTotalPrice(x)
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const DeleteButton = (event, idofp, uploader, buyer) => {

    // alert(idofp+uploader+buyer)
    axios.post(ipofserver + 'removeCart', {
      id: idofp,
      uploader: uploader,
      buyer: buyer
    })
      .then(function (response) {

        if (response.data == "success") {
          window.location.href = '/userCart'
        }
        else {
          alert("Product not removed !")
        }
      })
      .catch(function (error) {
        return error;
      });
  }

  const enabled = inputField.address.length > 0;
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
                Your cart
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
          <ArgonBox p={2} m={2}>
            <Table striped bordered hover>
              <thead style={{ fontSize: 18 }}>
                <tr>
                  <th>No.</th>
                  <th>Product</th>
                  <th>Product category</th>
                  <th>Product prize</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 16 }}>
                {hospitals.map((hospital, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                          src={ipofserver + hospital[2]}
                          width={100}
                          alt='Player'
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <b>{hospital[3]}</b>
                      </div>
                    </td>
                    <td>{hospital[4]}</td>
                    <td>{hospital[6]}</td>
                    <td>{hospital[7]}</td>
                    <td>{Number(hospital[7]) * Number(hospital[6])}</td>
                    <td>
                      <ArgonBox mr={1}>
                        <ArgonButton variant="text" color="error"
                          onClick={event => DeleteButton(event, hospital[0], hospital[1], hospital[8])}>
                          <Icon>delete</Icon>&nbsp;Remove
                        </ArgonButton>
                      </ArgonBox>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5}><b>Grand Total :</b>
                    <ArgonBox mb={2} style={{ justifyContent: 'flex-end' }}>
                      <ArgonInput type="text" placeholder="Enter shipping address" size="large" name="address" value={inputField.address}
                        onChange={inputsHandler} />
                    </ArgonBox>
                  </td>
                  <td>{totalPrice}</td>
                  <td>
                    {!enabled ? (
                      <></>
                    ) : (                   
                      <PayPalButton
                        options={{
                          clientId: "AdcPjMYcqVkLHiaeSZIF5KcT5vZODHvgiujq8T4ZXU0kUa4yvDYxuP6l0mPgkXsjZuSSydfgmNI6fwgB",
                          currency: "USD",
                        }}
                        amount={totalPrice}
                        onSuccess={(details, data) => {
                          alert("Transaction completed by " + details.payer.name.given_name);
  
                          axios.post(ipofserver + 'donePayment', {
                            username: localStorage.getItem('LoginUsername'),
                            address: inputField.address
                          })
                            .then(function (response) {
  
                              if (response.data == "success") {
  
                                // alert("Payment completed !")
                                window.location.href = '/Home'
                              }
                              else {
                                alert("Payment is not done !")
                              }
                            })
                            .catch(function (error) {
                              return error;
                            });
  
                        }}
                      />
                    )} 
                  </td>
                </tr>
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
