var form=document.getElementById('form');
form.addEventListener('submit',createPost);
function createPost(e){
    e.preventDefault();
    let obj={
        postLink:document.getElementById('Link').value,
        postDescription:document.getElementById('description').value
    }
    axios.post('http://localhost:3000/user/add-post',obj)
    .then(response=>{
        console.log(response.data.newPost);
        displayPost(response.data.newPost);
    })
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/user/get-posts')
   .then(dts=>{
    console.log(dts.data);
    let len=dts.data.newPost.length
    for(let i=0;i<len;i++){
      displayPost(dts.data.newPost[i]);
     }
  })
  .catch(err=>console.log(err));
})

function displayPost(obj){
    let postFeed=document.getElementById('postFeed');
    let postDiv=document.createElement('div');
    postDiv.classList.add('post-container'); 
    postDiv.innerHTML=`<div class="post-box"><p><img src="${obj.postLink}"></p><br><p> user- ${obj.postDescription}</p><br><h3>Comment</h3></div>`
    //postFeed.appendChild(postDiv);
    let inputbox=document.createElement('input');
    inputbox.setAttribute('id','comment');
    inputbox.setAttribute('placeholder','write a comment');
    postDiv.appendChild(inputbox);
    var btn=document.createElement('button')
   btn.textContent="Send"
   postDiv.appendChild(btn);
   postFeed.appendChild(postDiv);
   btn.addEventListener('onclick',()=>{
    const data=document.getElementById('comment').value;
   let li= document.createElement('li');
   li.appendChild(data);
   postDiv.appendChild(li);

   })
    

}