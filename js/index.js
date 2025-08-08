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
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: false,
        pauseOnFocus: false,
        pauseOnHover: false,
    });

})


