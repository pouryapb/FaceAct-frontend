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

  const { token } = useContext(AuthContext);

  const likeHandle = () => {
    if (like) {
      fetch("http://localhost:8000/posts/dislike/" + id, {
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
      fetch("http://localhost:8000/posts/like/" + id, {
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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={authorName}
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
