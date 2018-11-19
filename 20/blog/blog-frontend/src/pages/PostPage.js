import React from "react";
import PageTemplate from "components/common/PageTemplate/PageTemplate";
import Post from "containers/post/Post";

const PostPage = ({ match }) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <Post id={id} />
    </PageTemplate>
  );
};

export default PostPage;
