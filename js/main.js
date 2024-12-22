

// infinite scroll
let currentpage=1;
let lastpage=1;
const baseurl='https://tarmeezacademy.com/api/v1/';

window.addEventListener("scroll",function(){
  let endpage=(window.innerHeight + window.pageYOffset) >= document.body.scrollHeight;
  if(endpage && currentpage < lastpage){
    currentpage=currentpagen + 1;
    getpost(false,currentpage);
  }
  // currentpage++
  
})

setupUrl()

getpost()

function getpost(reload=true, page=1){
  loadertoogle(true)
  axios.get( `${baseurl}posts?limit=6&page=${page}`)
.then(function (response) {
  loadertoogle(false)
let posts=response.data.data;
// lastpage=response.data.meta.last_page
let title="";
if(reload){
  document.getElementById("allpost").innerHTML="";
}
for(i of posts){
  console.log(i.id)
const posttagid=`post-tag${i.id}`;
let user=getcurrentuser();
let mypost=user!==null&& i.author.id==user.id;
let editbuttonclick=``;
let deletbuttonclick=``;
if(mypost){
  editbuttonclick=`    <button class=" btn-primary" style="border-raduies:6 px ;float:right" onclick="editcreatepost('${encodeURIComponent(JSON.stringify(i))}')">edit</button>
`
deletbuttonclick=` <button class=" btn-danger me-3" style="border-raduies:6 px ;float:right" onclick="deletpost('${encodeURIComponent(JSON.stringify(i))}')">delet</button>`
}
let content=` 
<div class="card mt-5 shadow">
  <div class="card-header">
      <span  class="portfolio" onclick="portfolioclicked(${i.author.id})" style="cursor:pointer">
      <img class=" rounded-circle border border-secondary" src=${i.author.profile_image} alt="" style="width: 40px; height: 40px;" id="tt">
      <span class="text-black-50" id="span">${i.author.username}</span>
      </span>

    <b>${editbuttonclick}</b>
    <b>${deletbuttonclick}</b>
  </div>
  <div class="card-body" onclick="postClicked(${i.id})" style="cursor:pointer">
    <img class="w-100" src=${i.image} alt="" id="img"  >
    <h6 class="text-black-50 pt-2" id="cr">${i.created_at}</h6>
      
    <h5 class="card-title">${i.title || title}</h5>
    <p class="card-text">${i.body}</p>
    <hr>
    <div>
      <i class="fas fa-pen"></i>
      <span>(${i.comments_count}) comments</span>
       <div class="d-inline ms-2" id=""> 
            </div>
            </div>
    </div>
  </div>
</div>`
document.getElementById("allpost").innerHTML+=content;
// document.getElementById(posttagid).innerHTML+="";
// for(tag of posts.tags){

//  ` let cont=   <span class="bg-secondary px-5 py-2 rounded-pill text-light ms-2"> ${tag.name}</span>
//  `
//  document.getElementById(posttagid).innerHTML+=cont;
// }
}

})
.catch(function (error) {
//   const message=error.response.data.message
// showAlertsuccess(message,'danger')
console.log(error)

});
}



    document.getElementById("s-log").addEventListener("click",(e)=>{  
      login()
    })
     
  
   function login(){
    let name= document.getElementById("recipient-name").value;
    let pass= document.getElementById("recipient-pass").value;
    const bodyParams={
      username:name,
      password:pass,
    }
    loadertoogle(true)
    const url=`${baseurl}login`;
    axios.post(url,bodyParams)
    .then((response)=>{
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("user",JSON.stringify(response.data.user));
      const modal=document.getElementById("exampleModal");
      const modalaInstance=bootstrap.Modal.getInstance(modal);
      modalaInstance.hide();
      showAlertsuccess("logged in",'success');
      setupUrl()
    })
    .catch((error)=>{
      
      console.log(error)
    })
    .finally(()=>{
      loadertoogle(false)
    })
   }
   document.getElementById("s-rigester").addEventListener("click",(e)=>{
    register()
   })
   function register(){
   const namerigester=document.getElementById("name-rigester").value
   const usernamerigester=document.getElementById("usernam-rigester").value
   const passigester=document.getElementById("rigester-pass").value
   let imag=document.getElementById("rigester-img").files[0];

    const url=`${baseurl}register`
   console.log(namerigester, usernamerigester, passigester)
    let formdata=new FormData();
    formdata.append("username",usernamerigester)
    formdata.append("password",passigester)
    formdata.append("image",imag)
    formdata.append("name",namerigester)

    loadertoogle(true)

  //  const paramsregester={
  //   username:usernamerigester,
  //   password:passigester,
  //   name:namerigester,
  //  }
   axios.post(url,formdata,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
   })
   .then((response)=>{
     localStorage.setItem("token",response.data.token);
     localStorage.setItem("user",JSON.stringify(response.data.user));
     console.log(response.data)
     const modal=document.getElementById("rigestermodal");
     const modalaInstance=bootstrap.Modal.getInstance(modal);
     modalaInstance.hide();
     showAlertsuccess("rigester anew user",'success');
     setupUrl();
   })
   .catch((error)=>{
    const message=error.response.data.message
    showAlertsuccess(message,"danger")
   })
   .finally(()=>{
    loadertoogle(false)
  })
   }
    function setupUrl(){
      let imageprofile=document.getElementById("img-profile");
      let addpostbtn=document.getElementById("add-post-btn")
      const devlog= document.getElementById("dev-log");
      // const rigesterbtn=document.getElementById("rigester");
      const logoutbtn=document.getElementById("logout");
      const token=localStorage.getItem("token");
      let nameprfile=document.getElementById("name-profile");
     
      if(token===null){
        devlog.style.setProperty("display","flex","important")
        logoutbtn.style.setProperty("display","none","important") ; 
        if(addpostbtn!=null){    
              addpostbtn.style.visibility="hidden";
        }
        // imageprofile.style.visibility="hidden";
        // nameprfile.style.visibility="hidden";

      }else{

       devlog.style.setProperty("display","none","important")
      logoutbtn.style.setProperty("display","flex","important") ; 

        if(addpostbtn!=null){    
          addpostbtn.style.visibility="visible";

    }
        // imageprofile.style.visibility="visible";
        // nameprfile.style.visibility="visible";
        let user=null;
        const storge=localStorage.getItem("user");
        if(storge!=null){
          user=JSON.parse(storge)
        }
        
        let nameprofile=document.getElementById("name-profile").innerHTML=user.name;
        imageprofile.src=user.profile_image;
       
      }
    }
    document.getElementById("logout").addEventListener("click",(e)=>{
      logout()

    })
    function logout(){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
     
      setupUrl()
      showAlertsuccess("logged out",'success')
  
    }

    function showAlertsuccess(custommessage,type){
      const alertplaceholder=document.getElementById("success-alert")
      const alert=(message,type)=>{
        const wrapper=document.createElement("div");
        wrapper.innerHTML=[
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `<div>${message}</div>`,
          `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>`,
        `  </div>`
          
        ].join('')

        alertplaceholder.append(wrapper); 
      }
      alert(custommessage,type)
    }
    document.getElementById("p-create").addEventListener("click",()=>{
      crearnewpost()
    })

    function crearnewpost(){
      let body=document.getElementById("body-post").value;
      let title=document.getElementById("titlemodal").value;
      let token=localStorage.getItem("token");
      let image=document.getElementById("image-post").files[0];
      let postId=document.getElementById("post-id-input").value;
      let isCreate=postId==null||postId=="";
      let formData=new FormData();
      formData.append("body",body);
      formData.append("title",title);
      formData.append("image",image);

      loadertoogle(true)
     if(isCreate){
      const urls=`${baseurl}posts`;
     
      axios.post(urls,formData,{
         headers:{
          "Content-Type":"multipart/form-data",
          "authorization":`Bearer ${token}`

        }
      })
      .then((response)=>{
        const modal=document.getElementById("creatpostmodal");
        const modalaInstance=bootstrap.Modal.getInstance(modal);
        modalaInstance.hide();
        getpost();
        showAlertsuccess(" success create a new post","success");

      }).catch((error)=>{
        console.log(error)
        showAlertsuccess(error.response.data.message,'danger');
      })
      .finally(()=>{
        loadertoogle(false)
      })
     }else{
      formData.append("_method","put")
      const urls=`${baseurl}posts/${postId}`;
     
      axios.post(urls,formData,{
         headers:{
          "Content-Type":"multipart/form-data",
          "authorization":`Bearer ${token}`

        }
      })
      .then((response)=>{
        const modal=document.getElementById("creatpostmodal");
        const modalaInstance=bootstrap.Modal.getInstance(modal);
        modalaInstance.hide();
        getpost();
        showAlertsuccess(" success create a new post","success");

      }).catch((error)=>{
        console.log(error)
        showAlertsuccess(error.response.data.message,'danger');
      })
      .finally(()=>{
        loadertoogle(false)
      })
     }
      
    }

function postClicked(postId){
  
  window.location=`postdetails.html?id=${postId}`
}



function editcreatepost(postobject){
  let post=JSON.parse(decodeURIComponent(postobject));
 
document.getElementById("post-id-input").value=post.id
document.getElementById("p-create").innerHTML="Update"
  console.log(post)
  document.getElementById("post-modaltitle").innerHTML="Edit post";
  document.getElementById("titlemodal").value=post.title;
  document.getElementById("body-post").value=post.body
  let postmodal=new bootstrap.Modal(document.getElementById("creatpostmodal"),{})
 postmodal.toggle()

}


function deletpost(postobject){
  let post=JSON.parse(decodeURIComponent(postobject));
  document.getElementById("input-delet-btn").value=post.id
  let postmodal=new bootstrap.Modal(document.getElementById("deletpostmodal"),{})
  postmodal.toggle()



}

function cofirmdelet(){
  const postid=  document.getElementById("input-delet-btn").value;
  let token=localStorage.getItem("token");
  let headers={
    "Content-Type":"multipart/form-data",
    "authorization":`Bearer ${token}`
  }
  
  axios.delete(`${baseurl}posts/${postid}`,{
    headers:headers
  })
  .then((response)=>{
    console.log(response.data)
    const modal=document.getElementById("deletpostmodal");
    const modalaInstance=bootstrap.Modal.getInstance(modal);
    modalaInstance.hide();
    showAlertsuccess("delet this post successfully",'success');
    setupUrl();
  })
  .catch((error)=>{
   console.log(error)
   showAlertsuccess(error.response.data.message,'danger');
  })

}


    function getcurrentuser(){
    let user=null;
    const storge=localStorage.getItem("user");
    if(storge!=null){
      user=JSON.parse(storge)
    }
    return user
  }
    console.log(getcurrentuser())


    function ptnclick(){
     
      document.getElementById("post-id-input").value=""
      document.getElementById("p-create").innerHTML="create"
       
        document.getElementById("post-modaltitle").innerHTML="create a new post";
        document.getElementById("titlemodal").value="";
        document.getElementById("body-post").value=""
        let postmodal=new bootstrap.Modal(document.getElementById("creatpostmodal"),{})
        postmodal.toggle()
    }
    function portfolioclicked(userid){
      
      window.location=`profile.html?userId=${userid}`
    }


    function profileClicked(){
      const user=getcurrentuser()
      const userid=user.id 
     window.location=`profile.html?userId=${userid}`

    }



     function loadertoogle(show=true)
     {
      if(show==true){
        document.getElementById("loader").style.visibility="visible";
      }else{
        document.getElementById("loader").style.visibility="hidden";
      }
     }
    