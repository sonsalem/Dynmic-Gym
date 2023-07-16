'use strict'

// Loading

let load = document.querySelector('.loading');

window.addEventListener('load', function () {
  setTimeout(() => {
    load.classList.add('fade');
  }, 500)
  setTimeout(() => {
    document.body.classList.remove('hide');
  }, 800);;
})

// Show NavBar

let navBar = document.querySelector('.uppernav');

window.addEventListener('scroll', function () {
  if (window.scrollY >= 180) {
    navBar.classList.add('show');
  } else {
    navBar.classList.remove('show');
  }
})

// Height Landing

let landing = document.querySelector('.landing');

landing.style.cssText = `min-height: calc(100vh - ${navBar.offsetHeight}px);`

// Setting Menu

let setting = document.querySelector('.setting');
let closeSetting = document.querySelector('.setting-menu .closeSetting')
let settingMenu = document.querySelector('.setting-menu');

setting.addEventListener('click', function () {
  settingMenu.classList.add('show');
  document.body.style.overflowY = 'hidden'
})
closeSetting.addEventListener('click', function () {
  settingMenu.classList.remove('show')
  document.body.style.overflowY = 'unset'
})

// Switch Mood

let swicth = document.querySelector('.toggle-button');
let swicthIco = document.querySelector('.toggle-button .circle i');

if (localStorage.getItem('theme')) {
  document.querySelector('html').id = `${localStorage.getItem('theme')}`;
}

document.addEventListener('click', function (e) {
  if (e.target == swicth) {
    if (document.querySelector('html').id == 'dark') {
      document.querySelector('html').id = '';
      swicthIco.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      document.querySelector('html').id = 'dark'
      swicthIco.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  }
})

if (document.querySelector('html').id == 'dark') {
  swicthIco.classList.replace('fa-sun', 'fa-moon');
} else {
  swicthIco.classList.replace('fa-moon', 'fa-sun');
}

// MAin Toggle Buttons

let togglButton = document.querySelectorAll('.toggle-button-custom');
let togglButtonNotfy = document.querySelectorAll('.toggle-button-custom.notfy');

let arrLocal = ['notfy', 'update', 'showpro'];

for (let i = 0; i < arrLocal.length; i++) {
  if (window.localStorage.getItem(`${arrLocal[i]}`)) {
    document.querySelector(`.${arrLocal[i]}`).classList.add('active');
  }
}

togglButton.forEach(el => {
  el.addEventListener('click', function (e) {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      this.classList.add('active');
    }
    for (let i = 0; i < arrLocal.length; i++) {
      if (this.classList.contains(`${arrLocal[i]}`)) {
        if (this.classList.contains('active')) {
          window.localStorage.setItem(`${arrLocal[i]}`, 'true');
        } else {
          window.localStorage.removeItem(`${arrLocal[i]}`);
        }
      }
    }
  })
})

// Links Active

let links = document.querySelectorAll('.links li a')
let about = document.querySelector('#about');
let services = document.getElementById('services');
let product = document.getElementById('product');

links[0].addEventListener('click', function () {
  scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

let linksActive = (link) => {
  links.forEach(el => {
    el.classList.remove('active');
    el.getAttribute('href').slice(el.getAttribute('href').indexOf('#') + 1) === link.id && el.classList.add('active')
  })
}

window.addEventListener('scroll', function () {
  if (this.scrollY < about.offsetTop - 100) {
    links.forEach(el => el.classList.remove('active'));
    links[0].classList.add('active')
  } else if (window.scrollY >= about.offsetTop - 100 && this.scrollY < services.offsetTop - 200) {
    linksActive(about);
  } else if (window.scrollY >= services.offsetTop - 100 && this.window.scrollY < services.offsetHeight + services.offsetTop - 200) {
    linksActive(services);
  } else if (window.scrollY >= product.offsetTop - 100) {
    linksActive(product);
  }
})

// Hide Product

let hideProducts = document.getElementsByClassName('showpro');

let hidePro = function () {
  if (hideProducts[0].classList.contains('active')) {
    product.style.setProperty('display', 'none', 'important');
    links.forEach(el => {
      el.getAttribute('href').slice(el.getAttribute('href').indexOf('#') + 1) === 'product' ? el.style.setProperty('display', 'none', 'important') : ""
    })
  } else {
    product.style.setProperty('display', 'block',)
    links.forEach(el => {
      el.getAttribute('href').slice(el.getAttribute('href').indexOf('#') + 1) === 'product' ? el.style.setProperty('display', 'block') : ""
    })
  }
}

hidePro()
hideProducts[0].onclick = function () {
  hidePro()
  location.reload()
}

// Carousel Nav

$(document).ready(function () {
  $(".owl-header").owlCarousel({
    nav: false,
    loop: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    responsive: {
      0: {
        items: 1,
        margin: 0
      },
      667: {
        items: 2,
        margin: 20
      },
    }
  });
});

// Carousel
// Variubals
let next = document.querySelector('.buttons-carousel .next');
let prev = document.querySelector('.buttons-carousel .prev');
let ul = document.querySelector('.carousel-content ul');
let allLis = document.querySelectorAll('.carousel-content ul li');
let gap = 40;
let activeLi = Math.floor(allLis.length / 2);

if (document.querySelector('.carousel-content') != undefined) {
  // Style Elements
  document.querySelector('.carousel-content').style.cssText = 'position: relative; width:100vw; min-height:530px; padding-top:100px; display: flex; flex-direction: column; align-items: center;'
  ul.style.cssText = '  display: flex; justify-content: center; align-items: center; list-style: none; margin: 0; padding: 0; transition: .3s; user-select: none;'
  // Set Gap For Ul
  ul.style.gap = `${gap}px`;
  let styleElementsCarousel = () => {
    let styelItem = 'width: 250px; border-radius: 6px; opacity: .7; height: 250px; cursor: pointer; position: relative; transition: .3s; opacity: .1;'
    allLis.forEach(el => el.style = `${styelItem}`);
    if (allLis[activeLi] != undefined) {
      allLis[activeLi].style.cssText = `${styelItem}  opacity: 1 !important; scale: 1.5 !important; z-index: 1000;`
      allLis[activeLi].style.removeProperty('cursor')
    }
  }
  styleElementsCarousel()

  // Define The Conintes Will Work By It
  let n = -allLis[0].offsetWidth - gap
  ul.style.translate = `-${allLis[0].offsetWidth / 2 + (gap * .5)}px 0`
  if (allLis.length % 2 !== 0) {
    ul.style.translate = `0px`
  }

  // function Remoe Active
  let removClass = () => allLis.forEach(el => el.classList.remove('active'));

  // Add Id For Elements
  let start = 0;
  allLis.forEach(el => el.id = `${start++}`)

  // Loop Items
  let nextMove = 1;
  let prevMove = 1;

  // When allLis.length == 1
  if (allLis.length == 1) {
    activeLi = 0;
    ul.style.translate = `0 0`;
    next.classList.add('hidden')
    prev.classList.add('hidden')
  };

  // Add Class Active to allLis[activeLi]
  allLis[activeLi].classList.add('active')
  let lastMove = +(-n * ((allLis.length - 1) / 2)).toFixed(1);
  let scale = function (numberElement) {
    for (let i = 0; i < parseInt(allLis[numberElement].id); i++) {
      allLis[i].childNodes[1].classList.add('rotate')
      allLis[i].childNodes[1].classList.remove('right')
    }
    for (let i = parseInt(allLis[numberElement].id) + 1; i < allLis.length; i++) {
      allLis[i].childNodes[1].classList.add('rotate', 'right')
    }
    allLis[numberElement].childNodes[1].classList.remove('rotate')
    allLis[numberElement + 1] !== undefined && allLis[numberElement + 1].style.setProperty('scale', '1.25');
    allLis[numberElement - 1] !== undefined && allLis[numberElement - 1].style.setProperty('scale', '1.25');
    allLis[numberElement + 1] !== undefined && allLis[numberElement + 1].style.setProperty('opacity', '.5', 'important');
    allLis[numberElement - 1] !== undefined && allLis[numberElement - 1].style.setProperty('opacity', '.5', 'important');
    allLis[numberElement + 1] !== undefined && allLis[numberElement + 1].style.setProperty('z-index', '5');
    allLis[numberElement - 1] !== undefined && allLis[numberElement - 1].style.setProperty('z-index', '5');
  }

  scale(activeLi)

  // When CLick On Item
  allLis.forEach(function (el) {

    el.onclick = function () {

      removClass();
      this.classList.add('active');

      let offset = (-allLis[0].offsetWidth / 2 - (gap * .5))

      if (allLis.length % 2 == 0) {
        ul.style.translate = `${offset - n * ((allLis.length / 2) - (+this.id))}px`;
      } else {
        ul.style.translate = `${offset - n * (Math.floor(allLis.length / 2) - (+this.id)) - n / 2}px`;
      }

      activeLi = +this.id;
      nextMove = (+this.id + 1) - Math.floor(allLis.length / 2)
      prevMove = -(+this.id - Math.floor(allLis.length / 2) - 1)

      // Set Classes And Removes For Buttons
      if (ul.style.translate !== `${lastMove}px` && allLis.length > 1) {
        prev.classList.remove('hidden')
      }

      ul.style.translate === `${-lastMove}px` ? next.classList.add('hidden') : next.classList.remove('hidden')
      ul.style.translate === `${lastMove}px` ? prev.classList.add('hidden') : prev.classList.remove('hidden')
      styleElementsCarousel();
      scale(+this.id);

    }

  })
  next.onclick = function () {
    // When Should Function Work
    if (ul.style.translate !== `${-lastMove}px` && allLis.length > 1) {
      allLis.length % 2 == 0 ? ul.style.translate = `${n * nextMove + (n * .5)}px 0` : ul.style.translate = `${n * nextMove}px`
      activeLi++;
      nextMove++;
      prevMove--;
      // Style Elemnts
      styleElementsCarousel()
      scale(activeLi);
      // Set Classes And Removes For Buttons
      removClass()
      allLis[activeLi].classList.add('active')
      prev.classList.remove('hidden')
    }
    // Set Classes And Removes For Buttons
    if (ul.style.translate === `${-lastMove}px`) next.classList.add('hidden');
  };

  prev.onclick = function () {
    // When Should Function Work
    if (ul.style.translate !== `${lastMove}px` && allLis.length > 1) {
      ul.style.translate = `${-n * prevMove + (n * .5)}px 0`;
      allLis.length % 2 == 0 ? ul.style.translate = `${-n * prevMove + (n * .5)}px 0` : ul.style.translate = `${-n * prevMove}px 0`
      prevMove++;
      nextMove--
      activeLi--;
      // Style Elemnts
      styleElementsCarousel()
      scale(activeLi);
      // Set Classes And Removes For Buttons
      removClass()
      allLis[activeLi].classList.add('active')
    }
    // Set Classes And Removes For Buttons
    ul.style.translate === `${lastMove}px` ? prev.classList.add('hidden') : next.classList.remove('hidden')
  };
}

// Scroll To Top

let ToTop = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', function () {
  window.scrollY >= 600 ? ToTop.classList.add('show') : ToTop.classList.remove('show')
})