//navbar
const navLinks = document.querySelectorAll('.nav-links a')
const sections = document.querySelectorAll('section')

window.addEventListener("scroll", function () {
    addActiveClass();
})

addActiveClass();
function addActiveClass() {
    let currentSection;
    for (let i = 0; i < sections.length; i++) {
        if (this.scrollY >= sections[i].offsetTop - 90) {
            currentSection = sections[i].getAttribute('id')
        }

    }
    for (let j = 0; j < navLinks.length; j++) {
        if (navLinks[j].getAttribute('href') == `#${currentSection}`) {
            navLinks[j].classList.add('active')
        }
        else {
            navLinks[j].classList.remove('active')
        }

    }
}

/*==========================================================*/

//dark mode
const themeToggle = document.getElementById('theme-toggle-button');

if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') == 'dark') {
        document.documentElement.classList.add('dark')
    }
    else {
        document.documentElement.classList.remove('dark')
    }
}

themeToggle.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark')
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark')
    }

    else {
        localStorage.setItem('theme', 'light')
    }
})

/*==============================================================*/

//sidenav

document.getElementById('settings-toggle').addEventListener('click', function () {
    document.getElementById('settings-sidebar').classList.toggle('translate-x-full');
    document.getElementById('settings-toggle').classList.toggle('rightshift');
})


//fonts
const fontButtons = document.querySelectorAll('.font-option');

fontButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        let font = btn.dataset.font;
        document.body.classList.remove('font-alexandria', 'font-tajawal', 'font-cairo')
        document.body.classList.add(`font-${font}`)
        localStorage.setItem('savedFont', font)
        fontButtons.forEach(function (b) {
            b.classList.remove('active');
        })
        btn.classList.add('active')
    })
})

let savedFont = localStorage.getItem('savedfont')
if (savedFont) {
    document.body.classList.remove('font-alexandria', 'font-tajawal', 'font-cairo')
    document.body.classList.add(`font-${savedFont}`)
    fontButtons.forEach(function (b) {
        b.classList.remove('active');
        if (b.dataset.font == savedFont) {
            b.classList.add('active')
        }
    })
}

//colors
const colorButtons = document.querySelectorAll('#theme-colors-grid button');
colorButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        let primary = btn.dataset.primary;
        let secondary = btn.dataset.secondary;
        let accent = btn.dataset.accent;
        document.documentElement.style.setProperty('--color-primary', primary)
        document.documentElement.style.setProperty('--color-secondary', secondary)
        document.documentElement.style.setProperty('--color-accent', accent)
        localStorage.setItem('primary', primary)
        localStorage.setItem('secondary', secondary)
        localStorage.setItem('accent', accent)


        colorButtons.forEach(function (b) {
            b.classList.remove('active-color')
        })
        btn.classList.add('active-color')
    })

})

const primarySaved = localStorage.getItem('primary');
const secondarySaved = localStorage.getItem('secondary');
const accentSaved = localStorage.getItem('accent');

if (primarySaved && secondarySaved && accentSaved) {
    document.documentElement.style.setProperty('--color-primary', primarySaved)
    document.documentElement.style.setProperty('--color-secondary', secondarySaved)
    document.documentElement.style.setProperty('--color-accent', accentSaved)

    colorButtons.forEach(function (b) {
        if (b.dataset.primary == primarySaved && b.dataset.secondary == secondarySaved && b.dataset.accent == accentSaved) {
            b.classList.add('active=color')
        }
        else {
            b.classList.remove('active=color')
        }
    })
}

/*==================================================================================*/

//button up
document.getElementById('scroll-to-top').addEventListener('click', function () {
    window.scrollTo({
        top: '0',
        behavior: "smooth"
    })
})

window.addEventListener('scroll', function () {
    showUpBtn()
})
showUpBtn()
function showUpBtn() {
    if (window.scrollY > 200) {
        document.getElementById('scroll-to-top').style.display = 'block'
    }
    else {
        document.getElementById('scroll-to-top').style.display = 'none'
    }
}


/*==================================================================================*/
//portfolio section
const filters = document.querySelectorAll('.portfolio-filter')
const items = document.querySelectorAll('.portfolio-item')

filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
        let filter = btn.dataset.filter;
        items.forEach(function (item) {
            let category = item.dataset.category;
            item.style.display = 'none'
            if (filter == 'all' || category == filter) {
                item.style.display = 'block';
            }
        })
        filters.forEach(function (b) {
            b.classList.remove('active')
        })
        btn.classList.add('active')
    })
})

/*==================================================================================*/
// testinomials section

const cards = document.querySelectorAll('.testimonial-card')
const nextBtn = document.querySelector('#next-testimonial')
const prevBtn = document.querySelector('#prev-testimonial')

function getVisibleCard(){
    if(window.innerWidth>=1024) return 3;
    if(window.innerWidth>=640) return 1;
    else return 1;
}

let currentIndex = 0;
let visibleCard =  getVisibleCard();
let maxIndex = cards.length - visibleCard;
function slideCards() {
    cards[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'start' })
}

nextBtn.addEventListener('click', function () {
    if (currentIndex < maxIndex) {
        currentIndex++;
    }
    else {
        currentIndex = 0;
    }
    slideCards();
})

prevBtn.addEventListener('click', function () {
    if (currentIndex >maxIndex) {
        currentIndex--;
    }
    else {
        currentIndex = maxIndex;
    }
    slideCards();
})

const indicators=document.querySelectorAll('.carousel-indicator');
indicators.forEach(function(btn){
    btn.addEventListener('click',function(){
        currentIndex=btn.dataset.index;
        slideCards();
        indicators.forEach(function(b){
            b.classList.remove('active')
        })
        btn.classList.add('active');
    })
})
