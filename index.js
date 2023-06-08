fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);

    //モーダル

    const iconDeleteBtn = document.querySelector("#comment2 > ul > li.edit-reply-content > div.delete-edit-icon > button:nth-child(1) > div")
    const modal = document.getElementById('easyModal');
    const buttonClose = document.getElementsByClassName('modalClose')[0];
    const modalDeleteBtn = document.querySelector(".delete")

    //------------------------------------------------------



    // comment1 > content(Amy)------------------
    const avatar = document.querySelector(".avatars");
    avatar.src = data.comments[0].user.image.webp;

    const name = document.querySelector("div.name");
    name.textContent = data.comments[0].user.username;

    const date = document.querySelector(".date");
    date.textContent = data.comments[0].createdAt;

    const text = document.querySelector(".text");
    text.textContent = data.comments[0].content;

    const score = document.querySelector(".scorenun"); //<div class="scorenun">12</div>
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
    addReplyBox.className = "add-comment1 hide";

    const comment1 = document.querySelector("#comment1");

    let avatars2 = document.createElement("img");
    avatars2.src = data.currentUser.image.webp;
    avatars2.alt = data.currentUser.username;
    avatars2.className = "avatars2";

    
    replybutton.addEventListener(
      "click",
      function () {


        addReplyBox.classList.toggle("hide")


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
    scorenun.textContent = 0
    scorenun.value = 0 //データは仮

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

    plusbutton.addEventListener("click", function () {
      if (scorenun.textContent < scorenun.value + 1) {
        scorenun.textContent++;
      }
    });

    minusbutton.addEventListener("click", function () {
      if (scorenun.textContent > scorenun.value -1) {
        scorenun.textContent--;
      }

    })

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

      const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
      
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return interval + ' years ago';
        }
      
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + ' months ago';
        }
      
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + ' days ago';
        }
      
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + ' hours ago';
        }
      
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + ' minutes ago';
        }
      
        if(seconds < 10) return 'just now';
      
        return Math.floor(seconds) + ' seconds ago';
      };
      date.textContent =(timeAgo(new Date()))
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

        //モーダル


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


      //edit-iconで編集
      iconEdit.addEventListener('click', e=> {
        // console.log(e.target);
        const p = e.target.closest('.delete-edit-icon').nextElementSibling
        const textContent = p.textContent
        console.log(textContent);
        const ta = document.createElement('textarea')
        ta.className ="text"
        ta.value = textContent
        p.parentElement.appendChild(ta)
        console.log(p.parentElement);
        const updateBtn = document.createElement("div")
        updateBtn.className = "update-button hide"
        const update =document.createElement("button")
        update.className = "button"
        update.textContent = "UPDATE"
        updateBtn.appendChild(update)




        p.parentElement.appendChild(updateBtn)
        updateBtn.classList.toggle("hide")
        p.remove()

        //update-buttonで編集確定
        updateBtn.addEventListener("click", function () {
          updateBtn.remove()
          const newText = document.createElement("p")
          newText.className = "text"
          newText.innerHTML = ta.value
          ta.replaceWith(newText)
          
        })        

      },{once:true})

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
    comment1.appendChild(repliesA)

    addReplyBox.remove()

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
    addReplyBox2.className = "add-comment2 hide";

    avatars2.src = data.currentUser.image.webp;
    avatars2.alt = data.currentUser.username;
    avatars2.className = "avatars2";

    replybutton.addEventListener(
      "click",
      function () {


        addReplyBox2.classList.toggle("hide")

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
      scorenun.textContent = 0
      scorenun.value = 0 //データは仮
  
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

      plusbutton.addEventListener("click", function () {
        if (scorenun.textContent < scorenun.value + 1) {
          scorenun.textContent++;
        }
      });
  
      minusbutton.addEventListener("click", function () {
        if (scorenun.textContent > scorenun.value -1) {
          scorenun.textContent--;
        }
  
      })


  
  
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
        const timeAgo = (date) => {
          const seconds = Math.floor((new Date() - date) / 1000);
        
          let interval = Math.floor(seconds / 31536000);
          if (interval > 1) {
            return interval + ' years ago';
          }
        
          interval = Math.floor(seconds / 2592000);
          if (interval > 1) {
            return interval + ' months ago';
          }
        
          interval = Math.floor(seconds / 86400);
          if (interval > 1) {
            return interval + ' days ago';
          }
        
          interval = Math.floor(seconds / 3600);
          if (interval > 1) {
            return interval + ' hours ago';
          }
        
          interval = Math.floor(seconds / 60);
          if (interval > 1) {
            return interval + ' minutes ago';
          }
        
          if(seconds < 10) return 'just now';
        
          return Math.floor(seconds) + ' seconds ago';
        };
        date.textContent =(timeAgo(new Date()))
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


        //モーダル

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

        //edit-iconで編集する
        iconEdit.addEventListener('click', e=> {
          // console.log(e.target);
          const p = e.target.closest('.delete-edit-icon').nextElementSibling
          const textContent = p.textContent
          console.log(textContent);
          const ta = document.createElement('textarea')
          ta.className ="text"
          ta.value = textContent
          p.parentElement.appendChild(ta)
          console.log(p.parentElement);
          const updateBtn = document.createElement("div")
          updateBtn.className = "update-button"
          const update =document.createElement("button")
          update.className = "button"
          update.textContent = "UPDATE"
          updateBtn.appendChild(update)
  
          p.parentElement.appendChild(updateBtn)
          p.remove()

          
        //update-buttonで編集確定
        updateBtn.addEventListener("click", function () {
          updateBtn.remove()
          const newText = document.createElement("p")
          newText.className = "text"
          newText.innerHTML = ta.value
          ta.replaceWith(newText)
          
        })        

  
        },{once:true})
  
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

      addReplyBox2.remove()

    })

 
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
    addReplyBox3.className = "add-comment3 hide";

    avatars2.src = data.currentUser.image.webp;
    avatars2.alt = data.currentUser.username;
    avatars2.className = "avatars2";


    replybutton.addEventListener(
      "click",
      function () {

        addReplyBox3.classList.toggle("hide")

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
      scorenun.textContent = 0
      scorenun.value = 0 //データは仮
  
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
  
      plusbutton.addEventListener("click", function () {
        if (scorenun.textContent < scorenun.value + 1) {
          scorenun.textContent++;
        }
      });
  
      minusbutton.addEventListener("click", function () {
        if (scorenun.textContent > scorenun.value -1) {
          scorenun.textContent--;
        }
  
      })
  
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
        const timeAgo = (date) => {
          const seconds = Math.floor((new Date() - date) / 1000);
        
          let interval = Math.floor(seconds / 31536000);
          if (interval > 1) {
            return interval + ' years ago';
          }
        
          interval = Math.floor(seconds / 2592000);
          if (interval > 1) {
            return interval + ' months ago';
          }
        
          interval = Math.floor(seconds / 86400);
          if (interval > 1) {
            return interval + ' days ago';
          }
        
          interval = Math.floor(seconds / 3600);
          if (interval > 1) {
            return interval + ' hours ago';
          }
        
          interval = Math.floor(seconds / 60);
          if (interval > 1) {
            return interval + ' minutes ago';
          }
        
          if(seconds < 10) return 'just now';
        
          return Math.floor(seconds) + ' seconds ago';
        };
        date.textContent =(timeAgo(new Date()))
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


        //モーダル

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

        //edit-iconで編集する
        iconEdit.addEventListener('click', e=> {
          // console.log(e.target);
          const p = e.target.closest('.delete-edit-icon').nextElementSibling
          const textContent = p.textContent
          console.log(textContent);
          const ta = document.createElement('textarea')
          ta.className ="text"
          ta.value = textContent
          p.parentElement.appendChild(ta)
          console.log(p.parentElement);
          const updateBtn = document.createElement("div")
          updateBtn.className = "update-button"
          const update =document.createElement("button")
          update.className = "button"
          update.textContent = "UPDATE"
          updateBtn.appendChild(update)
  
          p.parentElement.appendChild(updateBtn)
          p.remove()

          
        //update-buttonで編集確定
        updateBtn.addEventListener("click", function () {
          updateBtn.remove()
          const newText = document.createElement("p")
          newText.className = "text"
          newText.innerHTML = ta.value
          ta.replaceWith(newText)
          
        })        

  
        },{once:true})
        //----------------------------------
  
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

      addReplyBox3.remove()

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


        //モーダル

        const iconDelete = document.querySelector(".delete-edit-icon .icon-delete")

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

          const li = iconDelete.closest("li")
          li.remove()
          addReplyBox3.remove()
          modal.style.display = 'none';

          
        })    

        //edit-iconで編集する
        const iconEdit = document.querySelector(".delete-edit-icon .icon-edit")

        iconEdit.addEventListener('click', e=> {
          // console.log(e.target);
          const p = e.target.closest('.delete-edit-icon').nextElementSibling
          const textContent = p.textContent
          console.log(textContent);
          const ta = document.createElement('textarea')
          ta.className ="edit-textarea"
          ta.value = textContent
          p.parentElement.appendChild(ta)
          console.log(p.parentElement);
          const updateBtn = document.createElement("div")
          updateBtn.className = "update-button"
          const update =document.createElement("button")
          update.className = "button"
          update.textContent = "UPDATE"
          updateBtn.appendChild(update)
  
          p.parentElement.appendChild(updateBtn)
          p.remove()

          
          //update-buttonで編集確定
          updateBtn.addEventListener("click", function () {
            updateBtn.remove()
            const newText = document.createElement("p")
            newText.className = "edit-textarea"
            newText.innerHTML = ta.value
            ta.replaceWith(newText)
          
           })

  
        },{once:true})


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

// SENDボタン押下でコメント投稿

  addCommentButton.addEventListener("click",function () {

    const content = document.createElement("div")
    content.className = "content"

    //スコアボタン
    const scorenun = document.createElement("div")
    scorenun.className = "scorenun"
    scorenun.textContent = 0
    scorenun.value = 0 //データは仮

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

    plusbutton.addEventListener("click", function () {
      if (scorenun.textContent < scorenun.value + 1) {
        scorenun.textContent++;
      }
    });

    minusbutton.addEventListener("click", function () {
      if (scorenun.textContent > scorenun.value -1) {
        scorenun.textContent--;
      }

    })

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
      const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
      
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return interval + ' years ago';
        }
      
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + ' months ago';
        }
      
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + ' days ago';
        }
      
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + ' hours ago';
        }
      
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + ' minutes ago';
        }
      
        if(seconds < 10) return 'just now';
      
        return Math.floor(seconds) + ' seconds ago';
      };
      date.textContent =(timeAgo(new Date()))
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

      //edit-iconで編集する

      iconEdit.addEventListener('click', e=> {
        // console.log(e.target);
        const p = e.target.closest('.delete-edit-icon').nextElementSibling
        const textContent = p.textContent
        console.log(textContent);
        const ta = document.createElement('textarea')
        ta.className ="text"
        ta.value = textContent
        p.parentElement.appendChild(ta)
        console.log(p.parentElement);
        const updateBtn = document.createElement("div")
        updateBtn.className = "update-button"
        const update =document.createElement("button")
        update.className = "button"
        update.textContent = "UPDATE"
        updateBtn.appendChild(update)

        p.parentElement.appendChild(updateBtn)
        p.remove()

        //update-buttonで編集確定
        updateBtn.addEventListener("click", function () {
          updateBtn.remove()
          const newText = document.createElement("p")
          newText.className = "text"
          newText.innerHTML = ta.value
          ta.replaceWith(newText)
          
        })                

      },{once:true})
      //---------------------------------------

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
    content.appendChild(deleteeditIcon)
    content.appendChild(text)

    const comment1 = document.createElement("div")
    comment1.id = "comment1"



    comment1.appendChild(content)
    
    comments.appendChild(comment1)




    })

  })


  // .catch((err) => {
  //   // Do something for an error here
  // })

