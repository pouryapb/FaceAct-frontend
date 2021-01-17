import React, { useContext, useState } from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Divider,
  Container,
  Grid,
  Link,
  Box,
} from "@material-ui/core";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";

import Post from "../Components/Post";
import { AuthContext } from "../Context/auth-context";

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

// const userInfo = {
//   avatar: null,
//   userId: "johnny",
//   name: "John Smith",
//   posts: [
//     {
//       id: 2,
//       avatarImage: null,
//       authorName: "John Smith",
//       postDate: "September 18, 2018",
//       media: null,
//       mediaType: null,
//       caption: `what's up mfs?!`,
//       liked: true,
//     },
//     {
//       id: 3,
//       avatarImage: null,
//       authorName: "John Smith",
//       postDate: "September 18, 2018",
//       media: null,
//       mediaType: null,
//       caption: `John, you're my son!`,
//       liked: false,
//     },
//   ],
//   followers: 100,
//   following: 200,
// };

const Profile = () => {
  const classes = useStyles();

  const { token, userId } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

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
        setAvatar(
          resBody.avatar ? "http://localhost:8000/" + resBody.avatar : null
        );
        setName(resBody.firstName + " " + resBody.lastName);
        setPosts(resBody.posts);
        setFollowers(resBody.followers);
        setFollowing(resBody.followings);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (name === "") {
    firstLoad();
  }

  const listOfPosts = posts.map((post) => {
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
          title={userId}
          subheader={name}
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
                <Avatar src={avatar} className={classes.avatar} />
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
              <Typography variant="subtitle2">{posts.length}</Typography>
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
              <Typography variant="subtitle2">{followers.length}</Typography>
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
              <Typography variant="subtitle2">{following.length}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Divider />
      {listOfPosts.length === 0 ? (
        <Box marginTop="2rem">
          <Typography align="center" color="textSecondary" variant="h4">
            No posts yet!
          </Typography>
        </Box>
      ) : (
        listOfPosts
      )}
    </Container>
  );
};

export default Profile;
