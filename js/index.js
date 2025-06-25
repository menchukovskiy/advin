
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

const initOdometer = () => {
    createOdometer(subscribersOdometer1, 180);
    createOdometer(subscribersOdometer2, 35);
    createOdometer(subscribersOdometer3, 1000000);
}





//Animation Site


gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(ScrollSmoother)
gsap.registerPlugin(SplitText);

select = e => document.querySelector(e)
selectAll = e => document.querySelectorAll(e)

const stage = select('.stage')
const slides = selectAll(".slide_screen");
const portfolioSection = select('#home_portfolio')
const portfolioFilter = select('.portfolio_category')
const portfolioBox = selectAll('.portfolio_box')





const initHeader = () => {

    let tl = gsap.timeline({delay: 0.5});
    tl.from('#logo', {
        x: -40,
        opacity: 0,
        duration: 2,
        ease: 'power4'
    })
    .from('#top_bar_right',{
        x: 40,
        opacity: 0,
        duration: 2,
        ease: 'power4'
    }, 0)
    .from('.bottom_bar',{
        y: 40,
        opacity: 0,
        duration: 2,
        ease: 'power4',
        
    },0)
    .from('#odometer_list',{
        ease: 'power4',
        y:10,
        duration:1,
        opacity: 0,
        onStart: initOdometer
    },0)

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
        },{
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

        .from(slide.querySelectorAll('.slide_screen_about_text'),{
            ease: "power4", 
            y: "+=5vh",
            opacity: 0,
            duration: 1,
        },0)

        .from(slide.querySelectorAll('.slide_screen_about_btn'),{
            ease: "power4", 
            x: "-=5vw",
            opacity: 0,
            duration: 1,
        },0.1)


        
        
        
	});
    
}

const initClientBox = () => {
    gsap.fromTo('#home_clients_video-box-wrap', {
        y: "-30vh"
    },{
        y: "30vh",
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

const initTeamBox = () => {
    /*gsap.fromTo('#home_team_bg_wrap', {
        y: "-10vh"
    },{
        y: "10vh",
        scrollTrigger: {
            trigger: '#home_team',
            scrub: true,
            start: "top bottom", // position of trigger meets the scroller position
            snap: {
                snapTo: 0.01, // 0.5 'cause the scroll animation range is 200vh for parallax effect
                duration: 1,
                ease: 'power4.inOut'
            }
        },
        ease: 'none'
    })*/
}

const initVideoBox = () => {
    gsap.fromTo('#home_video-box-wrap', {
        y: "-30vh"
    },{
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
            start: "15% 50%", // position of trigger meets the scroller position
        }
    })

    tl.from(box.querySelectorAll('.title_text'), {
        ease: "power4",
        //y: "+=5vh",
        scale: .8,
        opacity: 0,
        duration: 1,
    })

    .from(box.querySelectorAll('.about_text'),{
        ease: "power4", 
        y: "+=5vh",
        opacity: 0,
        duration: 1,
    },0)

    .from(box.querySelectorAll('#home_video-box-content-btn'),{
        ease: "power4", 
        y: "+=5vw",
        opacity: 0,
        duration: 1,
    },0.1)


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
    
   
    if( window.scrollY + 50  >= portfolioSection.offsetTop && ( portfolioSection.clientHeight + portfolioSection.offsetTop - window.innerHeight*0.25) > window.scrollY ){
        portfolioFilter.classList.add("open")
    } else {
        portfolioFilter.classList.remove("open")
    }
}



//Ф-ия инициализация анимации
const init = () => {
    gsap.set( stage, { autoAlpha: 1 })
    initHeader()
    initParallax()
    initSlides()
    initVideoBox()
    initPortfolio()
    initClientBox()
    initTeamBox()
}


//Инициализация анимации
window.onload = () => {
	init();
}

window.addEventListener("scroll", initPortfolioFilter )





$(function(e){
	"use strict";

    $('body').on( 'click', '#show_site_menu', function(e){
        e.preventDefault();
        
        $('#menu_box').removeClass('hidden');
        
    } )

    $('body').on( 'click', '.site-menu__close', function(e){
        e.preventDefault();
        $('#menu_box').addClass('hidden');
    } )

    $('body').on( 'click', '[data-action="show_left_sidebar"]', function(e){
        e.preventDefault()
        $('#left_sidebar').addClass('in-view')
    } )

    $('body').on( 'click', '.left_sidebar__close', function(e){
        e.preventDefault()
        $('#left_sidebar').addClass('hide')
        setTimeout( () => {
            $('#left_sidebar').removeClass('hide')
            $('#left_sidebar').removeClass('in-view')
        }, 800 )
    } )


   


    $('.clients_logo_list').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows:false,
        dots:false,
        pauseOnFocus:false,
        pauseOnHover:false,
      });

})




