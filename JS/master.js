// get the main color from the  local Storage:

const getColorOption = localStorage.getItem('color_option');
if(getColorOption){
    document.documentElement.style.setProperty('--main-color',getColorOption)
    document.querySelector('.active').removeAttribute('class')
    // add active class on element with data-color === color_option in local storage
    document.querySelectorAll('.colors-list li').forEach(li => {

        if(li.dataset.color === getColorOption){
            li.classList.add('active');
        }
    })
}


// End 
// variable to control the interval 
let changeBackInterval; 
const navBullets = document.querySelector('.nav-bullets');
// show the ultimate settings 

let gearIcon = document.querySelector('.toggle-settings .fa-gear');
let toggleSettings = document.querySelector('.toggle-settings');
let settingsBox = document.querySelector('.settings-box');
toggleSettings.addEventListener('click',function(){
    gearIcon.classList.toggle('fa-spin');
    settingsBox.classList.toggle('open');
    /*
    let arrayClassName = gearIcon.className.split(' ');
    let arraySettingsBox = settingsBox.className.split(' ');
    if(gearIcon.className.indexOf('fa-spin')=== -1){
        arrayClassName.push('fa-spin')
        arraySettingsBox.push('open');
    }
    else{
        arrayClassName = arrayClassName.filter(e => e!== 'fa-spin');
        arraySettingsBox = arraySettingsBox.filter (e => e!== 'open');   
    }
    gearIcon.className = arrayClassName.join(' ');
    settingsBox.className = arraySettingsBox.join(' ');
    */
})
// End 

// change main color of the page :
const colorsList = document.querySelectorAll('.colors-list li');
colorsList.forEach(li => {
    li.addEventListener('click', e =>{
        // change the main color of the full page:
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        // save the main color in the local storage:
        localStorage.setItem('color_option',e.target.dataset.color);
        handleActive(e);
    })
})
//End
// Switch random backgrounds Option
const randomBack = document.querySelectorAll('.random-backgrounds span');

randomBack.forEach(span => {
    span.addEventListener('click', e => {
        
        handleActive(e);
        if(e.target.dataset.background === 'yes'){
            StartChangeBackground();
            localStorage.setItem('background_option','yes');
        }
        else{
            clearInterval(changeBackInterval);
            localStorage.setItem('background_option','no');
        }
    })
})
// Switch random the show bullets
const randomBullets = document.querySelectorAll('.navigation-bullets span');
randomBullets.forEach(span => {
    span.addEventListener('click', e => {
        handleActive(e);
        if(e.target.dataset.bullets === 'yes'){
            navBullets.style.display = 'block';
            localStorage.setItem('bullets_option','yes');
        }
        else{
            navBullets.style.display = 'none';
            localStorage.setItem('bullets_option','no');
        }
    })
})
// switch random the header Scrolling:
const headerScrolling = document.querySelectorAll('.header-scrolling span');
const HeaderArea = document.querySelector('.header-area');

headerScrolling.forEach(span => {
    span.addEventListener('click', e =>{
        handleActive(e);
        if(e.target.dataset.header === 'yes'){
            HeaderArea.classList.add('scroll');
            localStorage.setItem('header_scrolling','yes');
        }
        else{
            HeaderArea.classList.remove('scroll');
            localStorage.setItem('header_scrolling','no');
        }
    })
})
// Change the background of the landing page :

let landingPage = document.querySelector('.landing-page');

let imagesArray = ['image4.jpg','image1.jpg','image3.jpg','image2.jpg'];


// function to randomize background images
function StartChangeBackground(){
    changeBackInterval = setInterval(()=>{
        let randomNumber = Math.floor(Math.random()*imagesArray.length);
        landingPage.style.backgroundImage = `url('../Images/${imagesArray[randomNumber]}')`;
    },10000)
}
// End
// get the random background from the local storage
const getRandomBackground = localStorage.getItem('background_option');
if(getRandomBackground){
    if(getRandomBackground === 'yes'){
        StartChangeBackground();
    }
    else{
        clearInterval(changeBackInterval);
    }
    randomBack.forEach(span => {
        if(span.dataset.background === getRandomBackground){
            span.classList.add('active');
        }
        else{
            span.classList.remove('active')
        }
    })
}
else{
    StartChangeBackground();
}
// get the random bullets option from the local storage
const getBulletsOption = localStorage.getItem('bullets_option');
if(getBulletsOption){
    if(getBulletsOption === 'yes'){
        navBullets.style.display = 'block';
    }
    else{
        navBullets.style.display = 'none';
    }
    randomBullets.forEach(span => {
        if(span.dataset.bullets === getBulletsOption){
            span.classList.add('active');
        }
        else
            span.classList.remove('active');
    })
}
// get the header scrolling from the local storage
const getHeaderScrolling = localStorage.getItem('header_scrolling');
if(getHeaderScrolling){
    if(getHeaderScrolling === 'yes'){
        HeaderArea.classList.add('scroll');
    }
    else
        HeaderArea.classList.remove('scroll');
    
    headerScrolling.forEach(span => {
        if(span.dataset.header === getHeaderScrolling){
            span.classList.add('active');
        }
        else
            span.classList.remove('active');
    })
}
// Select Skills Selector
let ourSkills = document.querySelector('.our-skills')
window.onscroll = function(){
    let skillsOffsetTop = ourSkills.offsetTop; 
    let skillsOffsetHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;

    let spanProgress = document.querySelectorAll('.our-skills .skill-progress span');

    if(windowScrollTop > (skillsOffsetTop + skillsOffsetHeight - windowHeight)){
        
        spanProgress.forEach(span => {
             span.style.width = span.dataset.progress;
        })
    }
    
}

// Create PopUp of  the clicked image
let galleryImg = document.querySelectorAll('.our-gallery-images img');

galleryImg.forEach(img => {
    img.addEventListener('click', e => {
        let overlay = document.createElement('div');
        overlay.classList.add('popup-overlay');
        

        let popupCenterDiv = document.createElement('div');
        popupCenterDiv.classList.add('popup-center-div');
        

        let popupImg = document.createElement('img');
        popupImg.src = e.target.src;
        popupImg.classList.add('popup-img');

        if(e.target.alt && e.target.alt !== ''){
            let headingTitle = document.createElement('h3');
            let headingTitleText = document.createTextNode(e.target.alt);
            headingTitle.appendChild(headingTitleText);
            popupCenterDiv.appendChild(headingTitle);
        }
        popupCenterDiv.appendChild(popupImg)
        overlay.appendChild(popupCenterDiv);
        document.body.appendChild(overlay);

        let closeBtn = document.createElement('span');
        let closeBtnText = document.createTextNode('X');
        closeBtn.appendChild(closeBtnText);
        closeBtn.classList = 'close-btn';
        popupCenterDiv.appendChild(closeBtn);

        closeBtn.addEventListener('click',function(){
            overlay.remove();
        })
        
    })
})
// Create the bullet of each Section 
const allSections = document.querySelectorAll('section');

allSections.forEach(section =>{
    const bullet = document.createElement('div');
    bullet.className='bullet';
    bullet.setAttribute('data-section',`.${section.className}`);
    const tooltip = document.createElement('div');
    tooltip.className='tooltip';
    const nameTooltip = section.className.split('-').join(' ').toUpperCase();
    const tooltipText = document.createTextNode(nameTooltip);
    tooltip.appendChild(tooltipText);
    bullet.appendChild(tooltip);
    navBullets.appendChild(bullet);
})
// Select All Bullets 
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
// Select All links
const allLinks = document.querySelectorAll('.links a');

function scrollIntoViews(elements){
    elements.forEach(element => {
        element.addEventListener('click', e=> {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth',
            })
        })
    })
}
scrollIntoViews(allBullets);
scrollIntoViews(allLinks);
// Remove and add active class:
function handleActive(ev){
    // Remove active class from all childrens
    ev.target.parentElement.querySelector('.active').classList.remove('active');
    // add active class for the current element:
    ev.target.classList.add('active');
}

// Reset All Options
document.querySelector('.reset-options').addEventListener('click',function(){

    // remove all item of the local storage
    //localStorage.clear()

    // remove item by item 
    localStorage.removeItem('background_option');
    localStorage.removeItem('color_option');
    localStorage.removeItem('bullets_option');
    localStorage.removeItem('header_scrolling');

    // reflresh the current page:
    window.location.reload();
})

// Open the toggle menu
let toggleBtn = document.querySelector('.toggle-menu');
let links = document.querySelector('.header-area .links');

toggleBtn.addEventListener('click',function(e){
    e.stopPropagation()
    this.classList.toggle('menu-active');
    links.classList.toggle('open')
})
links.addEventListener('click',e => {
    e.stopPropagation()
})
// close the toggle menu 
document.addEventListener('click',e =>{
    if(e.target !== toggleBtn && e.target!==links){
        //if(links.className.indexOf('open')!==-1)
        if(links.classList.contains('open'))
        {
            toggleBtn.classList.toggle('menu-active')
            links.classList.toggle('open')
        }
    }
        
})
