    !(function ($) {
    "use strict";   

    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $("#header").outerHeight() - 21;
    if (window.matchMedia("(max-width: 991px)").matches) {
        scrolltoOffset += 20;
    }
    $(document).on("click", ".nav-menu a, .mobile-nav a, .scrollto", function (e) {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();

                var scrollto = target.offset().top - scrolltoOffset;

                if ($(this).attr("href") == "#header") {
                    scrollto = 0;
                }

                $("html, body").animate(
                    {
                        scrollTop: scrollto,
                    },
                    1500,
                    "easeInOutExpo"
                );

                if ($(this).parents(".nav-menu, .mobile-nav").length) {
                    $(".nav-menu .active, .mobile-nav .active").removeClass("active");
                    $(this).closest("li").addClass("active");
                }

                if ($("body").hasClass("mobile-nav-active")) {
                    $("body").removeClass("mobile-nav-active");
                    $(".mobile-nav-toggle i").toggleClass("fa fa-align-justify icofont-close");
                    $(".mobile-nav-overly").fadeOut();
                }
                return false;
            }
        }
    });

   
    
    // Toggle .header-scrolled class to #header when page is scrolled
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $("#header").addClass("header-scrolled");
            $("#topbar").addClass("topbar-scrolled");
        } else {
            $("#header").removeClass("header-scrolled");
            $("#topbar").removeClass("topbar-scrolled");
        }
    });

    if ($(window).scrollTop() > 100) {
        $("#header").addClass("header-scrolled");
        $("#topbar").addClass("topbar-scrolled");
    }

    

      

     

    function manageMobileNavMenu() {
        // Mobile Navigation
        if ($(".nav-menu").length) {
            var $mobile_nav = $(".nav-menu").clone().prop({
                class: "mobile-nav d-lg-none",
            });
            $("body").append($mobile_nav);
            $("body").prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fa fa-align-justify"></i></button>');
            $("body").append('<div class="mobile-nav-overly"></div>');

            $(document).on("click", ".mobile-nav-toggle", function (e) {
                $("body").toggleClass("mobile-nav-active");
                $(".mobile-nav-toggle i").toggleClass("fa fa-align-justify fa fa-close icofont-close");
                $(".mobile-nav-overly").toggle();
            });

            $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
                e.preventDefault();
                $(this).next().slideToggle(300);
                $(this).parent().toggleClass("active");
            });

            $(document).click(function (e) {
                var container = $(".mobile-nav, .mobile-nav-toggle");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    if ($("body").hasClass("mobile-nav-active")) {
                        $("body").removeClass("mobile-nav-active");
                        $(".mobile-nav-toggle i").toggleClass("fa fa-align-justify fa fa-close icofont-close");
                        $(".mobile-nav-overly").fadeOut();
                    }
                }
            });
        } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
            $(".mobile-nav, .mobile-nav-toggle").hide();
        }
    }

    
})(jQuery);   
    