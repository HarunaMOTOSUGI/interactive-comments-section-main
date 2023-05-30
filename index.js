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
    const avatar = document.querySelector('.avatars');
    avatar.src = data.comments[0].user.image.webp;
 
    const name = document.querySelector('div.name');
    name.textContent = data.comments[0].user.username;

    const date = document.querySelector('.date');
    date.textContent = data.comments[0].createdAt;

    const text = document.querySelector('.text');
    text.textContent = data.comments[0].content;

    const score = document.querySelector('.scorenun');
    score.textContent = data.comments[0].score;

// coment1 > add-comment1
    const avatarJ = document.querySelectorAll('.avatars2');
    avatarJ.forEach(function(avatar) {
      avatar.src = data.currentUser.image.webp
    });


// comment2 > content
    const avatarM = document.querySelector('#comment2 .avatars')
    avatarM.src = data.comments[1].user.image.webp 

    const nameM = document.querySelector('#comment2 .content .name')
    nameM.textContent = data.comments[1].user.username

    const dateM = document.querySelector('#comment2 .content .date')
    dateM.textContent = data.comments[1].createdAt

    const textM = document.querySelector('#comment2 .content .text')
    textM.textContent = data.comments[1].content

    const scoreM = document.querySelector('#comment2 .content .scorenun')
    scoreM.textContent = data.comments[1].score

   
  // replies > reply1
    const avatarR = document.querySelector('#comment2 .reply1 .avatars')
    avatarR.src = data.comments[1].replies[0].user.image.webp 

    const nameR = document.querySelector('#comment2 .reply1 .name')
    nameR.textContent = data.comments[1].replies[0].user.username
    
    const dateR = document.querySelector('#comment2 .reply1 .date')
    dateR.textContent = data.comments[1].replies[0].createdAt

    const textR = document.querySelector('#comment2 .reply1 .text .replyText')
    textR.textContent = data.comments[1].replies[0].content

    const replyingToR = document.querySelector('#comment2 .reply1 .text .replyingTo')
    replyingToR.textContent = data.comments[1].replies[0].replyingTo

    const scoreR = document.querySelector('#comment2 .reply1 .content .scorenun')
    scoreR.textContent = data.comments[1].replies[0].score

    // replies > add-comment2

    // replies > edit-reply-content
    
    const nameJ = document.querySelector('#comment2 > ul > li.edit-reply-content > div.user-name > div.name')
    nameJ.textContent = data.comments[1].replies[1].user.username

    const dateJ = document.querySelector('#comment2 > ul > li.edit-reply-content > div.user-name > div.date')
    dateJ.textContent = data.comments[1].replies[1].createdAt

    const scoreJ = document.querySelector("#comment2 > ul > li.edit-reply-content > div.score > div")
    scoreJ.textContent = data.comments[1].replies[1].score

    const textJ = document.querySelector("#comment2 > ul > li.edit-reply-content > textarea")
    textJ.textContent = data.comments[1].replies[1].content

    // currentUserName.forEach(function(currentUserName) {
    // currentUserName.textContent = data.currentUser.username
    // });

    // const  = document.querySelectorAll('.currentUserDate');


    // const plusbutton = document.querySelector("#comment1 > div.content > div.score > button.plusBtn");
    // const minusbutton = document.querySelector("#comment1 > div.content > div.score > button.minusBtn");

    // let scorenun = parseInt(score.textContent);
    // console.log(score.textContent);

    // plusbutton.addEventListener("click", function () {
    //   if(score.textContent < score+1) {
    //   score.textContent = scorenun++;
    //   // console.log(score.textContent++);
    //   }
    // });

    // minusbutton.addEventListener("click", function () {
    //   // if(score.textContent > scorenun-1) {
    //   score.textContent = scorenun--;
    //   console.log('クリック');
    //   // }
    // });





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






// minusbutton.addEventListener("crick", function () {
//   score.vale--;
// });
