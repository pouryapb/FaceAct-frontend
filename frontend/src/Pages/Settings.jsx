import React, { useContext, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Box,
  Avatar,
  makeStyles,
  CardHeader,
  TextField,
  Button,
} from "@material-ui/core";

import { AuthContext } from "../Context/auth-context";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: "0.5rem",
  },
  gridItem: {
    textAlign: "center",
  },
  input: {
    display: "none",
  },
}));

const Settings = () => {
  const classes = useStyles();

  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const { token, userId, logout } = useContext(AuthContext);

  const firstLoad = () => {
    fetch("http://localhost:8000/uinfo/" + userId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!(res.status === 200 || res.status === 201 || res.status === 304)) {
          throw new Error("failed!");
        }
        return res.json();
      })
      .then((resBody) => {
        setAvatar("http://localhost:8000/" + resBody.avatar);
        setFirstName(resBody.firstName);
        setLastName(resBody.lastName);
        setEmail(resBody.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (email === "") {
    firstLoad();
  }

  const reader = new FileReader();

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const updateInfo = () => {
    const requestBody = [
      { propName: "firstName", value: firstName },
      { propName: "lastName", value: lastName },
      { propName: "email", value: email },
    ];

    fetch("http://localhost:8000/uinfo/" + userId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (!(res.status === 200 || res.status === 201)) {
          throw new Error("failed!");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const formData = new FormData();
    formData.append("avatarImg", file);

    fetch("http://localhost:8000/avatarup/" + userId, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    })
      .then((res) => {
        if (!(res.status === 200 || res.status === 201)) {
          throw new Error("failed!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Card elevation={3}>
        <CardHeader />
        <form id="av-up" noValidate autoComplete="off">
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar src={avatar} className={classes.avatar} />
              <input
                className={classes.input}
                accept="image/*"
                id="upload-btn"
                type="file"
                onChange={handleFile}
              />
              <label htmlFor="upload-btn">
                <Button variant="outlined" component="span">
                  Choose profile image
                </Button>
              </label>
            </Box>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="Firstname"
              name="firstname"
              autoComplete="firstname"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Lastname"
              name="lastname"
              autoComplete="lastname"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </CardContent>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginBottom="1rem"
          >
            <Button color="primary" variant="outlined" onClick={updateInfo}>
              save profile
            </Button>
            <Button
              style={{ marginLeft: "0.5rem" }}
              color="default"
              variant="outlined"
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default Settings;
