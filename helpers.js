export async function getFileData(path) {
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function */
  const response = await fetch(path);
  return await response.json();
}

function createCommentContent(score, username, src, date, text, isCurrentUser) {
  const template = document.getElementById("comment-template");

  // https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
  const clone = template.content.cloneNode(true).firstElementChild;
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

export function processComment(comment, currentUser) {
  const ul = document.getElementById("comments");

  const li = document.createElement("li");
  li.classList.add("comment");
  const ul_replies = document.createElement("ul")

    //  const li = document.getElementById("comment")


  const contentClone = createCommentContent(
    comment.score,
    comment.user.username,
    comment.user.image.webp,
    comment.createdAt,
    comment.content,
    comment.user.username === "juliusomo"
  );


  // cloneを追加する
  li.appendChild(contentClone);

  ul.appendChild(li)

  addScoreFunctionality(contentClone, comment.score);

  addReplyFunctionality(contentClone, currentUser, li);

  // const ul_replies = document.createElement("ul");
  // ul_replies.classList.add("replies");

    // const ul_replies =document.getElementById("replies")
    // li.appendChild(ul_replies)


  for (const reply of comment.replies) {
    processReply(reply,ul_replies);

    // console.log("reply",reply);



  ul_replies.classList.add("replies")
  li.appendChild(ul_replies)

  

  }



  // li.appendChild(ul_replies);



  // ul_replies.appendChild(li_reply)
  // ul.appendChild(li);
}



function addReplyFunctionality(contentClone, currentUser, li) {
  const replyButton = contentClone.querySelector(".icon-reply");
  if (!replyButton) return;
  replyButton.onclick = () => {
    const existingReply = li.querySelector(".add-comment");
    if (existingReply) {
      existingReply.remove();
      return;
    }

    const replyClone = createAddReply(currentUser.image.webp);
    contentClone.insertAdjacentElement("afterend", replyClone);

    addNewReply(li.querySelector("ul.replies"), replyClone, currentUser);
  };
}

function addScoreFunctionality(clone, score) {
  const plusButton = clone.querySelector(".plusBtn");
  const minusButton = clone.querySelector(".minusBtn");
  const scoreTag = clone.querySelector(".scorenun");

  plusButton.onclick = () => (scoreTag.textContent = score + 1);
  minusButton.onclick = () => (scoreTag.textContent = score - 1);
}

function addCommentFunctionality(clone, currentUser) {
  const sendButton = clone.querySelector(".button");
  console.log(sendButton);

  sendButton.onclick = () => {
    console.log("clicked");
    // console.log(clone.querySelector("textarea"));

    const commentData = createCommentContent(
      0,
      currentUser.username,
      currentUser.image.webp,
      date().textContent,
      clone.querySelector("textarea"),
      true
    );

    addScoreFunctionality(commentData, 0); //0手打ち

    const ul = document.getElementById("comments");

    const li = document.createElement("li");
    li.classList.add("comment");
    li.appendChild(commentData);
    ul.appendChild(li);
    console.log(li);
  };
}

function addNewReply(ul_replies, replyClone, currentUser) {
  const replyButton = replyClone.querySelector("button");
  replyButton.onclick = () => {
    const div_content = createCommentContent(
      0,
      currentUser.username,
      currentUser.image.webp,
      date().textContent,
      replyClone.querySelector("textarea").value,
      true
    );

    addScoreFunctionality(div_content, 0); //0手打ち？

    const li = document.createElement("li");
    li.classList.add("reply");
    li.appendChild(div_content);
    ul_replies.appendChild(li);
    replyClone.remove();
  };
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
    .content.cloneNode(true).firstElementChild;
  editDelete.querySelector(".icon-delete").onclick = (e) => {
    const modal = openModal();
    modal.querySelector(".delete").onclick = () => {
      e.target.closest("li").remove();
      closeModal();
    };
    modal.querySelector(".modalClose").onclick = closeModal;
  };

  editDelete.querySelector(".icon-edit").onclick = (e) => {
    const existingTextarea = e.target.closest("li").querySelector("textarea");
    if (existingTextarea) {
      e.disabled = true;
      return;
    }

    const editTemplate = document
      .getElementById("edit-reply-template")
      .content.cloneNode(true).firstElementChild;

    // 近くのt.textを取得する
    const p_text = e.target.closest("li").querySelector("p.text");

    // textコンテンツを取得する
    const text = p_text.textContent;

    // textareaを作る
    const ta = document.createElement("textarea");
    ta.classList.add("text");
    ta.setAttribute("id","text")

    // textareaにtextを入れる
    ta.value = text;

    // p.textをtextareaに置き換える
    p_text.parentElement.appendChild(ta);
    p_text.remove();

    //UPDATEボタン作成
    const updateButton = editTemplate.querySelector(".button");
    console.log(updateButton);

    const update_div = document.createElement("div");
    update_div.classList.add("update-button-box");
    const update_button = document.createElement("button");
    update_button.classList.add("button");
    update_button.setAttribute("id", "udbtn");
    update_button.textContent = "UPDATE";

    update_div.appendChild(update_button);

    ta.insertAdjacentElement("afterend", update_div);
    // updateButton.onclick = () => {
    //   console.log("haku");
    // }

    // updateFunctionality(updateButton)
    const tmp = document.getElementById("udbtn");
    tmp.onclick = (e) => {

      // newText.remove();
      update_button.remove();
    };
  };

  return editDelete;
}

// function updateFunctionality(updateButton) {
//   // const editTemplate = document
//   // .getElementById("edit-reply-template")
//   // .content.cloneNode(true).firstElementChild;

//   // const updateButton = editTemplate.querySelector(".update-button");
//   updateButton.onclick = () =>{
//     console.log("haku");
//   }

// }


export function processReply(comment,ul_replies) {
  const clone = createCommentContent(
    comment.score,
    comment.user.username,
    comment.user.image.webp,
    comment.createdAt,
    comment.content,
    comment.user.username === "juliusomo"
  );
  const li_reply = document.createElement("li")
  li_reply.classList.add("reply")
  // console.log(li_reply);
  // li_reply.classList.add("reply");
  li_reply.appendChild(clone);
  ul_replies.appendChild(li_reply)


  

  // ul_replies.appendChild(li_reply)
  // ul.appendChild(li);
  // // const li_reply = document.getElementById("reply")
  // // // console.log(li_reply);
  // // li_reply.classList.add("reply");
  // // li_reply.appendChild(clone);

  // ul_replies.appendChild(li_reply)
  // ul.appendChild(li);



  // cloneを追加する
  // const li_reply = document.querySelector("li")
  // li_reply.classList.add("reply")
  // li_reply.appendChild(clone);
  // replies.appendChild(reply)

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


function createAddComment(src) {
  const template = document.getElementById("addComment");
  const clone = template.content.cloneNode(true);

  clone.querySelector("img.avatars2").src = src;
  // clone.querySelector("textarea") = textarea;
  // clone.querySelector("button") = button;

  const send = clone.querySelector("button");
  // addCommentFunctionality(clone.firstElementChild);

  return clone;
}

export function addComment(currentUser) {
  const clone = createAddComment(currentUser.image.webp);
  addCommentFunctionality(clone, currentUser);
  document
    .getElementById("comments")
    .insertAdjacentElement("afterend", clone.firstElementChild);
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
  const clone = template.content.cloneNode(true).firstElementChild;

  clone.querySelector("img.avatars2").src = src;
  // clone.querySelector("textarea") = textarea;
  // clone.querySelector("button") = button;

  return clone;
}

export function processAddReply(currentUser) {
  const clone = createAddReply(currentUser.image.webp);

  const template = document.getElementById("comment");
  template.querySelector(".icon-reply").onclick = () => {
    template.appendChild(clone);
  };
  // document.getElementById("comment").appendChild(clone)
  addScoreFunctionality(clone, score)
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

function date() {
  const date = document.querySelector(".date");
  // date.classList.add("date")

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }

    if (seconds < 10) return "just now";

    return Math.floor(seconds) + " seconds ago";
  };
  date.textContent = timeAgo(new Date());

  return date;
}
