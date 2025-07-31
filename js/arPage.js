select = e => document.querySelector(e)
selectAll = e => document.querySelectorAll(e)

const initHomeIndastry = () => {
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
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("loader").remove()
    init();
});