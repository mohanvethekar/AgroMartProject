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

  const handleSubmission = async () => {
    // console.log(isFilePicked);
    axios.post(ipofserver + 'addToCart', {
      id: JSON.parse(localStorage.getItem('viewproductlist'))[0],
      uploader: JSON.parse(localStorage.getItem('viewproductlist'))[1],
      file: JSON.parse(localStorage.getItem('viewproductlist'))[2],
      name: JSON.parse(localStorage.getItem('viewproductlist'))[3],
      cat: JSON.parse(localStorage.getItem('viewproductlist'))[4],
      date: JSON.parse(localStorage.getItem('viewproductlist'))[5],
      prize: JSON.parse(localStorage.getItem('viewproductlist'))[6],
      quantity: document.getElementById('selectofquqntity').value,
      buyer: localStorage.getItem('LoginUsername')
    })
      .then(function (response) {
        // alert(typeof(response.data))
        if (response.data == "success") {
          alert("Product added to cart !")
          window.location.href = '/userCart'
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
                Add to Cart
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>


          <ArgonBox component="form" role="form" m={3}>
            <section className="section-content padding-y bg">
              <div className="container">

                <article className="card">
                  <div className="card-body">
                    <div className="row">
                      <aside className="col-md-6">
                        <article className="gallery-wrap">
                          <div className="card img-big-wrap">
                            <a href="#"> <img src={ipofserver + JSON.parse(localStorage.getItem('viewproductlist'))[2]}
                              style={{ height: 500, width: 447 }} /></a>
                          </div>
                        </article>
                      </aside>
                      <main className="col-md-6">
                        <article>
                          <h6 className="title">{"Id : " + JSON.parse(localStorage.getItem('viewproductlist'))[0]}</h6>
                          <h1 className="title">{JSON.parse(localStorage.getItem('viewproductlist'))[3]}</h1>
                          <div>
                            <span className="label-rating mr-3 text-muted">{"Catogory : " + JSON.parse(localStorage.getItem('viewproductlist'))[4]}</span><br></br>
                            <span className="label-rating mr-3 text-muted">{"Manufacture Date : " + JSON.parse(localStorage.getItem('viewproductlist'))[5]}</span>
                          </div>

                          <hr />

                          <div className="mb-3">
                            <h6>Description</h6>
                            <ul className="list-dots mb-0">
                              <li>{JSON.parse(localStorage.getItem('viewproductlist'))[7]}</li>
                            </ul>
                          </div>

                          <div className="mb-3">
                            <h6>How To Use ?</h6>
                            <ul className="list-dots mb-0">
                              <li>{JSON.parse(localStorage.getItem('viewproductlist'))[8]}</li>
                            </ul>
                          </div>

                          <div className="form-group">
                            <label className="text-muted">Prize</label>
                            <div>
                              <label className="js-check btn btn-check active mr-1">
                                <input type="radio" name="option_size" value="option1" checked="" />
                                <span>Small</span>
                              </label>
                              <label className="js-check btn btn-check mr-1">
                                <input type="radio" name="option_size" value="option1" />
                                <span>Medium</span>
                              </label>
                              <label className="js-check btn btn-check mr-1">
                                <input type="radio" name="option_size" value="option1" />
                                <span>Large</span>
                              </label>
                              <label className="js-check btn btn-check disabled">
                                <input type="radio" name="option_size" disabled="" value="option1" />
                                <span>Babies</span>
                              </label>
                            </div>
                          </div>

                          <div className="mb-3">
                            <var className="price h4">{"Rs. " + JSON.parse(localStorage.getItem('viewproductlist'))[6]}</var> <br />
                          </div>

                          <ArgonBox mb={3} lineHeight={0}>
                            <select style={{ width: '100%', height: 40 }} id="selectofquqntity">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </ArgonBox>

                          <div className="mb-4">
                            <ArgonBox mt={4} mb={1}>
                              <ArgonButton color="info" size="large" style={{ fontSize: 17 }} onClick={handleSubmission} fullWidth>
                                Add to Cart
                              </ArgonButton>
                            </ArgonBox>
                          </div>

                        </article>
                      </main>
                    </div>
                  </div>
                </article>
              </div>


            </section>
          </ArgonBox>
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
