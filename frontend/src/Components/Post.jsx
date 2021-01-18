import React from "react";
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
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "25px",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Post = ({
  avatarImage,
  authorName,
  postDate,
  media,
  mediaType,
  caption,
  liked,
}) => {
  const classes = useStyles();

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
        <IconButton aria-label="Like">
          <FavoriteIcon style={{ color: liked && red[600] }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
