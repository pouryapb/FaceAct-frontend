import React from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  //Divider,
  Container,
  Grid,
  Link,
  Box,
} from "@material-ui/core";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";

import Post from "../Components/Post";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "25px",
    boxShadow: "none",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  gridItem: {
    textAlign: "center",
  },
  link: {
    fontSize: "0.6rem",
  },
}));

const userInfo = {
  avatar: null,
  userId: "johnny",
  name: "John Smith",
  posts: [
    {
      id: 2,
      avatarImage: null,
      authorName: "John Smith",
      postDate: "September 18, 2018",
      media: null,
      mediaType: null,
      caption: `what's up mfs?!`,
      liked: true,
    },
    {
      id: 3,
      avatarImage: null,
      authorName: "John Smith",
      postDate: "September 18, 2018",
      media: null,
      mediaType: null,
      caption: `John, you're my son!`,
      liked: false,
    },
  ],
  followers: 100,
  following: 200,
};

const Profile = () => {
  const classes = useStyles();

  const posts = userInfo.posts.map((post) => {
    return (
      <Post
        key={post.id}
        avatarImage={post.avatarImage}
        authorName={post.authorName}
        postDate={post.postDate}
        media={post.media}
        mediaType={post.mediaType}
        caption={post.caption}
        liked={post.liked}
      />
    );
  });

  return (
    <Container maxWidth="sm">
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={userInfo.userId}
          subheader={userInfo.name}
        />
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid className={classes.gridItem} item xs={3}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar src={userInfo.avatar} className={classes.avatar} />
              </Box>
            </Grid>
            <Grid className={classes.gridItem} item xs={3}>
              <Link
                className={classes.link}
                component="button"
                color="textPrimary"
                variant="button"
                underline="none"
              >
                Posts
              </Link>
              <Typography variant="subtitle2">
                {userInfo.posts.length}
              </Typography>
            </Grid>
            <Grid className={classes.gridItem} item xs={3}>
              <Link
                className={classes.link}
                component="button"
                color="textPrimary"
                variant="button"
                underline="none"
              >
                Followers
              </Link>
              <Typography variant="subtitle2">{userInfo.followers}</Typography>
            </Grid>
            <Grid className={classes.gridItem} item xs={3}>
              <Link
                className={classes.link}
                component="button"
                color="textPrimary"
                variant="button"
                underline="none"
              >
                Following
              </Link>
              <Typography variant="subtitle2">{userInfo.following}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {posts}
    </Container>
  );
};

export default Profile;
