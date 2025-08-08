select = e => document.querySelector(e)
selectAll = e => document.querySelectorAll(e)

const stage = select('.stage')

const arPorfolioSetting = {
    type: 'loop',
    item: 4,
    padding: 40,
    speed: 200,
    interval: 3000,
    autoplay: false,
    gap: 10,
    borderID: 'phoneBoxAr',
    wrapID: 'sliderBoxAr'
}

const initPhoneBorder = () => {
    const borderBox = document.querySelector('#' + arPorfolioSetting.borderID)
    const slideWidth = document.querySelector('.slideBox').offsetWidth
    borderBox.style.width = slideWidth + 2 * arPorfolioSetting.gap + 5 + 'px'
    const borderBoxHeight = borderBox.offsetHeight
    const sliderWrap = document.querySelector('#' + arPorfolioSetting.wrapID)
    sliderWrap.style.height = borderBoxHeight * 0.88 + 'px'
}

const initArPortfolioVideo = () => {
    document.querySelectorAll('.slideBox').forEach(element => {
        if (element.classList.contains('is-active')) {
            element.querySelector('.ar_portfolio_box_video video').play()
        } else {
            element.querySelector('.ar_portfolio_box_video video').pause();
            element.querySelector('.ar_portfolio_box_video video').currentTime = 0;
        }
    })
}

const initArPortfoloi = () => {
    const spladeArPorfolio = new Splide('.splide', {
        type: arPorfolioSetting.type,
        perPage: arPorfolioSetting.item,
        padding: arPorfolioSetting.padding + 'px',
        speed: arPorfolioSetting.speed,
        pagination: false,
        interval: arPorfolioSetting.interval,
        autoplay: arPorfolioSetting.autoplay,
        pauseOnHover: true,
        gap: arPorfolioSetting.gap + 'px',
        focus: 'center',
        easing: 'ease',
        updateOnMove: true
    }).mount();

    spladeArPorfolio.on('moved', () => {
        initArPortfolioVideo()
    })

    initPhoneBorder()
    initArPortfolioVideo()
}

const initIndastry = () => {
    const nextBtn = document.querySelector('#home_indastry .next');
    const prevBtn = document.querySelector('#home_indastry .prev');
    const carousel = document.querySelector('#home_indastry .carousel');
    const list = document.querySelector('#home_indastry .list');
    const item = document.querySelector(' #home_indastry.item');

    let timeRunning = 5000;
    let timeAutoNext = 7000;

    list.querySelectorAll('.carousel .list .item').forEach(item => {
        item.addEventListener('click', () => {
            let sliderItemsDom = list.querySelectorAll('.carousel .list .item');

            list.insertBefore(item, sliderItemsDom[1])
            //list.appendChild(sliderItemsDom[0]);
            carousel.classList.add('next');

            runTimeOut = setTimeout(() => {
                carousel.classList.remove('next');
                carousel.classList.remove('prev');
            }, timeRunning)

        });
    })
    nextBtn.onclick = function () {
        showSlider('next');
    }

    prevBtn.onclick = function () {
        showSlider('prev');
    }

    let runTimeOut;

    let runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);


    function showSlider(type) {
        let sliderItemsDom = list.querySelectorAll('.carousel .list .item');



        if (type === 'next') {
            list.appendChild(sliderItemsDom[0]);
            carousel.classList.add('next');
        } else {
            list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            carousel.classList.add('prev');
        }

        clearTimeout(runTimeOut);

        runTimeOut = setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
        }, timeRunning)

        clearTimeout(runNextAuto);

        runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext)


    }
}

const initLpHomeStartScreen = () => {
    const headerWrapper = document.querySelectorAll('.header_title .letters');
    const headerWrapperSecond = document.querySelector('.header_secondary_title .letters');

    headerWrapper.forEach(item => {
        item.innerHTML = item.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    })

    anime.timeline()
        .add({
            targets: '.header_title .letter',
            rotateY: [-90, 0],
            duration: 10000,
            delay: 500,
            //delay: (el, i) => 45 * i
        })

    anime.timeline()
        .add({
            targets: '.header_secondary_title, .lp_start_screen_btn',
            translateX: [-40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            //delay: 500,
            delay: (el, i) => 500 + 30 * i
        })

    anime.timeline()
        .add({
            targets: '.lp_start_screen_media',
            translateX: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            //delay: 500,
            delay: (el, i) => 500 + 30 * i
        })

    VANTA.DOTS({
        el: "#decoration",
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x202020,
        color2: 0x2ab3,
        backgroundColor: 0xffffff,
        spacing: 28.00,
        showLines: false
    })







}

const initSolution = () => {
    const tabButton = document.querySelectorAll('.tabButton')
    const tabContent = document.querySelectorAll('.tabContent')

    const resetTab = () => {
        tabButton.forEach(item => item.classList.remove('active'))
        tabContent.forEach(item => item.classList.remove('active'))
    }



    tabButton.forEach((element, key) => {
        if (!key) {
            element.classList.add('active');
            tabContent[0].classList.add('active');
        }

        element.addEventListener('click', () => {
            console.log()
            resetTab()
            element.classList.add('active');
            tabContent[key].classList.add('active');

        });
    });




}


const init = () => {
    gsap.set(stage, { autoAlpha: 1 })
    initIndastry()
    initArPortfoloi()
    initLpHomeStartScreen()
    initSolution()
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("loader").remove()
    init();
});