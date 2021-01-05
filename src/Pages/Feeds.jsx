import React from "react";
import { Container } from "@material-ui/core";

import Post from "../Components/Post";

const posts = [
  {
    id: 1,
    avatarImage: null,
    authorName: "Random Guy",
    postDate: "September 14, 2016",
    media: "https://material-ui.com/static/images/cards/paella.jpg",
    mediaType: "img",
    caption: `This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.`,
  },
  {
    id: 2,
    avatarImage: null,
    authorName: "Jackie Chan",
    postDate: "September 18, 2018",
    media: null,
    mediaType: null,
    caption: `what's up mfs?!`,
  },
];

const Feeds = () => {
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
      />
    );
  });

  return <Container maxWidth="sm">{cards}</Container>;
};

export default Feeds;
