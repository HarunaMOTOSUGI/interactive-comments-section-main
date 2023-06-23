import { getFileData, processComment, commentForm } from "./helpers.js";

await getFileData().then((data) => {
  const currentUser = data.currentUser;
  commentForm(currentUser);
  // processReply(currentUser);

  for (const comment of data.comments) {
    processComment(comment, currentUser);
  }
});
