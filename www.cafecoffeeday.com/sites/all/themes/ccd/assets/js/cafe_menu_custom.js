var winW = $(window).width();
$(document).ready(function() {
    /*
     // %%%%%%%% banner owl %%%%%%%%
    var bannerOwl = $('.landing-slider');
    var bannerOwl_settings = {
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeout:6000,
        nav:false,
        dots:true,
        smartSpeed:1200,
    }
    bannerOwl.owlCarousel(bannerOwl_settings);
    if (winW < 767) {
        // %%%%%%%% mobile-gif slider %%%%%%%%
        var mobGifSlie = $('.mob-gif-slider');
        var mobGifSlie_settings = {
            items:1,
            loop:true,
            margin:10,
            stagePadding:30,
            nav:false,
            dots:true,
            smartSpeed:1200,
        }
        mobGifSlie.owlCarousel(mobGifSlie_settings);
    }*/
    // %%%%% sticky navigation %%%%%
    function stickyCommonNav() {
        var sticky = new Waypoint.Sticky({
            element: $('.main-header')[0],
        });
    }
    // sticky nav
    stickyCommonNav();
    // global variables
    // %%%%%%%% category owl %%%%%%%%
    var catSlide = $('.cafe-cat-init');
    var catSlide_settings = {
        items: 6,
        nav: false,
        dots: true,
        mouseDrag: false,
        smartSpeed: 800,
        responsive: {
            0: {
                items: 2,
                stagePadding: 50,
                autoWidth: true,
                // autoWidth:true
            },
            420: {
                items: 2,
                stagePadding: 50,
                autoWidth: true
            },
            600: {
                items: 4,
                stagePadding: 50
                // autoWidth:true
            },
            990: {
                items: 6,
                autoWidth: false,
                stagePadding: 0
            }
        }
    }
    catSlide.owlCarousel(catSlide_settings);
    // %%%%%%%% highlighting category %%%%%%%%
    $(".cafe-categories .each-category a").click(function() {
        $(".cafe-categories .each-category a").removeClass("active-category");
        $(this).addClass("active-category");
    });

    $(".productCatFilter[data-termid = 13517]").addClass("active-category");
    $('.refine-search-wrapper').css('display', 'none');
    productCategory.push(13517);
    runajax();
});


/* start carrers.tpl file script */

$(document).ready(function() {
    $('.cafe-cat-init .each-category:eq(0) a').addClass('active-category');
});

/* end carrers.tpl file script */