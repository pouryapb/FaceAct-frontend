import React, { useContext } from "react";
import { Container } from "@material-ui/core";

import Post from "../Components/Post";
import Compose from "../Components/Compose";
import { AuthContext } from "../Context/auth-context";

// const posts = [
//   {
//     id: 1,
//     avatarImage: null,
//     authorName: "Random Guy",
//     postDate: "September 14, 2016",
//     media: "https://material-ui.com/static/images/cards/paella.jpg",
//     mediaType: "img",
//     caption: `This impressive paella is a perfect party dish and a fun meal to cook
//           together with your guests. Add 1 cup of frozen peas along with the
//           mussels, if you like.`,
//     liked: true,
//   },
//   {
//     id: 2,
//     avatarImage: null,
//     authorName: "Jackie Chan",
//     postDate: "September 18, 2018",
//     media: null,
//     mediaType: null,
//     caption: `what's up mfs?!`,
//     liked: false,
//   },
//   {
//     id: 3,
//     avatarImage: null,
//     authorName: "Dutch Van Der Linde",
//     postDate: "September 18, 2018",
//     media: null,
//     mediaType: null,
//     caption: `John, you're my son!`,
//     liked: false,
//   },
// ];

const Feeds = () => {
  const { token } = useContext(AuthContext);

  let posts = [];

  fetch("http://localhost:8000/posts/feed", {
    method: "GET",
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
    .then((resBody) => {
      posts = resBody;
    })
    .catch((err) => {
      console.log(err);
    });

  const cards = posts.map((post) => {
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
      <Compose />
      {cards}
    </Container>
  );
};

export default Feeds;
