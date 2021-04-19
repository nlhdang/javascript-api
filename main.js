

let output = '' ;
const postList = document.querySelector(".post-list"); 
const addPostForm =  document.querySelector(".add-post-form");
const url = 'https://js-post-api.herokuapp.com/api/posts';
const titleValue = document.querySelector('#title-value'); 
const auhtorValue = document.querySelector('#body-value'); 
const desValue = document.querySelector('#description-value'); 
const imgValue = document.querySelector("#image-value");
const btnSubmmit = document.querySelector('.btn');





const renderPost = (posts) =>{
    posts.forEach(post => {
        output+= `
       


        <div class="card mt-4 col-md-6 bg-ligt" >
        <img  class="card-img-top"  width="300px" height="200px" src=${post.imageUrl}> 
        <div class="card-body" data-id=${post.id} >
        
         <h4 class="card-id">${post.id}</h4> 
         <p class="card-title" > ${post.title}</p>
          <p class="card-author">${post.author}</p>
          <p class="card-text"> ${post.description}</p>
        
          <a href="#" class="card-link btn btn-success" id="edit-post">Edit</a>
          <a href="#" class="card-link btn btn-danger" id="delete-post">Delete</a>

         
        </div>
      </div>

        `
    });

    postList.innerHTML= output;
}


fetch(url)
    .then(res => res.json())
    .then(data=> renderPost(data))


    postList.addEventListener('click', (e)=> {
        console.log(e.target.id);

            e.preventDefault();
            let delButtonPresses = e.target.id == 'delete-post' ;
            let editButtonPresses = e.target.id == 'edit-post' ;

            console.log(e.target.parentElement.dataset.id);
             let id = e.target.parentElement.dataset.id ;
            //delete 
            if(delButtonPresses){
                // console.log('remove post ') ;

                fetch(`${url}/${id}`, {
                    method: 'DELETE' , 
                })


                .then(res => res.json) 
                .then(()=> location.reload())
            }

            if(editButtonPresses) {
                const parent = e.target.parentElement ;
                let titleContent = parent.querySelector(".card-title").textContent  ;
                let authorContent = parent.querySelector(".card-author").textContent  ;
                console.log(titleContent); 
                console.log(authorContent);

                titleValue.value = titleContent ;
                auhtorValue.value = authorContent ;
            }


            //update 

            btnSubmmit.addEventListener('click', (e) =>{
                // console.log('updated')
                        e.preventDefault();
                fetch(`${url}/${id}`, {
                    method : 'PATCH' ,
                    headers : {
                        'Content-Type' :'application/json'
                    },
                    body : JSON.stringify({
                        title : titleValue.value ,
                        author : auhtorValue.value
                    })
                }) 
                .then (res =>res.json()) 
                .then(() => location.reload())
            })
    })

    // create 
    addPostForm.addEventListener('submit', (e)=> {
        e.preventDefault() ;
        // console.log('Form Submmit !!') ;
      

        console.log(titleValue.value)
        console.log(auhtorValue.value)
        console.log(imgValue.value)
        fetch(url, {
            method :  'POST' , 
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title : titleValue.value , 
                author : auhtorValue.value ,
                description: desValue.value ,
                imageUrl: imgValue.value 
                
                // image : imgValue.style.backgroundImage
            })
        })

        .then(res => res.json())
        .then(data =>  {
            const dataArr = []; 
            dataArr.push(data);

            renderPost(dataArr) ;
        })
        alert("Successful")
         
        titleValue.value ='';
        auhtorValue.value= '';
        desValue.value= '';

    } )


    // const handleChangeImageClick = () => {
    //     const randomId = 1 + Math.trunc(Math.random() * 1000);
      
    //     const imageUrl = `https://picsum.photos/id/${randomId}/${AppConstants.DEFAULT_IMAGE_WIDTH}/${AppConstants.DEFAULT_IMAGE_HEIGHT}`;
      
    //     const element = document.querySelector("#postHeroImage");
    //     if (element) {
    //       element.style.backgroundImage = `url(${imageUrl})`;
    //       element.addEventListener("error", handleChangeImageClick);
    //     }
    //   };
      
    //   const changeBackgroundButton = document.querySelector("#postChangeImage");
    //   if (changeBackgroundButton) {
    //     changeBackgroundButton.addEventListener("click", handleChangeImageClick);
    //   }
      
    //   const getImageUrlFromString = (str) => {
    //     const firstDoubleQuotePosition = str.indexOf('"');
    //     const lastDoubleQuotePosition = str.lastIndexOf('"');
    //     return str.slice(firstDoubleQuotePosition + 1, lastDoubleQuotePosition);
    //   };