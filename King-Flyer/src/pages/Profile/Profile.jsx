import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = ({ credentials }) => {
  let navigate = useNavigate();

  const username = credentials.username;
  const [userDetails, setUserDetails] = useState(null);
  const [editDetails, setEditDetails] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    setEdit(event.target.checked);
  };
  useEffect(() => {
    // setEditDetails(null);
    // setUserDetails(null);
    fetchUserDetails();
  }, []);

  async function fetchUserDetails() {
    const url =
      "http://localhost:8080/api/user/get_details?username=" + username;
    console.log(url);

    await axios
      .get(url, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.access_token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (userDetails === null && editDetails === null) {
          setUserDetails(res.data);
          setEditDetails(res.data);
        }
      });
  }

  const SaveUpdatedValue = async (e) => {
    e.preventDefault();
    if (
      editDetails.firstname === "" ||
      editDetails.lastname === "" ||
      (editPassword && newPassword === "") ||
      editDetails.contact.email === "" ||
      editDetails.contact.mobileNo === "" ||
      editDetails.contact.address.type === "" ||
      editDetails.contact.address.addressLine === "" ||
      editDetails.contact.address.city === "" ||
      editDetails.contact.address.state === "" ||
      editDetails.contact.address.country === "" ||
      editDetails.contact.address.zipCode === ""
    ) {
      alert("please fill all values!");
    } else {
      const url =
        "http://localhost:8080/api/user/modify_details?username=" + username;
      console.log(url);
      if (editPassword && newPassword !== "") {
        setEditDetails({
          ...editDetails,
          password: newPassword,
        });
      } else {
        setEditDetails({
          ...editDetails,
          password: userDetails.password,
        });
      }
      const bodyJson = JSON.stringify(editDetails);
      await axios
        .put(url, bodyJson, {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + credentials.access_token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setEditDetails(res.data);
          setUserDetails(res.data);
        });
      setEdit(false);
    }
  };

  return (
    <div className="Main">
      {userDetails !== null && editDetails !== null ? (
        <div>
          <h1 className="title">Profile</h1>
          <div className="profileContainer">
            <div className="viewProfileContainer">
              <h2 className="viewTitle">View</h2>
              <hr />
              <div className="userDetails">
                <h1 className="viewUsername">{userDetails.username}</h1>
                <div className="name">
                  <h3 className="firstname">{userDetails.firstname}</h3>
                  <h3 className="lastname">{userDetails.lastname}</h3>
                </div>
              </div>
              <div className="contactDetails">
                <h2>Contact Details</h2>
                <h3>Email : {userDetails.contact.email}</h3>
                <h3>Mobile : {userDetails.contact.mobileNo}</h3>
              </div>
              <div className="addressDetails">
                <h2>Address Details</h2>
                <h3>Address Type : {userDetails.contact.address.type}</h3>
                <h3>
                  Address Line : {userDetails.contact.address.addressLine}
                </h3>
                <h3>City : {userDetails.contact.address.city}</h3>
                <h3>State : {userDetails.contact.address.state}</h3>
                <h3>Country : {userDetails.contact.address.country}</h3>
                <h3>Zipcode : {userDetails.contact.address.zipCode}</h3>
              </div>
            </div>
            <div className="editProfileContainer">
              <div className="top">
                <h2 className="editTitle">Edit</h2>
                <Switch
                  checked={edit}
                  className="editIcon"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <hr />
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    value={editDetails.firstname}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        firstname: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    value={editDetails.lastname}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        lastname: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <FormControlLabel
                    disabled={!edit}
                    value="bottom"
                    control={
                      <Switch
                        checked={editPassword}
                        className="editIcon"
                        onChange={(e) => {
                          setEditPassword(e.target.checked);
                          if (!e.target.checked) {
                            setEditDetails({
                              ...editDetails,
                              password: userDetails.password,
                            });
                          }
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Change Password"
                    labelPlacement="start"
                  />
                </Grid>
                <Grid item md={6}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    disabled={editPassword && edit ? false : true}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        if (editPassword && e.target.value !== null) {
                          setEditDetails({
                            ...editDetails,
                            password: e.target.value,
                          });
                        } else {
                          setEditDetails({
                            ...editDetails,
                            password: userDetails.password,
                          });
                        }
                        setNewPassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disabled={editPassword && edit ? false : true}
                          >
                            {showPassword ? (
                              <VisibilityOffRounded />
                            ) : (
                              <VisibilityRounded />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="New Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    label="Email"
                    type={"email"}
                    variant="outlined"
                    value={editDetails.contact.email}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        contact: {
                          ...editDetails.contact,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    label="Mobile Number"
                    variant="outlined"
                    value={editDetails.contact.mobileNo}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        contact: {
                          ...editDetails.contact,
                          mobileNo: e.target.value,
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    label="Address type"
                    variant="outlined"
                    value={editDetails.contact.address.type}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        contact: {
                          ...editDetails.contact,
                          address: {
                            ...editDetails.contact.address,
                            type: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    label="Address"
                    variant="outlined"
                    value={editDetails.contact.address.addressLine}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        contact: {
                          ...editDetails.contact,
                          address: {
                            ...editDetails.contact.address,
                            addressLine: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    label="City"
                    variant="outlined"
                    value={editDetails.contact.address.city}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        contact: {
                          ...editDetails.contact,
                          address: {
                            ...editDetails.contact.address,
                            city: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    label="State"
                    variant="outlined"
                    value={editDetails.contact.address.state}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        contact: {
                          ...editDetails.contact,
                          address: {
                            ...editDetails.contact.address,
                            state: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    label="Country"
                    variant="outlined"
                    value={editDetails.contact.address.country}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        contact: {
                          ...editDetails.contact,
                          address: {
                            ...editDetails.contact.address,
                            country: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    label="Zipcode"
                    variant="outlined"
                    value={editDetails.contact.address.zipCode}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        contact: {
                          ...editDetails.contact,
                          address: {
                            ...editDetails.contact.address,
                            zipCode: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </Grid>

                <Grid item md={9}></Grid>
                <Grid item md={3}>
                  <Button
                    disabled={!edit}
                    fullWidth
                    variant="contained"
                    size="large"
                    color="warning"
                    onClick={SaveUpdatedValue}
                  >
                    update
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
