export async function getFileData() {
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function */
  const response = await fetch("data.json");
  return response.json();
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
  const ul_replies = document.createElement("ul");
  ul_replies.classList.add("replies");
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

  ul.appendChild(li);

  addScoreFunctionality(contentClone, comment.score);

  addReplyFunctionality(contentClone, currentUser, li, ul_replies);

  // const ul_replies = document.createElement("ul");
  // ul_replies.classList.add("replies");

  // const ul_replies =document.getElementById("replies")
  // li.appendChild(ul_replies)

  for (const reply of comment.replies) {
    processReply(reply, ul_replies, currentUser, li);

    // console.log("reply",reply);
    // li.appendChild(ul_replies)
  }

  // li.appendChild(ul_replies);

  // ul_replies.appendChild(li_reply)
  // ul.appendChild(li);
}

function addReplyFunctionality(contentClone, currentUser, li, li_reply) {
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

    addNewReply(li_reply, replyClone, currentUser);
  };
}

function addScoreFunctionality(clone, score) {
  const plusButton = clone.querySelector(".plusBtn");
  const minusButton = clone.querySelector(".minusBtn");
  const scoreTag = clone.querySelector(".scorenun");

  plusButton.onclick = () => (scoreTag.textContent = score + 1);
  minusButton.onclick = () => (scoreTag.textContent = score - 1);
}

function addCommentFunctionality(clone, currentUser, templateClone) {
  const sendButton = clone.querySelector(".button");
  // console.log(sendButton);

  sendButton.onclick = (e) => {
    // console.log("clicked");
    if (e.target.previousElementSibling.value === "") {
      e.disabled = true;

      return;
    }

    console.log(e.target.previousElementSibling.value);

    const commentData = createCommentContent(
      0,
      currentUser.username,
      currentUser.image.webp,
      date(/**/).textContent,
      // templateClone.querySelector("textarea").value,
      e.target.previousElementSibling.value,
      true
    );

    addScoreFunctionality(commentData, 0); //0手打ち

    const ul = document.getElementById("comments");

    const li = document.createElement("li");
    li.classList.add("comment");
    li.appendChild(commentData);
    ul.appendChild(li);
    // console.log(li);
    e.target.previousElementSibling.value = "";
  };
}

function addNewReply(li_reply, replyClone, currentUser) {
  const replyButton = replyClone.querySelector("button");
  replyButton.onclick = (e) => {
    if (e.target.previousElementSibling.value === "") {
      e.disabled = true;

      return;
    }

    const div_content = createCommentContent(
      0,
      currentUser.username,
      currentUser.image.webp,
      date().textContent,
      replyClone.querySelector("textarea").value,
      true
    );

    // console.log(replyClone.querySelector("textarea").value);
    addScoreFunctionality(div_content, 0); //0手打ち？

    const li = document.createElement("li");
    li.classList.add("reply");
    li.appendChild(div_content);

    const ul_rtr = document.createElement("ul");
    ul_rtr.classList.add("replies");
    ul_rtr.appendChild(li);
    // console.log(e.target.closest(".li"));
    e.target.closest("li").appendChild(ul_rtr);
    // console.log(e.target.closest(".reply"));
    replyClone.remove();
  };
}

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


    /* 
    if (textArea.style.display === "none") {
      // textareaが見えない状態なので、
      １．見えるようにする＋valueをpタグのtextContent
      ２．pタグを見えなくする
      ３．UPDATEボタンも見えるようにする
    }else {
      // textareaが見えている状態なので、
      １．見えなくする
      ２．pタグを見えるようにする＋p.tagのtextContentをtextareaタグのvalueにする
      ３．UPDATEボタンも見えないようにする

    }
    
    
    UPDATEボタンがクリックされたら
        １．p.textContent=textArea.value
        ２． textareaを見えないようにする
        ３．pタグを見えるようにする
        ４．UPDATEボタンも見えないようにする
    
    */
    const existingTextarea = e.target.closest("li").querySelector("textarea");
    // const p_text = e.target.closest("li").querySelector("p.text");
    // p_text.classList.add("hide")
    // 近くのt.textを取得する
    const p_text = e.target.closest("li").querySelector("p.text");

    if (existingTextarea) {
      p_text.textContent = existingTextarea.value;
      p_text.style.display = "block"

      existingTextarea.remove();
      // existingTextarea.classList.add("hide")
      // p_text.classList.remove("hide")
    }

    const existingUdbtn = e.target.closest("li").querySelector(".button");
    if (existingUdbtn) {
      existingUdbtn.remove();
    }
    // if (existingTextarea) {
    //   // e.disabled = true;
    //   // return;

    const editTemplate = document
      .getElementById("edit-reply-template")
      .content.cloneNode(true).firstElementChild;


    // textコンテンツを取得する
    const text = p_text.textContent;

    // textareaを作る
    const ta = document.createElement("textarea");
    ta.classList.add("text");
    ta.setAttribute("id", "text");

    // textareaにtextを入れる
    ta.value = text;

    // p.textをtextareaに置き換える
    p_text.parentElement.appendChild(ta);
    // p_text.remove()
    ta.style.display = "none";

    // p_text.style.display="none"

    // const existingTa = e.target.closest("li").querySelector("textarea");
    // existingTa.classList.add("hide")

    // if (ta.style.display==="none") {
    //   ta.style.display=""

    // }
    // else {
    //   ta.style.display="none"
    // }

    //UPDATEボタン作成
    const updateButton = editTemplate.querySelector(".button");
    console.log(updateButton);

    const update_div = document.createElement("div");
    update_div.classList.add("update-button-box");
    const update_button = document.createElement("button");
    console.log("update_button", update_button);
    update_button.classList.add("button");
    update_button.setAttribute("id", "udbtn");
    update_button.textContent = "UPDATE";
    update_div.appendChild(update_button);

    ta.insertAdjacentElement("afterend", update_div);

    const newText = ta.value;
    const newTextBox = document.createElement("p");

    // updateFunctionality(updateButton)
    const tmp = document.getElementById("udbtn");
    tmp.onclick = (e) => {
      const newText = ta.value;
      const newTextBox = document.createElement("p");
      newTextBox.classList.add("text");
      // e.target.parentElement.appendChild(newTextBox)
      console.log("newText", newText);
      newTextBox.innerHTML = newText;
      ta.replaceWith(newTextBox);

      e.target.closest("li").querySelector(".date").textContent =
        date().textContent;

      update_button.remove();
      // newText.classList.remove("text");
    };

    if (p_text.style.display === "") {
      console.log("marron");
      // p_text.classList.add("hide");
      // ta.classList.remove("hide")
      p_text.style.display = "none";
      ta.style.display = "";
      update_button.style.display = "";
      // existingTa.classList.remove("hide")
    } else if (newTextBox) {
      const newTextarea = document.createElement("textarea");
      newTextarea.classList.add("text");
      newTextarea.innerHTML = newText;
      console.log("newTextarea", newTextarea);
      // console.log(e.target.closest("li"));
      e.target.closest("li").querySelector("p").remove();
      // e.target.closest("li").appendChild(newTextarea);
    } else {
      console.log("haku");
      // p_text.classList.remove("hide")
      // ta.classList.add("hide")
      p_text.style.display = "";
      ta.style.display = "none";
      update_button.remove();
    }
  };

  return editDelete;
}

export function processReply(comment, ul_replies, currentUser, li) {
  const clone = createCommentContent(
    comment.score,
    comment.user.username,
    comment.user.image.webp,
    comment.createdAt,
    comment.content,
    comment.user.username === "juliusomo"
  );

  addScoreFunctionality(clone, comment.score);

  const li_reply = document.createElement("li");
  li_reply.classList.add("reply");
  li_reply.appendChild(clone);
  ul_replies.appendChild(li_reply);
  li.appendChild(ul_replies);

  addReplyFunctionality(clone, currentUser, ul_replies);
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
  const templateClone = template.content.cloneNode(true);

  templateClone.querySelector("img.avatars2").src = src;
  // templateClone.querySelector("textarea") = textarea;
  // clone.querySelector("button") = button;

  // const send = templateClone.querySelector("button");
  // addCommentFunctionality(clone.firstElementChild);

  return templateClone;
}

export function addComment(currentUser) {
  const template = document.getElementById("addComment");
  // template.classList.add("add-comment")
  const templateClone = template.content.cloneNode(true).firstElementChild;
  console.log(templateClone);

  const clone = createAddComment(currentUser.image.webp);
  addCommentFunctionality(clone, currentUser, templateClone);
  document
    .getElementById("comments")
    .insertAdjacentElement("afterend", clone.firstElementChild);
}

function createAddReply(src) {
  const template = document.getElementById("add-template");
  // template.classList.add("add-comment")
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
  addScoreFunctionality(clone, score);
}

function date() {
  const template = document.getElementById("reply-template");
  const clone = template.content.cloneNode(true).firstElementChild;
  const dateBox = clone.querySelector(".date");
  console.log(dateBox);
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
  dateBox.textContent = timeAgo(new Date());

  return dateBox;
}
