/**
 * Utils
 */

// Throttle
//
const throttle = (callback, limit) => {
  let timeoutHandler = null;
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        callback();
        timeoutHandler = null;
      }, limit);
    }
  };
};

// Fade animation for home page title (code begins)

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// Animation is hidden due to the alert message
// anime.timeline({loop: false})
//   .add({
//     targets: '.ml3 .letter',
//     opacity: [0,1],
//     easing: "easeInOutQuad",
//     duration: 1500
//     duration:
//     delay: (el, i) => 150 * (i+1)
//   })
// Fade animation for home page title (code ends)

// Alert Box Code STARTS; documentation - https://sweetalert2.github.io/
if (-1 === document.cookie.indexOf('returning=true')) {

    Swal.fire({
      title: '<span style="color:#e8eef2">Thank you for visiting!</span>',
      imageUrl: '/work-in-progress.png',
      imageHeight: 175,
      background: "#323232",
      html: '<span style="color:#e8eef2">"Work in progress, my friend" This site is currently void of content, but won\'t be that ways forever. Write to me that you expect to see nice things here. Your expressed expectation will keep me accountable. I hope to see ya again. Have a nice day!<span>',
      icon: 'info',
      confirmButtonText: 'Sweet.. Lets ping Garg',
      showCancelButton: true,
      cancelButtonText: 'Close'
  }).then((result) => {
  if (result.value) {
      window.location.href ='mailto:aditya@adityagarg.me?subject=Hey, I would like you to share updates on your website&body=';
      let timerInterval
        Swal.fire({
          title: '<span style="color:#e8eef2">You are awesome!</span>',
          html: '<span style="color:#e8eef2">Thank you very much for that thoughtful gesture.</span>',
          imageUrl: '/star-eyes-emoji.png',
          imageHeight: 100,
          background: "#323232",
          confirmButtonText: "Cool"
        })
  }
});
  document.cookie = 'returning=true';
}
// Alert Box Code ENDS; documentation - https://sweetalert2.github.io/

// //typeWriter animation for homepage title (code begins) (https://codepen.io/Danielgroen/pen/VeRPOq)
// document.addEventListener('DOMContentLoaded',function(event){
//   // array with texts to type in typewriter
//   var dataText = [ "Developer.", "Data Enthusiast.", "Dog Lover.", "GARG"];
//
//   // type one text in the typwriter
//   // keeps calling itself until the text is finished
//   function typeWriter(text, i, fnCallback) {
//     // check if text isn't finished yet
//     if (i < (text.length)) {
//       // add next character to h1
//      document.querySelector("#home-title").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
//
//       // wait for a while and call this function again for next character
//       setTimeout(function() {
//         typeWriter(text, i + 1, fnCallback)
//       }, 100);
//     }
//     document.querySelector("#home-title").innerHTML = '<span aria-hidden="true"></span>';
//     // text finished, call callback if there is a callback function
//     else if (typeof fnCallback == 'function') {
//       // call callback after timeout
//       setTimeout(fnCallback, 1000);
//     }
//   }
//   // start a typewriter animation for a text in the dataText array
//    function StartTextAnimation(i) {
//      // check if dataText[i] exists
//     if (i < dataText[i].length) {
//       // text exists! start typewriter animation
//      typeWriter(dataText[i], 0, function(){
//        // after callback (and whole text has been animated), start next text
//        StartTextAnimation(i + 1);
//      });
//     }
//   }
//   // start the text animation
//   StartTextAnimation(0);
// });
//
// //typeWriter animation for homepage title (code ends)

// addEventListener Helper
//
const listen = (ele, e, callback) => {
  if (document.querySelector(ele) !== null) {
    document.querySelector(ele).addEventListener(e, callback);
  }
}

/**
 * Functions
 */

// Auto Hide Header
//
let header = document.getElementById('site-header');
let lastScrollPosition = window.pageYOffset;

const autoHideHeader = () => {
  let currentScrollPosition = Math.max(window.pageYOffset, 0);
  if (currentScrollPosition > lastScrollPosition) {
    header.classList.remove('slideInUp');
    header.classList.add('slideOutDown');
  } else {
    header.classList.remove('slideOutDown');
    header.classList.add('slideInUp');
  }
  lastScrollPosition = currentScrollPosition;
}

// Mobile Menu Toggle
//
let mobileMenuVisible = false;

const toggleMobileMenu = () => {
  let mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuVisible == false) {
    mobileMenu.style.animationName = 'bounceInRight';
    mobileMenu.style.webkitAnimationName = 'bounceInRight';
    mobileMenu.style.display = 'block';
    mobileMenuVisible = true;
  } else {
    mobileMenu.style.animationName = 'bounceOutRight';
    mobileMenu.style.webkitAnimationName = 'bounceOutRight'
    mobileMenuVisible = false;
  }
}

// Featured Image Toggle
//
const showImg = () => {
  document.querySelector('.bg-img').classList.add('show-bg-img');
}

const hideImg = () => {
  document.querySelector('.bg-img').classList.remove('show-bg-img');
}

// ToC Toggle
//
const toggleToc = () => {
  document.getElementById('toc').classList.toggle('show-toc');
}


if (header !== null) {
  listen('#menu-btn', "click", toggleMobileMenu);
  listen('#toc-btn', "click", toggleToc);
  listen('#img-btn', "click", showImg);
  listen('.bg-img', "click", hideImg);

  document.querySelectorAll('.post-year').forEach((ele)=> {
    ele.addEventListener('click', () => {
      window.location.hash = '#' + ele.id;
    });
  });

  window.addEventListener('scroll', throttle(() => {
    autoHideHeader();

    if (mobileMenuVisible == true) {
      toggleMobileMenu();
    }
  }, 250));
}
