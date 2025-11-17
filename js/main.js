$(document).ready(function(){
        $('.welcome-section__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            speed: 500,
            dots: false,
            arrows: true,
            cssEase: 'linear',
            centerMode: true,
            variableWidth: false,
            centerPadding: 0,
            responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true
                }
            }
        ]
        });
        $('.welcome-section__slider').on('init', function(){
        $('.slick-cloned [tabindex], .slick-cloned button, .slick-cloned a, .slick-cloned input, .slick-cloned select, .slick-cloned textarea')
          .attr('tabindex', '-1')
          .attr('aria-hidden', 'true');
    });
});

