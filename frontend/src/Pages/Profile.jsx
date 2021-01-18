import React, { useContext, useState } from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Container,
  Grid,
  Link,
  Box,
  Button,
} from "@material-ui/core";

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

const Profile = ({ match }) => {
  const classes = useStyles();

  const {
    token,
    userId,
    requests,
    followings,
    setRequests,
    setFollowings,
  } = useContext(AuthContext);

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followingState, setFollowingState] = useState("Follow");

  const updateUser = () => {
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
        setRequests(resBody.requests);
        setFollowings(resBody.followings);

        if (match) {
          const id = match.params.username;

          if (!requests.includes(id) && !followings.includes(id)) {
            setFollowingState("Follow");
          } else if (!requests.includes(id) && followings.includes(id)) {
            setFollowingState("Unfollow");
          } else if (requests.includes(id) && !followings.includes(id)) {
            setFollowingState("Request sent");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const firstLoad = () => {
    if (token) {
      updateUser();
    }

    fetch(
      "http://localhost:8000/" +
        (match ? match.params.username : "uinfo/" + userId),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
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

  const req = () => {
    const id = match.params.username;
    fetch("http://localhost:8000/req/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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

  const updateInfo = (requestBody) => {
    fetch("http://localhost:8000/uinfo/" + userId, {
      method: "POST",
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
  };

  const followHandle = () => {
    const id = match.params.username;

    if (followingState === "Unfollow") {
      setFollowingState("Follow");
      const requestBody = [
        {
          propName: "followings",
          value: followings.filter((value, index, arr) => {
            return value !== id;
          }),
        },
      ];
      updateInfo(requestBody);
      updateUser();
    } else if (followingState === "Follow") {
      setFollowingState("Request sent");
      req();
      updateInfo();
    }
  };

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
        <CardHeader title={userId} subheader={name} />
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
          {match && token && (
            <Button
              style={{ marginTop: "1rem" }}
              color="primary"
              fullWidth
              variant="outlined"
              disabled={followingState === "Request sent" ? true : false}
              onClick={followHandle}
            >
              {followingState}
            </Button>
          )}
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
