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


    // comment1 > content(Amy)------------------
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

    //----------------------------------------------------------

    // coment1 > add-comment1-----------------------------------
    const avatarJ = document.querySelectorAll(".avatars2");
    avatarJ.forEach(function (avatar) {
      avatar.src = data.currentUser.image.webp;
    });
    //----------------------------------------------------------

    //<li id="comment1">内のReplyボタン押下でadd-comment1出現

    let replybutton = document.querySelector("#comment1 .icon-reply");

    const addReplyButton1 = document.createElement("button");
    addReplyButton1.className = "button";
    addReplyButton1.textContent = "REPLY";

    const newReply = document.createElement("textarea");
    newReply.name = "comment";
    newReply.placeholder = "Add a comment...";
    newReply.className = "comment";

    const addReplyBox = document.createElement("div");
    addReplyBox.className = "add-comment1";

    const comment1 = document.querySelector("#comment1");

    let avatars2 = document.createElement("img");
    avatars2.src = data.currentUser.image.webp;
    avatars2.alt = data.currentUser.username;
    avatars2.className = "avatars2";

    
    replybutton.addEventListener(
      "click",
      function () {







        addReplyBox.appendChild(avatars2);
        addReplyBox.appendChild(newReply);
        addReplyBox.appendChild(addReplyButton1);

  
        comment1.appendChild(addReplyBox);

      }
    );
    
   //-----------------------------------------------------------

   //Amyへのリプライ

   addReplyButton1.addEventListener("click",function () {

    

    const content = document.createElement("div")
    content.className = "content"

    //スコアボタン
    const scorenun = document.createElement("div")
    scorenun.className = "scorenun"
    scorenun.textContent = 0 //データは仮

    const score = document.createElement("div")
    score.className = "score"

    const plusBtnImg = document.createElement("img")
    plusBtnImg.src = "images/icon-plus.svg"
    plusBtnImg.alt = "plus"
  
    const plusbutton = document.createElement("button")
    plusbutton.className = "plusBtn"

    plusbutton.appendChild(plusBtnImg)

    const minusBtnImg = document.createElement("img")
    minusBtnImg.src = "images/icon-minus.svg"
    minusBtnImg.alt = "minus"

    const minusbutton = document.createElement("button")
    minusbutton.className = "minusBtn"

    minusbutton.appendChild(minusBtnImg)

    score.appendChild(plusbutton)
    score.appendChild(scorenun)
    score.appendChild(minusbutton)


    //　user-headline

      //user-name
      const myAvatar = document.createElement("img");
      myAvatar.src = data.currentUser.image.webp;
      myAvatar.alt = data.currentUser.username;
      myAvatar.className = "avatars";

      const name = document.createElement("div")
      name.textContent = data.currentUser.username
      name.className = "name"

      const you = document.createElement("div")
      you.textContent = "you"
      you.className = "you"

      const date = document.createElement("div")
      date.textContent = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
      
      date.className = "date"

      const userName = document.createElement("div")
      userName.className = "user-name"

      userName.appendChild(myAvatar)
      userName.appendChild(name)
      userName.appendChild(you)
      userName.appendChild(date)

    

      // delete-icon
      const deleteImg = document.createElement("img")
      deleteImg.src = "images/icon-delete.svg"
      deleteImg.alt = "delete"

      const textDelete = document.createElement("span")
      textDelete.textContent ="Delete"


      const iconDelete = document.createElement("div")
      iconDelete.className = "icon-delete"

                //     //モーダル


        const buttonClose = document.getElementsByClassName('modalClose')[0];
        const modalDeleteBtn = document.querySelector(".delete")

        // Deleteボタンがクリックされた時
        iconDelete.addEventListener('click', modalOpen);
        function modalOpen() {
          modal.style.display = 'block';
          console.log("paku");
        }

        // モーダルコンテンツ以外がクリックされた時
        addEventListener('click', outsideClose);
        function outsideClose(e) {
          if (e.target == modal) {
            modal.style.display = 'none';
          }
        }

        // NO,CANCELがクリックされた時
        buttonClose.addEventListener('click', modalClose);
        function modalClose() {
          modal.style.display = 'none';
        }

        modalDeleteBtn.addEventListener('click', e=> {
          // const li = e.target.closest('li')
          // li.remove()
          // modal.style.display = 'none';
          content.remove()
          addReplyBox.remove()
          modal.style.display = 'none';



          
        })
        
      




      iconDelete.appendChild(deleteImg)
      iconDelete.appendChild(textDelete)

      const iconDeleteBtn = document.createElement("button")
      
      iconDeleteBtn.appendChild(iconDelete)

      // edit-icon

      const editImg = document.createElement("img")
      editImg.src = "images/icon-edit.svg"
      editImg.alt = "edit"

      const textEdit = document.createElement("span")
      textEdit.textContent ="Edit"


      const iconEdit = document.createElement("div")
      iconEdit.className = "icon-edit"

      // iconEdit.addEventListener('click', e=> {
      //   // console.log(e.target);
      //   const p = e.target.closest('.delete-edit-icon').nextElementSibling
      //   const textContent = p.textContent
      //   console.log(textContent);
      //   const ta = document.createElement('textarea')
      //   ta.className ="text"
      //   ta.value = textContent
      //   p.parentElement.appendChild(ta)
      //   console.log(p.parentElement);
      //   const updateBtn = document.querySelector(".update-button")
      //   p.parentElement.appendChild(updateBtn)
      //   p.remove()

      // })

      iconEdit.addEventListener("click",function () {
        const editRplyContent = document.querySelector(".edit-reply-content")
        console.log(editRplyContent);
        const editBox = document.createElement("li")
        content.remove()
      })

      iconEdit.appendChild(editImg)
      iconEdit.appendChild(textEdit)

      const iconEditBtn = document.createElement("button")
      
      iconEditBtn.appendChild(iconEdit)

      const deleteeditIcon = document.createElement("div")
      deleteeditIcon.className = "delete-edit-icon"

      deleteeditIcon.appendChild(iconDelete)
      deleteeditIcon.appendChild(iconEdit)

      // text
      const text = document.createElement("div")
      text.textContent = newReply.value
      text.className = "text"

  
    content.appendChild(score)
    content.appendChild(userName)
    content.appendChild(deleteeditIcon)
    content.appendChild(text)



    const repliesA = document.createElement("ul")
    repliesA.className = "replies"
    const replyA = document.createElement("li")
    replyA.className = "reply1"


  
    replyA.appendChild(content)
    repliesA.appendChild(replyA)
    // addReplyBox.after(repliesA)
    comment1.appendChild(repliesA)
    // comments.appendChild(comment1)

      //     //モーダル

      // const modal = document.getElementById('easyModal');
      // const buttonClose = document.getElementsByClassName('modalClose')[0];
      // const modalDeleteBtn = document.querySelector(".delete")

      // // Deleteボタンがクリックされた時
      // iconDeleteBtn.addEventListener('click', modalOpen);
      // function modalOpen() {
      //   modal.style.display = 'block';
      //   console.log("paku");
      // }

      // // モーダルコンテンツ以外がクリックされた時
      // addEventListener('click', outsideClose);
      // function outsideClose(e) {
      //   if (e.target == modal) {
      //     modal.style.display = 'none';
      //   }
      // }

      // // NO,CANCELがクリックされた時
      // buttonClose.addEventListener('click', modalClose);
      // function modalClose() {
      //   modal.style.display = 'none';
      // }

      // modalDeleteBtn.addEventListener("click",function () {
      //   content.remove()
      //   modal.style.display = 'none';

        
      // })

  })

  //----------------------------------------------------

    // comment2 > content(Max)
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

    //---------------------------------------------------

    //<li id="comment2">内のReplyボタン押下でadd-comment1出現

    replybutton = document.querySelector("#comment2 .icon-reply");

    const comment2 = document.querySelector("#comment2");

    const newReply2 = document.createElement("textarea");
    newReply2.name = "comment";
    newReply2.placeholder = "Add a comment...";
    newReply2.className = "comment";

    const addReplyButton2 = document.createElement("button");
    addReplyButton2.className = "button";
    addReplyButton2.textContent = "REPLY";

    const addReplyBox2 = document.createElement("div");
    addReplyBox2.className = "add-comment2";

    replybutton.addEventListener(
      "click",
      function () {
        const avatars2 = document.createElement("img");
        avatars2.src = data.currentUser.image.webp;
        avatars2.alt = data.currentUser.username;
        avatars2.className = "avatars2";

        addReplyBox2.appendChild(avatars2);
        addReplyBox2.appendChild(newReply2);
        addReplyBox2.appendChild(addReplyButton2);

        const replies = document.querySelector("#comment2 > ul");

        replies.before(addReplyBox2);
      }
    );

    //----------------------------------------------------------

    //Maxへのリプライ投稿

    addReplyButton2.addEventListener("click",function () {

      const content = document.createElement("div")
      content.className = "content"
  
      //スコアボタン
      const scorenun = document.createElement("div")
      scorenun.className = "scorenun"
      scorenun.textContent = 0 //データは仮
  
      const score = document.createElement("div")
      score.className = "score"
  
      const plusBtnImg = document.createElement("img")
      plusBtnImg.src = "images/icon-plus.svg"
      plusBtnImg.alt = "plus"
    
      const plusbutton = document.createElement("button")
      plusbutton.className = "plusBtn"
  
      plusbutton.appendChild(plusBtnImg)
  
      const minusBtnImg = document.createElement("img")
      minusBtnImg.src = "images/icon-minus.svg"
      minusBtnImg.alt = "minus"
  
      const minusbutton = document.createElement("button")
      minusbutton.className = "minusBtn"
  
      minusbutton.appendChild(minusBtnImg)
  
      score.appendChild(plusbutton)
      score.appendChild(scorenun)
      score.appendChild(minusbutton)
  
  
      //　user-headline
  
        //user-name
        const myAvatar = document.createElement("img");
        myAvatar.src = data.currentUser.image.webp;
        myAvatar.alt = data.currentUser.username;
        myAvatar.className = "avatars";
  
        const name = document.createElement("div")
        name.textContent = data.currentUser.username
        name.className = "name"
  
        const you = document.createElement("div")
        you.textContent = "you"
        you.className = "you"
  
        const date = document.createElement("div")
        date.textContent = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        date.className = "date"
  
        
  
        const userName = document.createElement("div")
        userName.className = "user-name"
  
        userName.appendChild(myAvatar)
        userName.appendChild(name)
        userName.appendChild(you)
        userName.appendChild(date)
  
      
  
        // deleteicon
        const deleteImg = document.createElement("img")
        deleteImg.src = "images/icon-delete.svg"
        deleteImg.alt = "delete"
  
        const textDelete = document.createElement("span")
        textDelete.textContent ="Delete"
  
  
        const iconDelete = document.createElement("div")
        iconDelete.className = "icon-delete"
  
        iconDelete.appendChild(deleteImg)
        iconDelete.appendChild(textDelete)

        iconDelete.addEventListener('click', e=> {})
        // console.log(e);
        // const li = e.target.closest('li')
        // console.log(li);

                //     //モーダル


        const buttonClose = document.getElementsByClassName('modalClose')[0];
        const modalDeleteBtn = document.querySelector(".delete")

        // Deleteボタンがクリックされた時
        iconDelete.addEventListener('click', modalOpen);
        function modalOpen() {
          modal.style.display = 'block';
          console.log("paku");
        }

        // モーダルコンテンツ以外がクリックされた時
        addEventListener('click', outsideClose);
        function outsideClose(e) {
          if (e.target == modal) {
            modal.style.display = 'none';
          }
        }

        // NO,CANCELがクリックされた時
        buttonClose.addEventListener('click', modalClose);
        function modalClose() {
          modal.style.display = 'none';
        }

        modalDeleteBtn.addEventListener('click', e=> {
          // const li = e.target.closest('li')
          // li.remove()
          // modal.style.display = 'none';
          content.remove()
          modal.style.display = 'none';
          addReplyBox2.remove()

          
        })
  
        const iconDeleteBtn = document.createElement("button")
        
        iconDeleteBtn.appendChild(iconDelete)
  
        // edit-icon
  
        const editImg = document.createElement("img")
        editImg.src = "images/icon-edit.svg"
        editImg.alt = "edit"
  
        const textEdit = document.createElement("span")
        textEdit.textContent ="Edit"
  
  
        const iconEdit = document.createElement("div")
        iconEdit.className = "icon-edit"
  
        iconEdit.appendChild(editImg)
        iconEdit.appendChild(textEdit)
  
        const iconEditBtn = document.createElement("button")
        
        iconEditBtn.appendChild(iconEdit)
  
        const deleteeditIcon = document.createElement("div")
        deleteeditIcon.className = "delete-edit-icon"
  
        deleteeditIcon.appendChild(iconDelete)
        deleteeditIcon.appendChild(iconEdit)
  
        // text
        const text = document.createElement("div")
        text.textContent = newReply2.value
        text.className = "text"
  
    
      content.appendChild(score)
      content.appendChild(userName)
      content.appendChild(deleteeditIcon)
      content.appendChild(text)
  
  
  
      const repliesM = document.createElement("ul")
      repliesM.className = "replies"
      const replyM = document.createElement("li")
      replyM.className = "reply1"
  
  
    
      replyM.appendChild(content)
      repliesM.appendChild(replyM)

      comment2.appendChild(repliesM)

    })

    //Maxへのリプライを編集




    //----------------------------------------------------------

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

    //-----------------------------------------------------------

    //<li class="reply1">内のReplyボタン押下でadd-comment1出現

    replybutton = document.querySelector("#comment2 > ul:nth-child(2) > li.reply1 > div > button > div")
    
    const addReplyButton3 = document.createElement("button");
    addReplyButton3.className = "button";
    addReplyButton3.textContent = "REPLY";

    const newReply3 = document.createElement("textarea");
    newReply3.name = "comment";
    newReply3.placeholder = "Add a comment...";
    newReply3.className = "comment";

    const addReplyBox3 = document.createElement("div");
    addReplyBox3.className = "add-comment3";

    replybutton.addEventListener(
      "click",
      function () {
        const avatars2 = document.createElement("img");
        avatars2.src = data.currentUser.image.webp;
        avatars2.alt = data.currentUser.username;
        avatars2.className = "avatars2";



        addReplyBox3.appendChild(avatars2);
        addReplyBox3.appendChild(newReply3);
        addReplyBox3.appendChild(addReplyButton3);

        const reply1 = document.querySelector(".reply1");

        reply1.after(addReplyBox3);
      }
    );

    //-------------------------------------------------------------

    //Reply(ramses)へのリプライ
    addReplyButton3.addEventListener("click",function () {

      console.log("hakutyann");
  
      const content = document.createElement("div")
      content.className = "content"
  
      //スコアボタン
      const scorenun = document.createElement("div")
      scorenun.className = "scorenun"
      scorenun.textContent = 0 //データは仮
  
      const score = document.createElement("div")
      score.className = "score"
  
      const plusBtnImg = document.createElement("img")
      plusBtnImg.src = "images/icon-plus.svg"
      plusBtnImg.alt = "plus"
    
      const plusbutton = document.createElement("button")
      plusbutton.className = "plusBtn"
  
      plusbutton.appendChild(plusBtnImg)
  
      const minusBtnImg = document.createElement("img")
      minusBtnImg.src = "images/icon-minus.svg"
      minusBtnImg.alt = "minus"
  
      const minusbutton = document.createElement("button")
      minusbutton.className = "minusBtn"
  
      minusbutton.appendChild(minusBtnImg)
  
      score.appendChild(plusbutton)
      score.appendChild(scorenun)
      score.appendChild(minusbutton)
  
  
      //　user-headline
  
        //user-name
        const myAvatar = document.createElement("img");
        myAvatar.src = data.currentUser.image.webp;
        myAvatar.alt = data.currentUser.username;
        myAvatar.className = "avatars";
  
        const name = document.createElement("div")
        name.textContent = data.currentUser.username
        name.className = "name"
  
        const you = document.createElement("div")
        you.textContent = "you"
        you.className = "you"
  
        const date = document.createElement("div")
        date.textContent = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        date.className = "date"
  
        
  
        const userName = document.createElement("div")
        userName.className = "user-name"
  
        userName.appendChild(myAvatar)
        userName.appendChild(name)
        userName.appendChild(you)
        userName.appendChild(date)
  
      
  
        // deleteicon
        const deleteImg = document.createElement("img")
        deleteImg.src = "images/icon-delete.svg"
        deleteImg.alt = "delete"
  
        const textDelete = document.createElement("span")
        textDelete.textContent ="Delete"
  
  
        const iconDelete = document.createElement("div")
        iconDelete.className = "icon-delete"
  
        iconDelete.appendChild(deleteImg)
        iconDelete.appendChild(textDelete)

        iconDelete.addEventListener('click', e=> {})
        // console.log(e);
        // const li = e.target.closest('li')
        // console.log(li);

                //     //モーダル


        const buttonClose = document.getElementsByClassName('modalClose')[0];
        const modalDeleteBtn = document.querySelector(".delete")

        // Deleteボタンがクリックされた時
        iconDelete.addEventListener('click', modalOpen);
        function modalOpen() {
          modal.style.display = 'block';
          console.log("paku");
        }

        // モーダルコンテンツ以外がクリックされた時
        addEventListener('click', outsideClose);
        function outsideClose(e) {
          if (e.target == modal) {
            modal.style.display = 'none';
          }
        }

        // NO,CANCELがクリックされた時
        buttonClose.addEventListener('click', modalClose);
        function modalClose() {
          modal.style.display = 'none';
        }

        modalDeleteBtn.addEventListener('click', e=> {
          // const li = e.target.closest('li')
          // li.remove()
          // modal.style.display = 'none';
          content.remove()
          addReplyBox3.remove()
          modal.style.display = 'none';

          
        })
  
        const iconDeleteBtn = document.createElement("button")
        
        iconDeleteBtn.appendChild(iconDelete)
  
        // edit-icon
  
        const editImg = document.createElement("img")
        editImg.src = "images/icon-edit.svg"
        editImg.alt = "edit"
  
        const textEdit = document.createElement("span")
        textEdit.textContent ="Edit"
  
  
        const iconEdit = document.createElement("div")
        iconEdit.className = "icon-edit"
  
        iconEdit.appendChild(editImg)
        iconEdit.appendChild(textEdit)
  
        const iconEditBtn = document.createElement("button")
        
        iconEditBtn.appendChild(iconEdit)
  
        const deleteeditIcon = document.createElement("div")
        deleteeditIcon.className = "delete-edit-icon"
  
        deleteeditIcon.appendChild(iconDelete)
        deleteeditIcon.appendChild(iconEdit)
  
        // text
        const text = document.createElement("div")
        text.textContent = newReply3.value
        text.className = "text"
  
    
      content.appendChild(score)
      content.appendChild(userName)
      content.appendChild(deleteeditIcon)
      content.appendChild(text)
  
  
  
      const repliesM = document.createElement("ul")
      repliesM.className = "replies"
      const replyM = document.createElement("li")
      replyM.className = "reply1"
  
  
    
      replyM.appendChild(content)
      repliesM.appendChild(replyM)

      comment2.appendChild(repliesM)

      




  
    })

    //-------------------------------------------------------------

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

    const textJ = document.querySelector(".edit-textarea")
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


  //-----------------------------------------------------------------

  //リプライ編集

  // const editBtn = document.querySelector("#comment2 > ul > li.edit-reply-content > div.delete-edit-icon > .button")
  // editBtn.addEventListener("click", function() {
  //   console.log("hakupaku");
  // //   // const updateBtn = document.createElement("button")
  // //   // updateBtn.className = "update-button"

  // //   // const editRplyContent = document.querySelector("#comment2 > ul > li.edit-reply-content")
  // //   // editRplyContent.className = "edit-reply-content"

  // //   // editRplyContent.appendChild(updateBtn)
  // //   // const replies = document.querySelector("#comment2 > ul")

  // //   // replies.appendChild(editRplyContent)

    

    


  // })

   const iconEditBtn = document.querySelector("#comment2 > ul > li.edit-reply-content > div.delete-edit-icon > button:nth-child(2)")
   iconEditBtn.addEventListener("click",function () {
    updateBtn.classList.toggle("hide")
    textJ.remove()
    const editTextarea = document.createElement("textarea")
    editTextarea.className ="edit-textarea"
    editTextarea.textContent = textJ.textContent
    
    const editRplyContent = document.querySelector("#comment2 > ul > li.edit-reply-content")
    editRplyContent.appendChild(editTextarea)





   })
 
    
  // }) 



  //-----------------------------------------------------------------

  //自分のリプライをupdateする

  const updateBtn = document.querySelector(".update-button")
  const myComment = document.querySelector("#comment2 > ul > li.edit-reply-content > textarea")

  // updateBtn.addEventListener("click",function() {
    
  //   const newText = document.createElement("div")
  //   newText.textContent = myComment.value

  //   updateBtn.remove()



  // })

  

  // コメント追加ボックス

  avatars2 = document.createElement("img");
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

//----------------------------------------------------------

// 投稿されたボックス
// const scorenun = document.createElement("div");





// SENDボタン押下でコメント投稿

  addCommentButton.addEventListener("click",function () {

    const content = document.createElement("div")
    content.className = "content"

    //スコアボタン
    const scorenun = document.createElement("div")
    scorenun.className = "scorenun"
    scorenun.textContent = 0 //データは仮

    const score = document.createElement("div")
    score.className = "score"

    const plusBtnImg = document.createElement("img")
    plusBtnImg.src = "images/icon-plus.svg"
    plusBtnImg.alt = "plus"
  
    const plusbutton = document.createElement("button")
    plusbutton.className = "plusBtn"

    plusbutton.appendChild(plusBtnImg)

    const minusBtnImg = document.createElement("img")
    minusBtnImg.src = "images/icon-minus.svg"
    minusBtnImg.alt = "minus"

    const minusbutton = document.createElement("button")
    minusbutton.className = "minusBtn"

    minusbutton.appendChild(minusBtnImg)

    score.appendChild(plusbutton)
    score.appendChild(scorenun)
    score.appendChild(minusbutton)


    //　user-headline

      //user-name
      const myAvatar = document.createElement("img");
      myAvatar.src = data.currentUser.image.webp;
      myAvatar.alt = data.currentUser.username;
      myAvatar.className = "avatars";

      const name = document.createElement("div")
      name.textContent = data.currentUser.username
      name.className = "name"

      const you = document.createElement("div")
      you.textContent = "you"
      you.className = "you"

      const date = document.createElement("div")
      date.textContent = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
      date.className = "date"

      

      const userName = document.createElement("div")
      userName.className = "user-name"

      userName.appendChild(myAvatar)
      userName.appendChild(name)
      userName.appendChild(you)
      userName.appendChild(date)

    

      // deleteicon
      const deleteImg = document.createElement("img")
      deleteImg.src = "images/icon-delete.svg"
      deleteImg.alt = "delete"

      const textDelete = document.createElement("span")
      textDelete.textContent ="Delete"


      const iconDelete = document.createElement("div")
      iconDelete.className = "icon-delete"

      iconDelete.appendChild(deleteImg)
      iconDelete.appendChild(textDelete)

                      //     //モーダル


                      const buttonClose = document.getElementsByClassName('modalClose')[0];
                      const modalDeleteBtn = document.querySelector(".delete")
              
                      // Deleteボタンがクリックされた時
                      iconDelete.addEventListener('click', modalOpen);
                      function modalOpen() {
                        modal.style.display = 'block';
                        console.log("paku");
                      }
              
                      // モーダルコンテンツ以外がクリックされた時
                      addEventListener('click', outsideClose);
                      function outsideClose(e) {
                        if (e.target == modal) {
                          modal.style.display = 'none';
                        }
                      }
              
                      // NO,CANCELがクリックされた時
                      buttonClose.addEventListener('click', modalClose);
                      function modalClose() {
                        modal.style.display = 'none';
                      }
              
                      modalDeleteBtn.addEventListener('click', e=> {
                        // const li = e.target.closest('li')
                        // li.remove()
                        // modal.style.display = 'none';
                        content.remove()
                        modal.style.display = 'none';
              
                        
                      })

      const iconDeleteBtn = document.createElement("button")
      
      iconDeleteBtn.appendChild(iconDelete)

      // edit-icon

      const editImg = document.createElement("img")
      editImg.src = "images/icon-edit.svg"
      editImg.alt = "edit"

      const textEdit = document.createElement("span")
      textEdit.textContent ="Edit"


      const iconEdit = document.createElement("div")
      iconEdit.className = "icon-edit"

      iconEdit.appendChild(editImg)
      iconEdit.appendChild(textEdit)

      const iconEditBtn = document.createElement("button")
      
      iconEditBtn.appendChild(iconEdit)

      const deleteeditIcon = document.createElement("div")
      deleteeditIcon.className = "delete-edit-icon"

      deleteeditIcon.appendChild(iconDelete)
      deleteeditIcon.appendChild(iconEdit)

      // text
      const text = document.createElement("div")
      text.textContent = newComment.value
      text.className = "text"

    





    content.appendChild(score)
    content.appendChild(userName)
    content.appendChild(text)
    content.appendChild(deleteeditIcon)

    const comment1 = document.createElement("div")
    comment1.id = "comment1"



    comment1.appendChild(content)
    
    comments.appendChild(comment1)




  })

  

  //-------------------------------------------------

//モーダル

const iconDeleteBtn = document.querySelector("#comment2 > ul > li.edit-reply-content > div.delete-edit-icon > button:nth-child(1) > div")
const modal = document.getElementById('easyModal');
const buttonClose = document.getElementsByClassName('modalClose')[0];
const modalDeleteBtn = document.querySelector(".delete")

//------------------------------------------------------






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
