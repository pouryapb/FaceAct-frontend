import React, { useState } from "react";
import {
  Card,
  makeStyles,
  TextField,
  CardActions,
  CardHeader,
  IconButton,
  Button,
  Grid,
  CardMedia,
} from "@material-ui/core";
import { AttachFile, Send } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "25px",
  },
  textfield: {
    width: "90%",
    marginLeft: "5%",
  },
  input: {
    display: "none",
  },
  media: {
    marginBottom: "10px",
  },
}));

const Compose = () => {
  const classes = useStyles();
  const [caption, setCaption] = useState("");
  const [activeSend, setActiveSend] = useState(false);
  const [file, setFile] = useState(null);
  const [fileSrc, setFileSrc] = useState(null);

  const reader = new FileReader();

  const handleCaption = (event) => {
    if (event.target.value !== "" || file) {
      setActiveSend(true);
    } else {
      setActiveSend(false);
    }
    setCaption(event.target.value);
  };

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setActiveSend(true);

      reader.onload = (event) => {
        setFileSrc(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader />
      {file && (
        <CardMedia
          className={classes.media}
          component={file.type.split("/")[0] === "image" ? "img" : "video"}
          controls
          src={fileSrc}
        />
      )}
      <form noValidate autoComplete="off">
        <TextField
          className={classes.textfield}
          id="post-text"
          placeholder="What's happening?"
          multiline
          onChange={handleCaption}
          value={caption}
        />
        <CardActions justify="flex-end" disableSpacing>
          <Grid container justify="flex-end">
            <Grid item>
              <input
                className={classes.input}
                accept="image/*,video/*"
                id="upload-btn"
                type="file"
                onChange={handleFile}
              />
              <label htmlFor="upload-btn">
                <IconButton component="span">
                  <AttachFile />
                </IconButton>
              </label>
              <Button
                aria-label="send-btn"
                disabled={!activeSend}
                variant="outlined"
                endIcon={<Send />}
              >
                Post
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
};

export default Compose;
