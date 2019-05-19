$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 1)
            $('.header').addClass('scrolled');
        else
            $('.header').removeClass('scrolled');
    })

    /**
     * Initialize wow js
     */
    let wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function (box) {
            // the callback is fired every time an animation is started the argument that is
            // passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    wow.init();

    $('.userpwd, .userpwdReg').on('click', function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        let field = $($(this).attr("toggle"));
        if (field.attr("type") === "password") {
            field.attr("type", "text");
        } else {
            field.attr("type", "password");
        }
    });

    // let mySwiper = new Swiper ('.swiper-container',{
    //     direction:'horizontal',
    //     loop: true
    // })
    //
    // mySwiper.init();

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("icon-top").style.display = "block";
        } else {
            document.getElementById("icon-top").style.display = "none";
        }
    }

    function topFunction() {
        $('html, body').animate({
            scrollTop: 0
        });
    }
})

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});