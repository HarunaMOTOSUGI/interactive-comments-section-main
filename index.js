import { getFileData,processComment,processReply,addComment,processAddReply } from "./helpers.js";

await getFileData().then(data => {


  const currentUser = data.currentUser
  addComment(currentUser);
  // processReply(currentUser);


  for (const comment of data.comments) {
    processComment(comment,currentUser);

  }

});

















const username = "motosugi";
function hello(name) {
  console.log("hello "+ name + username);
}
console.log(username); // motosugi ERROR
// hello('beki') // hello bekimotosugi