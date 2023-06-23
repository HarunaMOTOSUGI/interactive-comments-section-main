import { getFileData, showComment, addCommentForm } from "./helpers.js";

await getFileData().then((data) => {
  const currentUser = data.currentUser;
  addCommentForm(currentUser);
  for (const comment of data.comments) {
    showComment(comment, currentUser);
  }
});
