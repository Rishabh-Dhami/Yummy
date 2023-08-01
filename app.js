const cursor=document.querySelector("#cursor");

window.addEventListener("mousemove",(move)=>{
    cursor.style.left= move.x+"px";
    cursor.style.top= move.y+"px";

})



//  navbar section

const navbar=document.querySelectorAll("#navbar a");
const sec=document.querySelectorAll("section");

function activeMenu(){
    let current="";
    sec.forEach(section=>{
        
        const sectionTop=section.offsetTop;
        const sectionheight=section.clientHeight;

        if(pageYOffset >= (sectionTop - sectionheight/3)){
            current=section.getAttribute("id")
        }
    })

navbar.forEach((nav)=>{
    nav.classList.remove("active");
    if(nav.classList.contains(current)){
        nav.classList.add("active")
    }
})    

}


window.addEventListener("scroll",()=>{
    activeMenu()
})


// slider section

const slides=document.querySelectorAll(".slides")
const bar =document.querySelectorAll(".bar div")

slides.forEach((slide,index)=>{
    slide.style.left=`${index*100}%`;
})

bar.forEach((bar,index)=>{
    bar.addEventListener("click",function(e){
        removebarActive()
        bar.classList.add("active")
        sliding(index);
    }) 
})


const removebarActive=()=>{
    bar.forEach((bar)=>{
        bar.classList.remove("active") 
     })
}




const sliding=(input="")=>{
    slides.forEach((slide)=>{
        slide.style.transform=`translateX(-${input*100}%)`
    })
}


// gallery slider

const gallerySlides=document.querySelectorAll(".gallery-slide");

gallerySlides.forEach((slide,index)=>{
    slide.style.left=`${index*20}%`;
})







// dropdown function

const method=document.getElementById("method")

const method2=document.getElementById("method-2")

const dropdown=()=>{
method.classList.toggle("active");
method2.classList.remove("active")
}

const dropLeft=()=>{
    method2.classList.toggle("active")
    }



// menu Section    


const menuScoller=document.querySelectorAll("#menu .menu-scoller a");
const menuHeader=document.getElementById("menu-header")

menuScoller.forEach((menu)=>{
menu.addEventListener('click',function(){
    removeScoller()
    this.classList.add("active")
    menuHeader.innerHTML=this.innerHTML;
})
})

const removeScoller=()=>{
   menuScoller.forEach((menu)=>{
    menu.classList.remove("active")
   })
}



const chefIntro=document.querySelectorAll(" #chefs .chef-intro")
const chefFollow=document.querySelectorAll("#chefs .chef-follow")

chefIntro.forEach((chef,index)=>{
    chef.addEventListener('mouseover',function(){
        addFollow(index)
    })
})


const addFollow=(index="")=>{
    removeFollow()
chefFollow[index].classList.add("active")
}

const removeFollow=()=>{
    chefFollow.forEach((chef)=>{
        chef.classList.remove("active")
    })
}


// xbar section


const xbar=document.querySelector("#xbar");
const nav=document.querySelector("#navbar")


xbar.addEventListener('click',function(){
    nav.classList.add("active");
    method.classList.remove("active");
    method2.classList.remove("active")
})


const homeBar=document.querySelector("#homeBar");

homeBar.addEventListener("click",function(){
    nav.classList.remove("active")
    nav.classList.add("unactive");
})


const myCount=document.querySelectorAll(".counter-numbers")

myCount.forEach((myValue)=>{
  let  target_count=myValue.dataset.count;
  let init_count=myValue.innerText;
  
let speed=50;

let incrementSpeed=Math.floor(target_count / speed)

const updateNumber=()=>{
    init_count = +init_count+incrementSpeed;
    myValue.innerText=init_count;

    if(init_count < target_count){
        setTimeout(() => {updateNumber()}, 50);
    }
  }
 

  updateNumber();
})







// #event section


function myFunction(x) {
    if (x.matches) { // If media query matches

        const gallerySlides=document.querySelectorAll(".gallery-slide");

gallerySlides.forEach((slide,index)=>{
    slide.style.left=`${index*34}%`;
})


        const eventSlide=document.querySelectorAll(".event-slide")
        eventSlide.forEach((slide,index)=>{
            slide.style.left=`${index*100}%`;
        })
        
        const eventBar=document.querySelectorAll("#event-bar div");
        
        eventBar.forEach((bar,index)=>{
        bar.addEventListener('click',function(){
            removeEbarActive()
            bar.classList.add("active")
            eventsliding(index)
        })
        })
        
        
        const eventsliding=(input="")=>{
            eventSlide.forEach((slide)=>{
                slide.style.transform=`translateX(-${input*100}%)`
            })
        }
        
        const removeEbarActive=()=>{
            eventBar.forEach((bar)=>{
                bar.classList.remove("active") 
             })
        }
      }else{
        return ;
      }
      }

  
  
  var x = window.matchMedia("(max-width: 799px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes



  function mymobileFunction(y){
    if(y.matches){

        const gallerySlides=document.querySelectorAll(".gallery-slide");

        gallerySlides.forEach((slide,index)=>{
            slide.style.left=`${index*100}%`;
        })

        const galleryBar=document.querySelectorAll("#gallery-bar div");
        
        galleryBar.forEach((bar,index)=>{
        bar.addEventListener('click',function(){
            removeGbarActive()
            bar.classList.add("active")
            gallerysliding(index)
        })
        })
        
        
        const gallerysliding=(input="")=>{
            gallerySlides.forEach((slide)=>{
                slide.style.transform=`translateX(-${input*100}%)`
            })
        }
        
        const removeGbarActive=()=>{
            galleryBar.forEach((bar)=>{
                bar.classList.remove("active") 
             });


    }
  }else{
    return ;
  }
}

  var y = window.matchMedia("(max-width: 477px)")
  mymobileFunction(y) // Call listener function at run time
  y.addListener(mymobileFunction) // Attach listener function on state changes




 
  