//1-scroll navbar
window.addEventListener('scroll', () => {
    var header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

//2-Reveal scroll
window.addEventListener('scroll', reveal);

function reveal() {
    var doscroll = document.querySelectorAll('.reveal');
    for (let i = 0; i < doscroll.length; i++) {
        let windowH = window.innerHeight;
        let scrollTop = doscroll[i].getBoundingClientRect().top;
        var scrollPoint = 150;
        if (scrollTop < windowH - scrollPoint) {
            doscroll[i].classList.add('scroll');
        } else {
            doscroll[i].classList.remove('scroll');
        }
    }
}
//3-make navebar
//1-Make Our Tags
let tags = ["about", "skills", "gallery", "contact"];
//Make THe dynamics ul : only one li at it initially cause of active class
let list = `<ul> <li  class="home active"><a href="#home">Home</a></li>`;
//Loop to add tags to li
for (const x of tags) {
    list += `<li class=' ${x}'><a href="#${x}">${x} </a></li>`;
}
list += `</ul>`;
//but our ul in navbar
document.querySelector('#contain').innerHTML = DOMPurify.sanitize(list);
//loop in all section to add active class when scroll
const sections = document.querySelectorAll("section");
const headLi = document.querySelectorAll("header #contain ul li");
window.onscroll = () => {
    var current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });

    headLi.forEach((li) => {
        li.classList.remove("active");
        if (li.classList.contains(current)) {
            li.classList.add("active");
        }
    });
};
//4- handle about section and my video
function toggle() {
    let trailler = document.querySelector('.vid');
    let myVideo = document.querySelector('video');
    trailler.classList.toggle('action');
    myVideo.pause;
    myVideo.currentTime = 0;
}
//5-blur img and display text[Gallery]
let ourGallery = document.querySelectorAll('#gallery  img');
ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        //create overlay elemnt
        let overlay = document.createElement('div');
        overlay.className = 'overlay';
        //append overlay to body
        document.body.appendChild(overlay);
        //Create popup-box
        let popBox = document.createElement('div');
        popBox.className = 'pop-Box';
        //check
        if (img.alt !== null) {
            //Create Heading
            let imgHeading = document.createElement('h3');
            //Create imgText
            let imgText = document.createTextNode(img.alt);
            //Append Text to Heading
            imgHeading.appendChild(imgText);
            //append heading to popBox
            popBox.appendChild(imgHeading);
        }
        //create Image
        let popImage = document.createElement('img');
        //set Image's source
        popImage.src = img.src;
        //Add img to popup
        popBox.appendChild(popImage);
        //add popBox to body
        document.body.appendChild(popBox);
        //Create close span
        let closeIcon = document.createElement('span');
        //Create close Span Text
        let closeText = document.createTextNode('X');
        //Append Text to closeIcon
        closeIcon.appendChild(closeText);
        //add class to closeIcon
        closeIcon.className = 'close-icon';
        //Add closeIcon to popBox
        popBox.appendChild(closeIcon);
    });
});
//Close PopBox
document.addEventListener('click', (e) => {
        if (e.target.className == 'close-icon') {
            e.target.parentNode.remove();
            //Remove overlay
            document.querySelector('.overlay').remove();
        }
    })
    //6-contact trick
    // take it from https://speckyboy.com/css-javascript-text-animation-snippets/
var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};