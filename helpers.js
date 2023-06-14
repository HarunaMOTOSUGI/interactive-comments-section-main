export async function getFileData(path) {
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function */
  const response = await fetch(path);
  return await response.json();
}

function createComment(score, username, src, date, text, isCurrentUser) {
  const template = document.getElementById("comment-template");

  // https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
  const clone = template.content.cloneNode(true);
  // cloneの中身を書き換える
  clone.querySelector("p.text").textContent = text;
  clone.querySelector(".date").textContent = date;
  clone.querySelector(".scorenun").textContent = score;
  clone.querySelector("img.avatars").src = src;
  clone.querySelector(".name").textContent = username;

  if (isCurrentUser) {
    clone.querySelector(".you").textContent = "you";
    const icon_reply = clone.querySelector(".icon-reply");

    // const editDelete = document.getElementById("edit-delete-template").content.cloneNode(true);
    // reply           .parentElement.appendChild(editDelete);

    const editDelete = createEditDelete();
    icon_reply.parentElement.appendChild(editDelete);
    icon_reply.remove();
    // createEditDelete();

  }


  return clone;
}

export function processComment(comment) {
  //   /* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template */
  //   const template = document.getElementById("comment-template");

  //   // https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
  //   const clone = template.content.cloneNode(true);
  //   // cloneの中身を書き換える
  //   clone.querySelector("p.text").textContent = comment.content;
  //   clone.querySelector(".date").textContent = comment.createdAt;
  //   clone.querySelector(".scorenun").textContent = comment.score;
  //   clone.querySelector("img.avatars").src = comment.user.image.webp;
  //   clone.querySelector(".name").textContent = comment.user.username;

  //   // reply button
  //   clone.querySelector(".icon-reply").onclick = () => addNewReply();

  //   if (comment.user.username === "juliusomo") {
  //     clone.querySelector(".you").textContent = "you";
  //     const icon_reply = clone.querySelector(".icon-reply");

  //     // const editDelete = document.getElementById("edit-delete-template").content.cloneNode(true);
  //     // reply.parentElement.appendChild(editDelete);

  //     const editDelete = createEditDelete();
  //     icon_reply.parentElement.appendChild(editDelete);
  //     icon_reply.remove();
  //   }

  const clone = createComment(
    comment.score,
    comment.user.username,
    comment.user.image.webp,
    comment.createdAt,
    comment.content,
    comment.user.username === "juliusomo"
  );

  // cloneを追加する
  document.getElementById("comment").appendChild(clone);

  for (const reply of comment.replies) {
    processReply(reply);


  }




}

//  export function addNewReply(currentUser) {
//     const addNewReply = document.getElementById("add-template");
//     const clone = addNewReply.content.cloneNode(true);

//     clone.querySelector("img .avatars2").src = currentUser;

// }

// const replyTemplate = document.getElementById("reply-template")

function createEditDelete() {
  const editDelete = document
    .getElementById("edit-delete-template")
    .content.cloneNode(true);
  editDelete.querySelector(".icon-delete").onclick = (e) => {
    const modal = openModal();
    modal.querySelector(".delete").onclick = () => {
      e.target.closest("li").remove();
      closeModal();
    };
    modal.querySelector(".modalClose").onclick = closeModal;
  };

  editDelete.querySelector(".icon-edit").onclick = (e) => {
    // console.log("edit");
    // e.target.closest("li").remove();
    // console.log(createComment(text));
    editReply()
  };

  return editDelete;
}

function editReply() {
  // コメントを消す
  console.log("edit");

}


export function processReply(comment) {

  const clone = createComment(
    comment.score,
    comment.user.username,
    comment.user.image.webp,
    comment.createdAt,
    comment.content,
    comment.user.username === "juliusomo"
  );

//   // cloneの中身を書き換える
//   clone.querySelector("p.text").textContent = comment.replies[0].content;
//   clone.querySelector(".date").textContent = comment.replies.createdAt;
//   clone.querySelector(".scorenun").textContent = comment.replies.score;
//   clone.querySelector("img.avatars").src = comment.user.replies.image.webp;
//   clone.querySelector(".name").textContent = comment.replies.user.username;

//   // reply button
//   clone.querySelector(".icon-reply").onclick = () => addNewReply();

//   if (comment.user.username === "juliusomo") {
//     clone.querySelector(".you").textContent = "you";
//     const reply = clone.querySelector(".icon-reply");

//     // const editDelete = document.getElementById("edit-delete-template").content.cloneNode(true);
//     // reply.parentElement.appendChild(editDelete);

//     const editDelete = createEditDelete();
//     reply.parentElement.appendChild(editDelete);
//     reply.remove();
//   }

//   for (const reply of comment.replies) {
//     createReply(reply);
//   }

  // cloneを追加する
     document.getElementById("comment").appendChild(clone);

  // /*  {
  //       "id": 3,
  //       "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
  //       "createdAt": "1 week ago",
  //       "score": 4,
  //       "replyingTo": "maxblagun",
  //       "user": {
  //         "image": {
  //           "png": "./images/avatars/image-ramsesmiron.png",
  //           "webp": "./images/avatars/image-ramsesmiron.webp"
  //         },
  //         "username": "ramsesmiron"
  //       },
  //       "replies": []
  //     }, */
}


function openModal() {
  const modal = document.getElementById("easyModal");

  addEventListener("click", outsideClose);
  modal.style.display = "block";
  return modal;
}

function closeModal() {
  document.getElementById("easyModal").style.display = "none";
}

function outsideClose(e) {
  const modal = document.getElementById("easyModal");
  if (e.target == modal) {
    modal.style.display = "none";
  }
}



// function processAddReply() {
//   const comment = document
//     .getElementById("comment-template")
//     .content.cloneNode(true);
//   comment.querySelector(".icon-reply").onclick = (e) => {
  
//   }
// }

// function addReply() {
//   const comment = document
//     .getElementById("comment-template")
//     .content.cloneNode(true);

//   return comment;
// }


// function addReply(src,textarea,button) {
//   const template = document.getElementById("add-template")

//   const clone = template.content.cloneNode(true);

//   clone.querySelector("img.avatars2").src = src;
//   clone.querySelector("textarea") = textarea;
//   clone.querySelector("button") = button;

//   return clone;

// }

// editDelete.querySelector(".icon-delete").onclick = (e) => {
//   const modal = openModal();
//   modal.querySelector(".delete").onclick = () => {
//     e.target.closest("li").remove();
//     closeModal();
//   };
//   modal.querySelector(".modalClose").onclick = closeModal;
// };

function createAddComment(src) {
  const template = document.getElementById("addComment");
  const clone = template.content.cloneNode(true);

  clone.querySelector("img.avatars2").src = src;
  // clone.querySelector("textarea") = textarea;
  // clone.querySelector("button") = button;

  const send = clone.querySelector("button")

  return clone;
}

export function addComment(currentUser){
  const clone = createAddComment(
    currentUser.image.webp
  );
  document.getElementById("add-comment3").appendChild(clone)

  // const template = document.getElementById("addComment");
  // template.querySelector(".button").onclick = () =>{
  //   console.log("haku");
  // }


}

// export function createNewReply() {
//   const reply = document
//     .getElementById("comment-template")
//     .content.cloneNode(true);

//   reply.querySelector(".icon-reply").onclick = () => {
//     console.log("haku")
//   };

//   return reply;
// }

function createAddReply(src) {
  const template = document.getElementById("add-template");
  const clone = template.content.cloneNode(true);

  clone.querySelector("img.avatars2").src = src;
  // clone.querySelector("textarea") = textarea;
  // clone.querySelector("button") = button;



  return clone;
}

export function processAddReply(currentUser) {
  const clone = createAddReply(
    currentUser.image.webp
  );
  
  const template = document.getElementById("comment")
  template.querySelector(".icon-reply").onclick = () => {
    document.getElementById("comment").appendChild(clone);


  };

  // document.getElementById("comment").appendChild(clone)
}



// function createNewReply(score, username, src, date, text) {
//   const template = document.getElementById("comment-template");

//   // https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
//   const clone = template.content.cloneNode(true);
//   // cloneの中身を書き換える
//   clone.querySelector("p.text").textContent = text;
//   clone.querySelector(".date").textContent = date;
//   clone.querySelector(".scorenun").textContent = score;
//   clone.querySelector("img.avatars").src = src;
//   clone.querySelector(".name").textContent = username;
//   clone.querySelector(".you").textContent = "you";

//   const editDelete = createEditDelete();
//   template.appendChild(editDelete);

//   return clone;
  
// }

// export function processNewReply(currentUser) {
//   // const clone = createNewReply(
//   //   "0",
//   //   currentUser.username,
//   //   currentUser.image.webp,
//   //   new Date(),
//   //   "haku",
//   // );
// }
