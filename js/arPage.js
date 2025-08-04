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


const init = () => {
    gsap.set(stage, { autoAlpha: 1 })
    initIndastry()
    initArPortfoloi()
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("loader").remove()
    init();
});