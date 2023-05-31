fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    // Work with JSON data here
    // data.comments  data.currentUser
    // const commentList = document.getElementById('comments') // ul#comments
    // const commentList = document.getElementById('comments') // ul#comments
    // for (const comment of data.comments) {
    //   const li = createComment(comment)
    //   commentList.appendChild(li)
    // }

    // obj = {
    //   key: value,
    // }, list=[q1,2,3,3,32,42,3,2]

    // comment1 > content
    const avatar = document.querySelector(".avatars");
    avatar.src = data.comments[0].user.image.webp;

    const name = document.querySelector("div.name");
    name.textContent = data.comments[0].user.username;

    const date = document.querySelector(".date");
    date.textContent = data.comments[0].createdAt;

    const text = document.querySelector(".text");
    text.textContent = data.comments[0].content;

    const score = document.querySelector(".scorenun"); //<div class="scorenun">11</div>
    score.textContent = data.comments[0].score; //score.textContent=12

    // スコアボタン

    let plusbutton = document.querySelector(
      "#comment1 > div.content > div.score > button.plusBtn"
    );
    let minusbutton = document.querySelector(
      "#comment1 > div.content > div.score > button.minusBtn"
    );

    plusbutton.addEventListener("click", function () {
      if (score.textContent < data.comments[0].score + 1) {
        score.textContent++;
      }
    });

    minusbutton.addEventListener("click", function () {
      if (score.textContent > data.comments[0].score - 1) {
        score.textContent--;
      }
    });

    // coment1 > add-comment1
    const avatarJ = document.querySelectorAll(".avatars2");
    avatarJ.forEach(function (avatar) {
      avatar.src = data.currentUser.image.webp;
    });

    //<li id="comment1">内のReplyボタン押下でadd-comment1出現

    let replybutton = document.querySelector("#comment1 .icon-reply");
    
    replybutton.addEventListener(
      "click",
      function () {
        const avatars2 = document.createElement("img");
        avatars2.src = data.currentUser.image.webp;
        avatars2.alt = data.currentUser.username;
        avatars2.className = "avatars2";

        const newComment = document.createElement("textarea");
        newComment.name = "comment";
        newComment.placeholder = "Add a comment...";
        newComment.className = "comment";

        const addCommentBox = document.createElement("div");
        addCommentBox.className = "add-comment1";

        const addCommentButton = document.createElement("button");
        addCommentButton.className = "button";
        addCommentButton.textContent = "REPLY";

        addCommentBox.appendChild(avatars2);
        addCommentBox.appendChild(newComment);
        addCommentBox.appendChild(addCommentButton);

        const commentList = document.querySelector("#comment1");
        commentList.appendChild(addCommentBox);

      },
      { once: true }
    );

    // comment2 > content
    const avatarM = document.querySelector("#comment2 .avatars");
    avatarM.src = data.comments[1].user.image.webp;

    const nameM = document.querySelector("#comment2 .content .name");
    nameM.textContent = data.comments[1].user.username;

    const dateM = document.querySelector("#comment2 .content .date");
    dateM.textContent = data.comments[1].createdAt;

    const textM = document.querySelector("#comment2 .content .text");
    textM.textContent = data.comments[1].content;

    const scoreM = document.querySelector("#comment2 .content .scorenun");
    scoreM.textContent = data.comments[1].score;

    // スコアボタン
    plusbutton = document.querySelector(
      "#comment2 > div > div.score > button.plusBtn"
    );
    minusbutton = document.querySelector(
      "#comment2 > div > div.score > button.minusBtn"
    );

    plusbutton.addEventListener("click", function () {
      if (scoreM.textContent < data.comments[1].score + 1) {
        scoreM.textContent++;
      }
    });

    minusbutton.addEventListener("click", function () {
      if (scoreM.textContent > data.comments[1].score - 1) {
        scoreM.textContent--;
      }
    });

    //<li id="comment2">内のReplyボタン押下でadd-comment1出現

    replybutton = document.querySelector("#comment2 .icon-reply");

    replybutton.addEventListener(
      "click",
      function () {
        const avatars2 = document.createElement("img");
        avatars2.src = data.currentUser.image.webp;
        avatars2.alt = data.currentUser.username;
        avatars2.className = "avatars2";

        const newComment = document.createElement("textarea");
        newComment.name = "comment";
        newComment.placeholder = "Add a comment...";
        newComment.className = "comment";

        const addCommentBox = document.createElement("div");
        addCommentBox.className = "add-comment1";

        const addCommentButton = document.createElement("button");
        addCommentButton.className = "button";
        addCommentButton.textContent = "REPLY";

        addCommentBox.appendChild(avatars2);
        addCommentBox.appendChild(newComment);
        addCommentBox.appendChild(addCommentButton);

        const replies = document.querySelector("#comment2 > ul");

        replies.before(addCommentBox);
      },
      { once: true }
    );

    // replies > reply1
    const avatarR = document.querySelector("#comment2 .reply1 .avatars");
    avatarR.src = data.comments[1].replies[0].user.image.webp;

    const nameR = document.querySelector("#comment2 .reply1 .name");
    nameR.textContent = data.comments[1].replies[0].user.username;

    const dateR = document.querySelector("#comment2 .reply1 .date");
    dateR.textContent = data.comments[1].replies[0].createdAt;

    const textR = document.querySelector("#comment2 .reply1 .text .replyText");
    textR.textContent = data.comments[1].replies[0].content;

    const replyingToR = document.querySelector(
      "#comment2 .reply1 .text .replyingTo"
    );
    replyingToR.textContent = data.comments[1].replies[0].replyingTo;

    const scoreR = document.querySelector(
      "#comment2 .reply1 .content .scorenun"
    );
    scoreR.textContent = data.comments[1].replies[0].score;

    // スコアボタン
    plusbutton = document.querySelector(
      "#comment2 > ul > li.reply1 > div > div.score > button.plusBtn"
    );
    minusbutton = document.querySelector(
      "#comment2 > ul > li.reply1 > div > div.score > button.minusBtn"
    );

    plusbutton.addEventListener("click", function () {
      if (scoreR.textContent < data.comments[1].replies[0].score + 1) {
        scoreR.textContent++;
      }
    });

    minusbutton.addEventListener("click", function () {
      if (scoreR.textContent > data.comments[1].replies[0].score - 1) {
        scoreR.textContent--;
      }
    });

    //<li class="reply1">内のReplyボタン押下でadd-comment1出現

    replybutton = document.querySelector("#comment2 > ul > li.reply1 > div > button > div")

    replybutton.addEventListener(
      "click",
      function () {
        const avatars2 = document.createElement("img");
        avatars2.src = data.currentUser.image.webp;
        avatars2.alt = data.currentUser.username;
        avatars2.className = "avatars2";

        const newComment = document.createElement("textarea");
        newComment.name = "comment";
        newComment.placeholder = "Add a comment...";
        newComment.className = "comment";

        const addCommentBox = document.createElement("div");
        addCommentBox.className = "add-comment1";

        const addCommentButton = document.createElement("button");
        addCommentButton.className = "button";
        addCommentButton.textContent = "REPLY";

        addCommentBox.appendChild(avatars2);
        addCommentBox.appendChild(newComment);
        addCommentBox.appendChild(addCommentButton);

        const reply1 = document.querySelector(".reply1");

        reply1.after(addCommentBox);
      },
      { once: true }
    );

    // replies > edit-reply-content

    const nameJ = document.querySelector(
      "#comment2 > ul > li.edit-reply-content > div.user-name > div.name"
    );
    nameJ.textContent = data.comments[1].replies[1].user.username;

    const dateJ = document.querySelector(
      "#comment2 > ul > li.edit-reply-content > div.user-name > div.date"
    );
    dateJ.textContent = data.comments[1].replies[1].createdAt;

    const scoreJ = document.querySelector(
      "#comment2 > ul > li.edit-reply-content > div.score > div"
    );
    scoreJ.textContent = data.comments[1].replies[1].score;

    const textJ = document.querySelector(
      "#comment2 > ul > li.edit-reply-content > textarea"
    );
    textJ.textContent = data.comments[1].replies[1].content;

    // スコアボタン
    plusbutton = document.querySelector(
      "#comment2 > ul > li.edit-reply-content > div.score > button.plusBtn"
    );
    minusbutton = document.querySelector(
      "#comment2 > ul > li.edit-reply-content > div.score > button.minusBtn"
    );

    plusbutton.addEventListener("click", function () {
      if (scoreJ.textContent < data.comments[1].replies[1].score + 1) {
        scoreJ.textContent++;
      }
    });

    minusbutton.addEventListener("click", function () {
      if (scoreJ.textContent > data.comments[1].replies[1].score - 1) {
        scoreJ.textContent--;
      }
    });


  // コメント追加ボックス

  const avatars2 = document.createElement("img");
  avatars2.src = data.currentUser.image.webp;
  avatars2.alt = data.currentUser.username;
  avatars2.className = "avatars2";

  const newComment = document.createElement("textarea");
  newComment.name = "comment";
  newComment.placeholder = "Add a comment...";
  newComment.className = "comment";

  const addCommentBox = document.createElement("div");
  addCommentBox.className = "add-comment1";

  const addCommentButton = document.createElement("button");
  addCommentButton.className = "button";
  addCommentButton.textContent = "SEND";

  addCommentBox.appendChild(avatars2);
  addCommentBox.appendChild(newComment);
  addCommentBox.appendChild(addCommentButton);
  addCommentBox.className = "add-comment3"

  const comments = document.querySelector("#comments");

  comments.after(addCommentBox);

})


  .catch((err) => {
    // Do something for an error here
  });




// function createComment(comment) {

//     const li = document.createElement("li")
//     const div = document.createElement("div")
//     div.className = "content"
//     const score = document.createElement("div")
//     score.textContent = comment.score
//     div.appendChild(score)
//     li.appendChild(div)
//     // ....

//     return li;
// }
