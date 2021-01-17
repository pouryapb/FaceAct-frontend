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

  const list = [
    <Items value={"iterm 1"} link={"#"} />,
    <Items value={"iterm 2"} link={"#"} />,
    <Items value={"iterm 3"} link={"#"} />,
  ];

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
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
      {list}
    </Container>
  );
};

export default Search;
