select = e => document.querySelector(e)
selectAll = e => document.querySelectorAll(e)

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
gsap.defaults({ ease: "none" });

    

const stage = select('.stage')

  const productPorfolioSetting = {
    type: 'loop',
    item: 2,
    padding: 40,
    speed: 200,
    interval: 3000,
    autoplay: false,
    gap: 30,
    borderID: 'ipadBoxAr',
    wrapID: 'sliderBoxAr'
}

const initPadBorder = () => {
    const borderBox = document.querySelector('#' + productPorfolioSetting.borderID)
    const slideWidth = document.querySelector('.slideBox').offsetWidth
    borderBox.style.width = slideWidth + 2 * productPorfolioSetting.gap + 5 + 'px'
    const borderBoxHeight = borderBox.offsetHeight
    const sliderWrap = document.querySelector('#' + productPorfolioSetting.wrapID)
    sliderWrap.style.height = borderBoxHeight * 0.88 + 'px'
}



const init3dPortfolioVideo = () => {
    document.querySelectorAll('.slideBox').forEach(element => {
        if (element.classList.contains('is-active')) {
            element.querySelector('.ar_portfolio_box_video video').play()
        } else {
            element.querySelector('.ar_portfolio_box_video video').pause();
            element.querySelector('.ar_portfolio_box_video video').currentTime = 0;
        }
    })
}

const init3dPortfoloi = () => {
    const splade3dPorfolio = new Splide('.splide', {
        type: productPorfolioSetting.type,
        perPage: productPorfolioSetting.item,
        padding: productPorfolioSetting.padding + 'px',
        speed: productPorfolioSetting.speed,
        pagination: false,
        interval: productPorfolioSetting.interval,
        autoplay: productPorfolioSetting.autoplay,
        pauseOnHover: true,
        gap: productPorfolioSetting.gap + 'px',
        focus: 'center',
        easing: 'ease',
        updateOnMove: true
    }).mount();

    splade3dPorfolio.on('moved', () => {
        init3dPortfolioVideo()
    })

    initPadBorder()
    init3dPortfolioVideo()
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

const initMap = () => {
    const pulses = gsap
        .timeline({
            defaults: {
                duration: 0.05,
                autoAlpha: 1,
                scale: 1.5,
                transformOrigin: "center",
                ease: "elastic(2.5, 1)"
            }
        })
        .to("#svgScreenTitle", {}, 0.1)
        .to("#icon1, #text01", {}, 0.2)
        .to("#icon2, #text02", {}, 0.38)
        .to("#icon3, #text03", {}, 0.58)
        .to("#icon4, #text04", {}, 0.78);

    const main = gsap
        .timeline({
            defaults: { duration: 1 },
            scrollTrigger: {
                trigger: "#svg-stage",
                scrub: true,
                start: "top center",
                end: "bottom center"
            }
        })

        .to("#point", { duration: 0.01, autoAlpha: 1 })
        .from(".theLine", { drawSVG: 0 }, 0)
        .to(
            "#point",
            {
                motionPath: {
                    path: ".theLine",
                    align: ".theLine",
                    alignOrigin: [0.5, 0.5]
                }
            },
            0
        )
        .add(pulses, 0);


    const afterMap = gsap.fromTo('#afterMap',
        { backgroundColor: "#fff" },
        {
            backgroundColor: "#ff5821",
            scrollTrigger: {
                trigger: '#afterMap',
                scrub: true,
                start: "top bottom",
                end: ".5px",
                snap: {
                    snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
                    duration: 1,
                    ease: 'power4.inOut'
                }
            },
            ease: 'none'
        })
}

   const initSeoTab = () => {

      const hiddenTab = () => {
        document.querySelectorAll('.lp_seo_text_content_box').forEach( i => i.classList.remove('open') )
      }

      const tabControl = document.querySelectorAll('.lp_seo_text_controller_box_btn .btn')

      tabControl.forEach( item => {
        item.addEventListener( 'click', () => {
          hiddenTab()
          document.querySelector('.lp_seo_text_content_box[data-box="'+ item.getAttribute('data-box') +'"]').classList.add('open')
          document.querySelector('.lp_seo_text_controller').scrollIntoView({
            behavior: 'smooth',
        });
          
        } )
       
      } )



      document.querySelectorAll('.closeSEOText').forEach( item => {
        item.addEventListener( 'click', () => {
        document.querySelector('#lp_seo_text').scrollIntoView({
            behavior: 'smooth'
        });
        hiddenTab()
     })
      } )

      
    }



const init = () => {
    gsap.set(stage, { autoAlpha: 1 })
    initIndastry()
    init3dPortfoloi()
    initLpHomeStartScreen()
    initSolution()
    initMap()
    initSeoTab()
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("loader").remove()
    init();
});