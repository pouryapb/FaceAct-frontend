import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Avatar,
  makeStyles,
  Divider,
  Box,
} from "@material-ui/core";

import { AuthContext } from "../Context/auth-context";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: "0.5rem",
  },
  button: {
    justifyContent: "left",
  },
}));

const Items = ({ value, link, image }) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} color="default" fullWidth href={link}>
      <Avatar src={image} className={classes.avatar} />
      {value}
    </Button>
  );
};

const RequestItems = ({ name }) => {
  const { token, requests, setRequests } = useContext(AuthContext);

  const acceptHandle = () => {
    fetch("http://localhost:8000/reqac/" + name, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!(res.status === 200 || res.status === 201)) {
          throw new Error("failed!");
        }
        return res.json();
      })
      .then(() => {
        setRequests(
          requests.filter((value) => {
            return value !== name;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const denyHandle = () => {
    fetch("http://localhost:8000/reqden/" + name, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!(res.status === 200 || res.status === 201)) {
          throw new Error("failed!");
        }
        return res.json();
      })
      .then(() => {
        setRequests(
          requests.filter((value) => {
            return value !== name;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box paddingLeft="1rem">
      {name}
      <Button onClick={acceptHandle}>accept</Button>
      <Button onClick={denyHandle}>deny</Button>
    </Box>
  );
};

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState([]);
  const [reqs, setReqs] = useState([]);

  const { requests } = useContext(AuthContext);

  if (requests.length !== reqs.length) {
    setReqs(
      requests.map((user, index) => {
        return <RequestItems key={index} name={user} />;
      })
    );
  }

  const handleSearch = (event) => {
    const input = event.target.value;
    setSearchValue(input);

    if (input !== "") {
      fetch("http://localhost:8000/search/" + input, {
        method: "GET",
      })
        .then((res) => {
          if (!(res.status === 200 || res.status === 201)) {
            throw new Error("failed!");
          }
          return res.json();
        })
        .then((resBody) => {
          setList(
            resBody.map((user) => {
              return (
                <Items
                  key={user._id}
                  value={user.firstName + " " + user.lastName}
                  link={"http://localhost:3000/" + user.username}
                  image={user.avatar}
                />
              );
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setList([]);
    }
  };

  return (
    <Container maxWidth="sm">
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="search"
        label="Search"
        name="search"
        autoComplete="search"
        value={searchValue}
        onChange={handleSearch}
      />
      {reqs}
      <Divider />
      {list}
    </Container>
  );
};

export default Search;
