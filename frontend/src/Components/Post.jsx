import React, { useContext, useState } from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  Favorite as FavoriteIcon,
  //Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

import { AuthContext } from "../Context/auth-context";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "25px",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Post = ({
  id,
  username,
  avatarImage,
  authorName,
  postDate,
  media,
  mediaType,
  caption,
  liked,
}) => {
  const classes = useStyles();

  const [like, setLike] = useState(liked);

  const [deleted, setDeleted] = useState(null);

  const { token, userId, ip } = useContext(AuthContext);

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const menuOpen = Boolean(menuAnchor);

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleDelete = (event) => {
    fetch(ip + "/posts/delete/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const likeHandle = () => {
    if (like) {
      fetch(ip + "/posts/dislike/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(() => {
          setLike(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(ip + "/posts/like/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(() => {
          setLike(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt={authorName} src={avatarImage} className={classes.avatar}>
            {authorName[0]}
          </Avatar>
        }
        action={
          username === userId && (
            <React.Fragment>
              <IconButton
                aria-label="settings"
                aria-controls="more-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="more-menu"
                anchorEl={menuAnchor}
                keepMounted
                open={menuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    // maxHeight: ITEM_HEIGHT * 2.5,
                    width: "20ch",
                  },
                }}
              >
                <MenuItem key="delete" selected={false} onClick={handleDelete}>
                  delete
                </MenuItem>
              </Menu>
            </React.Fragment>
          )
        }
        title={deleted ? "deleted" : authorName}
        subheader={postDate}
      />
      <Divider />
      {mediaType && <CardMedia component={mediaType} controls src={media} />}
      <CardContent>
        <Typography variant="body2" component="p">
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={likeHandle} aria-label="Like">
          <FavoriteIcon style={{ color: like && red[600] }} />
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
};

export default Post;
