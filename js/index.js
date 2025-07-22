
select = e => document.querySelector(e)
selectAll = e => document.querySelectorAll(e)

const homePortfolioSettings = {
    showItems: 3,
    itemsEdge: 60,
    sliderDuration: 1200,
    spacing: 0,
    loop: true,
    autoplay: true
}

const homeTeamSettings = {
    itemsEdge: '5rem',
    sliderDuration: 1200,
    spacing: 0,
    loop: 'loop',
    autoplay: false
}


const initHomeSliderPortfolio = () => {
    const homePortfolioSloder = new Sliderm('#home_portfolio_list_slider', {
        arrow: false,
        pagination: false,
        grouping: false,
        loop: homePortfolioSettings.loop,
        preview: true,
        columns: homePortfolioSettings.showItems,
        duration: homePortfolioSettings.sliderDuration,
        spacing: homePortfolioSettings.spacing,
        autoplay: homePortfolioSettings.autoplay,
        align: 'center',
        _preview: {
            edge: homePortfolioSettings.itemsEdge,
        }
    });

    document.querySelectorAll('#home_portfolio_list .sliderm__slide').forEach(element => {

        if (element.getAttribute('data-order') > homePortfolioSettings.showItems) {
            element.classList.add('op5');
        }

        if (element.classList.contains('sliderm__slide--clone')) {
            element.classList.add('op5');
        }
    });




    const countPorfolioSlide = homePortfolioSloder.getItemCount();


    homePortfolioSloder.on('slide.start', (s) => {

        let endViewSlide = 0




        endViewSlide = s.getPosition() + homePortfolioSettings.showItems + 1;



        if (endViewSlide > countPorfolioSlide) {
            endViewSlide -= countPorfolioSlide;
        }



        document.querySelectorAll('#home_portfolio_list .sliderm__slide').forEach(element => {
            element.classList.remove('op5');
        });

        document.querySelectorAll('#home_portfolio_list .sliderm__slide[data-order="' + s.getPosition() + '"]').forEach(element => {
            element.classList.add('op5');
        });

        document.querySelectorAll('#home_portfolio_list .sliderm__slide[data-order="' + endViewSlide + '"]').forEach(element => {
            element.classList.add('op5');
        });



    });

    const next = document.getElementById('home_portfolio_list_slider_next');
    const nextSlide = homePortfolioSloder.adaptEvent(next);
    nextSlide.on('click', () => {
        homePortfolioSloder.slideTo('>');
    });

    const back = document.getElementById('home_portfolio_list_slider_prev');
    const backSlide = homePortfolioSloder.adaptEvent(back);
    backSlide.on('click', () => {
        homePortfolioSloder.slideTo('<');

        let prevSlide = 0
        const position = homePortfolioSloder.getPosition()

        document.querySelectorAll('#home_portfolio_list .sliderm__slide').forEach(element => {
            element.classList.remove('op5');
        });


        if (position === 0) {
            prevSlide = countPorfolioSlide - 1
        }

        if (position > 0) {
            prevSlide = position - 1
            if (prevSlide === 0) {
                prevSlide = countPorfolioSlide
            }
        }


        let endViewSlide = 0

        endViewSlide = position + homePortfolioSettings.showItems;

        if (endViewSlide > countPorfolioSlide) {
            endViewSlide -= countPorfolioSlide;
        }

        document.querySelectorAll('#home_portfolio_list .sliderm__slide[data-order="' + endViewSlide + '"]').forEach(element => {
            element.classList.add('op5');
        });

        document.querySelectorAll('#home_portfolio_list .sliderm__slide[data-order="' + prevSlide + '"]').forEach(element => {
            element.classList.add('op5');
        });

    });

}


const initHomeSliderTeam = () => {
    new Splide('.splide', {
        type: homeTeamSettings.loop,
        padding: homeTeamSettings.itemsEdge,
        speed: homeTeamSettings.sliderDuration,
        pagination: false
    }).mount();

    document.querySelectorAll('#home_team_slider .splide__slide').forEach(element => {

        element.addEventListener('mouseenter', () => {
            element.querySelector('.home_team_slider_content_cover_video').play()
        });

        element.addEventListener('mouseleave', () => {
            element.querySelector('.home_team_slider_content_cover_video').pause();
            element.querySelector('.home_team_slider_content_cover_video').currentTime = 0;
        });
    });

}


const createOdometer = (el, value) => {
    const odometer = new Odometer({
        el: el,
        value: 0,
        duration: 5000
    });

    let hasRun = false;

    const options = {
        threshold: [0, 0.5],
        duration: 5000
    };

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (!hasRun) {
                    odometer.update(value);
                    hasRun = true;
                }
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
};

const subscribersOdometer1 = document.querySelector("#od_1");

const subscribersOdometer2 = document.querySelector("#od_2");

const subscribersOdometer3 = document.querySelector("#od_3");



const subscribersOdometer5 = document.querySelector("#od_5");

const subscribersOdometer6 = document.querySelector("#od_6");

const subscribersOdometer7 = document.querySelector("#od_7");

const start = 1;
const frameAnimationDuration = 200
let headerNumberAnimationProgress = 0
let missNumberAnimationProgress = 0

const headerNumberAnimation = () => {
    window.requestAnimationFrame(headerNumberAnimation);

    headerNumberAnimationProgress += start;


    if (headerNumberAnimationProgress > frameAnimationDuration) {
        subscribersOdometer1.classList.add('play')
    } else {
        subscribersOdometer3.classList.add('play')
    }

    if (headerNumberAnimationProgress > frameAnimationDuration * 2) {
        subscribersOdometer2.classList.add('play')
    }

    if (headerNumberAnimationProgress > frameAnimationDuration * 3) {
        subscribersOdometer1.classList.remove('play')
        subscribersOdometer2.classList.remove('play')
        subscribersOdometer3.classList.remove('play')
        headerNumberAnimationProgress = 0
    }

}

const missNumberAnimation = () => {
    window.requestAnimationFrame(missNumberAnimation);

    missNumberAnimationProgress += start;


    if (missNumberAnimationProgress > frameAnimationDuration) {
        subscribersOdometer6.classList.add('play')
    } else {
        subscribersOdometer5.classList.add('play')
    }

    if (missNumberAnimationProgress > frameAnimationDuration * 2) {
        subscribersOdometer7.classList.add('play')
    }

    if (missNumberAnimationProgress > frameAnimationDuration * 3) {
        subscribersOdometer5.classList.remove('play')
        subscribersOdometer6.classList.remove('play')
        subscribersOdometer7.classList.remove('play')
        missNumberAnimationProgress = 0
    }

}



const initOdometer = () => {
    /*createOdometer(subscribersOdometer1, 250);
    createOdometer(subscribersOdometer2, 120);
    createOdometer(subscribersOdometer3, 8);
    createOdometer(subscribersOdometer4, 15);
    */
}


const initOdometer2 = () => {
    /*
    createOdometer(subscribersOdometer5, 30);
    createOdometer(subscribersOdometer6, 7);
    createOdometer(subscribersOdometer7, 85);
    */
}






//Animation Site


gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(ScrollSmoother)
gsap.registerPlugin(SplitText);



const stage = select('.stage')
const slides = selectAll(".slide_screen");
const portfolioSection = select('#home_portfolio')
const portfolioFilter = select('.portfolio_category')
const portfolioBox = selectAll('.portfolio_box')
const homeScreenText = select('#home_screen_text')





const initHeader = () => {

    let tl = gsap.timeline({ delay: 0.5 });
    tl.from('#logo', {
        x: -40,
        opacity: 0,
        duration: 2,
        ease: 'power4'
    })
        .from('#top_bar_right', {
            x: 40,
            opacity: 0,
            duration: 2,
            ease: 'power4'
        }, 0)
        .from('.bottom_bar', {
            y: 40,
            opacity: 0,
            duration: 2,
            ease: 'power4',

        }, 0)
        .from('#odometer_list', {
            ease: 'power4',
            y: 10,
            duration: 1,
            opacity: 0,
            onStart: initOdometer
        }, 0)

    let stl = gsap.timeline({
        scrollTrigger: {
            trigger: '#home_screen',
            scrub: 3,
            start: "+=100", // position of trigger meets the scroller position
            end: "-=100"
        }
    });

    stl.to('.header_title', {
        x: 400,
        scale: 2,
        ease: 'power4.in',
        duration: 3,

    })

}

const initParallax = () => {

    slides.forEach((slide, i) => {
        let imageWrappers = slide.querySelectorAll('.slide_screen_cover_image_wrap');

        gsap.fromTo(imageWrappers, {
            y: "-30vh"
        }, {
            y: "30vh",
            scrollTrigger: {
                trigger: slide,
                scrub: true,
                start: "top bottom", // position of trigger meets the scroller position
                snap: {
                    snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
                    duration: 1,
                    ease: 'power4.inOut'
                }
            },
            ease: 'none'
        })
    });
}

const initSlides = () => {
    slides.forEach((slide, i) => {

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: "20% 50%", // position of trigger meets the scroller position
            }
        });

        tl.from(slide.querySelectorAll('.slide_screen_about_title'), {
            ease: "power4",
            //y: "+=5vh",
            scale: .8,
            opacity: 0,
            duration: 1,
        })

            .from(slide.querySelectorAll('.slide_screen_about_text'), {
                ease: "power4",
                y: "+=5vh",
                opacity: 0,
                duration: 1,
            }, 0)

            .from(slide.querySelectorAll('.slide_screen_about_btn'), {
                ease: "power4",
                x: "-=5vw",
                opacity: 0,
                duration: 1,
            }, 0.1)





    });

}

const initClientBox = () => {

    gsap.fromTo('#home_clients_video-box-wrap', {
        y: "-5vh"
    }, {
        y: "5vh",
        scrollTrigger: {
            trigger: '#home_clients_video-box',
            scrub: true,
            start: "top bottom", // position of trigger meets the scroller position
            snap: {
                snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
                duration: 1,
                ease: 'power4.inOut'
            }
        },
        ease: 'none'
    })

}


const initVideoBox = () => {
    gsap.fromTo('#home_video-box-wrap', {
        y: "-30vh"
    }, {
        y: "30vh",
        scrollTrigger: {
            trigger: '#home_video-box',
            scrub: true,
            start: "top bottom", // position of trigger meets the scroller position
            snap: {
                snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
                duration: 1,
                ease: 'power4.inOut'
            }
        },
        ease: 'none'
    })

    let box = select('#home_video-box-content')

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: box,
            start: "5% 20%", // position of trigger meets the scroller position
        }
    })

    tl.from(box.querySelectorAll('.title_text'), {
        ease: "power4",
        //y: "+=5vh",
        scale: .8,
        opacity: 0,
        duration: 1,
    })

    tl.from(box.querySelectorAll('.odometer_box'), {
        ease: "power4",
        scale: .8,
        opacity: 0,
        onComplete: missNumberAnimation
    }, 0)

        .from(box.querySelectorAll('.about_text'), {
            ease: "power4",
            y: "+=5vh",
            opacity: 0,
            duration: 1,
        }, 0)



        .from(box.querySelectorAll('#home_video-box-content-btn'), {
            ease: "power4",
            y: "+=5vw",
            opacity: 0,
            duration: 1,
        }, 0.1)




}

const initPortfolio = () => {
    /*
        gsap.fromTo('#home_portfolio_bg_wrap', {
            y: "-10vh"
        },{
            y: "10vh",
            scrollTrigger: {
                trigger: '#home_portfolio',
                scrub: true,
                start: "top bottom", // position of trigger meets the scroller position
                snap: {
                    snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
                    duration: 1,
                    ease: 'power4.inOut'
                }
            },
            ease: 'none'
        })
    */

    portfolioBox.forEach((box, i) => {

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#home_portfolio',
                start: "0% 50%", // position of trigger meets the scroller position
            }
        });

        tl.from(box, {
            ease: "power4",
            //y: "+=5vh",
            scale: .8,
            opacity: 0,
            duration: 1,
        })


    });

}

const initPortfolioFilter = () => {

    /*
     if( window.scrollY + 50  >= portfolioSection.offsetTop && ( portfolioSection.clientHeight + portfolioSection.offsetTop - window.innerHeight*0.25) > window.scrollY ){
         portfolioFilter.classList.add("open")
     } else {
         portfolioFilter.classList.remove("open")
     }
         */
}



//Ф-ия инициализация анимации
const init = () => {
    gsap.set(stage, { autoAlpha: 1 })
    initHeader()
    initParallax()
    initSlides()
    initVideoBox()
    initClientBox()
    initHomeSliderPortfolio()
    initHomeSliderTeam()
}



/*






window.addEventListener("scroll", initPortfolioFilter )
*/





//window.requestAnimationFrame(step);


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("loader").remove()
    init();
    setTimeout(() => {
        $('#dec_el__001').removeClass('show')
        $('#dec_el__001').addClass('pumpAnimation')
        headerNumberAnimation()

    }, 1500)




    //const headerIntervalID = window.setInterval( animateHomeHeader , 6000);
});

/*
window.addEventListener("mousemove", function(e){
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;  
    homeScreenText.style.transform = 'translate(-' + x * 25 + 'px, -' + y * 25 + 'px)';
} )
*/




$(function (e) {
    "use strict";

    $('body').on('click', '#show_site_menu', function (e) {
        e.preventDefault();
        $('#menu_box').removeClass('hidden');
    })

    $('body').on('click', '.site-menu__close', function (e) {
        e.preventDefault();
        $('#menu_box').addClass('hidden');
    })

    $('body').on('click', '[data-action="show_left_sidebar"]', function (e) {
        e.preventDefault()
        $('#left_sidebar').addClass('in-view')
    })

    $('body').on('click', '.left_sidebar__close', function (e) {
        e.preventDefault()
        $('#left_sidebar').addClass('hide')
        $('#left_sidebar').removeClass('in-view')
        setTimeout(() => {
            $('#left_sidebar').removeClass('hide')

        }, 800)
    })





    $('.clients_logo_list').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: false,
        pauseOnFocus: false,
        pauseOnHover: false,
    });

})





const myVideo = document.getElementById('testVideo');

myVideo.addEventListener('mouseenter', () => {
    myVideo.play();
});

myVideo.addEventListener('mouseleave', () => {
    myVideo.pause();
    myVideo.currentTime = 0; // Optional: Resets the video to the beginning on mouseout
});


