const design_card_butttons = document.querySelectorAll('.design-card');
const introduction_text = document.querySelectorAll('.introduction-text');

const single_profile_card = document.querySelectorAll('.single-profile-card');
const testimonial_card = document.querySelectorAll('.testimonial-card');

// Sarthak Patel
const list = document.querySelector('.navbar-menu');
const navItems = list.querySelectorAll('li');
const links = list.querySelectorAll('a');
const def = ["Home", "Service", "Technology","Certificates","Project","Works","Contacts"];
let s;
navItems.forEach(item => {
    const link = item.querySelector('a');
    link.addEventListener('click',() => {
      s = link.innerHTML;  
    //   console.log(s);
    });
  }); 
function handleClick(e) {
    if(e.target.classList != "active"){
    if (e.target.matches('a')) {
      links.forEach((link,index)=>{
        link.classList.remove('active')
        const old = def[index];
        link.innerHTML= old;
        })
      
      
        e.target.classList.add('active');
        e.target.innerHTML = "< "+s+" >";
      }
    }
}

design_card_butttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        introduction_text.forEach((introduction, introductionIndex) => {
            if (index === introductionIndex) {
                introduction.style.display = 'block';
            } else {
                introduction.style.display = 'none';
            }
        });
        design_card_butttons.forEach((btn, btnIndex) => {
            if (index === btnIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
                
            }
        });
    });
});

single_profile_card.forEach((btn, index) => {
    btn.addEventListener('click', ()=> {
        testimonial_card.forEach((testimonialCard, testimonialCardIndex) => {
            if (index === testimonialCardIndex) {
                testimonialCard.style.display = 'block';
            } else {
                testimonialCard.style.display = 'none';
            }
        });
        single_profile_card.forEach((cardBtn, cardIndex) => {
            if (index === cardIndex) {
                cardBtn.classList.add('profile-card-active');
            } else {
                cardBtn.classList.remove('profile-card-active');
            }
        });
    });
});


// const menu = document.querySelector('#header #n_div ui');

// const navItems = menu.querySelectorAll('li');
// navItems.forEach(item => {
//   const link = item.querySelector('a');
//   ink.addEventListener('click', () => {
//     link.classList.add("active");
//   });
// });


list.addEventListener('click', handleClick);


