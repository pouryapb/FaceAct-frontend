import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Avatar,
  makeStyles,
} from "@material-ui/core";

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

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState([]);

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
      {list}
    </Container>
  );
};

export default Search;
