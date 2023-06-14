import { getFileData,processComment,processReply,addComment,processAddReply } from "./helpers.js";

getFileData("data.json").then(data => {


  const currentUser = data.currentUser
  addComment(currentUser);


  for (const comment of data.comments) {
    processComment(comment);
    processAddReply(currentUser);
  }






  // const currentUser = data.currentUser
  // addNewReply(currentUser)

});