export async function getFileData() {
  const response = await fetch("data.json");
  return response.json();
}

export function processComment(comment, currentUser) {
  const ul_comments = document.getElementById("comments");
  const li_comment = document.createElement("li");
  li_comment.classList.add("comment");
  const ul_replies = document.createElement("ul");
  ul_replies.classList.add("replies");

  const contentClone = createCommentContent(
    comment.score,
    comment.user.username,
    comment.user.image.webp,
    comment.createdAt,
    comment.content,
    comment.user.username === "juliusomo"
  );

  li_comment.appendChild(contentClone);
  ul_comments.appendChild(li_comment);

  addScoreFunctionality(contentClone, comment.score);

  replyForm(contentClone, currentUser, li_comment);

  for (const reply of comment.replies) {
    processReply(reply, ul_replies, currentUser, li_comment);
  }
}

export function processReply(comment, ul_replies, currentUser, li) {
  const replyClone = createCommentContent(
    comment.score,
    comment.user.username,
    comment.user.image.webp,
    comment.createdAt,
    comment.content,
    comment.user.username === "juliusomo"
  );

  addScoreFunctionality(replyClone, comment.score);

  const li_reply = document.createElement("li");
  li_reply.classList.add("reply");
  li_reply.appendChild(replyClone);

  ul_replies.appendChild(li_reply);
  li.appendChild(ul_replies);

  const ta = document.createElement("textarea");
  ta.classList.add("text");
  ta.value = li_reply.querySelector("p").textContent;
  ta.classList.add("hide");
  replyClone.appendChild(ta);
  replyForm(replyClone, currentUser, ul_replies);
}

export function commentForm(currentUser) {
  const currentUserClone = currentUserInfoCmt(currentUser.image.webp);
  addCommentFunctionality(currentUserClone, currentUser);
  document
    .getElementById("comments")
    .insertAdjacentElement("afterend", currentUserClone.firstElementChild);
}

function createCommentContent(score, username, src, date, text, isCurrentUser) {
  const template = document.getElementById("content-template");

  const clone = template.content.cloneNode(true).firstElementChild;

  clone.querySelector("p.text").textContent = text;
  clone.querySelector(".date").textContent = date;
  clone.querySelector(".scorenun").textContent = score;
  clone.querySelector("img.avatars").src = src;
  clone.querySelector(".name").textContent = username;

  if (isCurrentUser) {
    clone.querySelector(".you").textContent = "you";
    const icon_reply = clone.querySelector(".icon-reply");
    const editDelete = createEditDelete();
    icon_reply.parentElement.appendChild(editDelete);
    icon_reply.remove();
  }

  return clone;
}

function replyForm(contentClone, currentUser, li) {
  const replyButton = contentClone.querySelector(".icon-reply");
  if (!replyButton) return;
  replyButton.onclick = () => {
    const existingReply = li.querySelector(".form");
    if (existingReply) {
      existingReply.remove();
      return;
    }

    const clone = CurrentUserInfoReply(currentUser.image.webp);
    contentClone.insertAdjacentElement("afterend", clone);

    addNewReplyFunctionality(clone, currentUser);
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

  sendButton.onclick = (e) => {
    if (e.target.previousElementSibling.value === "") {
      e.disabled = true;

      return;
    }

    const commentData = createCommentContent(
      0,
      currentUser.username,
      currentUser.image.webp,
      date().textContent,
      e.target.previousElementSibling.value,
      true
    );

    addScoreFunctionality(commentData, 0);

    const ta = document.createElement("textarea");
    ta.classList.add("text");
    ta.value = e.target.previousElementSibling.value;
    ta.classList.add("hide");

    const ul_comments = document.getElementById("comments");

    const li_comment = document.createElement("li");
    li_comment.classList.add("comment");
    li_comment.appendChild(commentData);
    commentData.appendChild(ta);
    ul_comments.appendChild(li_comment);
    e.target.previousElementSibling.value = "";
  };
}

function addNewReplyFunctionality(replyClone, currentUser) {
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

    addScoreFunctionality(div_content, 0);

    const li = document.createElement("li");
    li.classList.add("reply");
    li.appendChild(div_content);

    const ta = document.createElement("textarea");
    ta.classList.add("text");
    ta.value = li.querySelector("p").textContent;
    ta.classList.add("hide");

    div_content.appendChild(ta);

    const ul_rtr = document.createElement("ul");
    ul_rtr.classList.add("replies");
    ul_rtr.appendChild(li);
    e.target.closest("li").appendChild(ul_rtr);
    replyClone.remove();
  };
}

function createEditDelete() {
  const editDelete = document
    .getElementById("edit-delete-button-template")
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
    const p_text = e.target.closest("li").querySelector("p.text");
    const ta = e.target.closest("li").querySelector("textarea");

    const existingUdbtn = e.target.closest("li").querySelector(".button");
    if (existingUdbtn) {
      existingUdbtn.remove();
    }

    const update_div = createUpdateButton(ta);

    if (ta.classList.contains("hide")) {
      ta.classList.remove("hide");
      ta.value = p_text.textContent;
      p_text.classList.add("hide");
      update_div.classList.remove("hide");
    } else {
      ta.classList.add("hide");
      p_text.classList.remove("hide");
    }

    update_div.onclick = (e) => {
      if (e.target.parentElement.previousElementSibling.value === "") {
        e.disabled = true;

        return;
      }
      const newText = ta.value;
      p_text.textContent = newText;
      ta.classList.add("hide");
      p_text.classList.remove("hide");
      e.target.closest("li").querySelector(".date").textContent =
        date().textContent;

      update_div.remove();
    };
  };

  return editDelete;
}

function createUpdateButton(ta) {
  const update_div = document.createElement("div");
  update_div.classList.add("update-button-box");
  const update_button = document.createElement("button");
  update_button.classList.add("button");
  update_button.setAttribute("id", "udbtn");
  update_button.textContent = "UPDATE";
  update_div.appendChild(update_button);

  ta.insertAdjacentElement("afterend", update_div);
  update_div.classList.add("hide");

  return update_div;
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

function currentUserInfoCmt(src) {
  const template = document.getElementById("comment-form");
  const templateClone = template.content.cloneNode(true);

  templateClone.querySelector("img.avatars2").src = src;

  return templateClone;
}

function CurrentUserInfoReply(src) {
  const template = document.getElementById("reply-form-template");
  const clone = template.content.cloneNode(true).firstElementChild;

  clone.querySelector("img.avatars2").src = src;

  return clone;
}

function date() {
  const template = document.getElementById("reply-content-template");
  const clone = template.content.cloneNode(true).firstElementChild;
  const dateBox = clone.querySelector(".date");

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
