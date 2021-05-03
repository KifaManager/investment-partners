// Body Overflow
// ------------------------ //
const overflow = {
	Add: () => {
		$('body').addClass('overflow');
	},
	Remove: () => {
		$('body').removeClass('overflow');
	},
    Default: () => {
        $('body').addClass('default');
    },
};

function initTeamSliders(){
	new Swiper(".team-slider .swiper-container",{
		lazy:{
			loadPrevNext:!0,
			loadPrevNextAmount:5
		},
		loop:!1,
		slidesPerView: 3,
		spaceBetween:0,
		speed:600,
		pagination:{
			el:".team-slider .swiper-pagination",
			clickable:!0
		},
		navigation:{
			nextEl:".slider-nav .swiper-button-next",
			prevEl:".slider-nav .swiper-button-prev"
		},
		breakpoints:{
			768:{
				slidesPerView: 3
				// slidesPerView: 1
			}
		},
		on:{
            slideChangeTransitionStart:function(){
                // alert('Change')
            },
			slideNextTransitionStart:function(){
                // alert('Next')
				767<$(window).innerWidth()
			},
			// sliderMove:function(){$(".team-slider .swiper-slide-active").addClass("border")},
			// slideResetTransitionEnd:function(){$(".team-slider .swiper-slide-active").removeClass("border")}
		}
	})
}

function initFolderTeamSliders(){
    if($('.folder-nav .box').length >= 2 && $(window).width() <= 991){
        new Swiper(".folder-nav", {
            autoHeight: true,
            slidesPerView: 1,
            pagination:{
                el:".folder-nav .swiper-pagination",
                clickable:!0
            },
        });
    } else {
        $('.folder-nav').filter('.swiper-container-initialized').each(function(){
            this.swiper.destroy();
        })
    }
}

function tooltipFormat(number, decimals, dec_point, thousands_sep) {
    var i, j, kw, kd, km;
    if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2;
    }
    if (dec_point == undefined) {
        dec_point = ',';
    }
    if (thousands_sep == undefined) {
        thousands_sep = '.';
    }
    i = parseInt(number = (+number || 0).toFixed(decimals)) + '';
    if ((j = i.length) > 3) {
        j = j % 3;
    } else {
        j = 0;
    }
    km = j
        ? i.substr(0, j) + thousands_sep
        : '';
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    kd = (decimals
        ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, '0').slice(2)
        : '');
    return km + kw + kd;
}

function loader(){

    let wrapper = document.getElementById('wrapper'),
        loader = document.getElementById('loader'),
        loaderVideo = document.getElementById('loader-video');

    loaderVideo.onended = (event) => {

        loader.classList.add('opacity');

        setTimeout(function () {

            wrapper.classList.add('opacity');
            loader.classList.add('close');
            overflow.Default();

            if($('#folder-video').length > 0){
                let folderVideo = document.getElementById('folder-video');
                folderVideo.play();

                setTimeout(function(){
                    $("video[data-poster]").each(function () {
                        var e = $(this);
                        e.attr("poster", e.attr("data-poster")).removeAttr("data-poster");
                    })
                }, 1000)


            }

            setTimeout(function(){
                $('.header').addClass('animate');
            }, 600);

            setTimeout(function(){
                $('.folder .circles .circle').each(function (index, element) {
                    setTimeout(function(){
                        element.classList.add('animate');
                    }, 400 * index)
                });
            }, 1000);

            setTimeout(function(){
                $('.animation-element').each(function (index, element) {
                    let $this = $(this);
                    setTimeout(function(){
                        element.classList.add('animate');
                        if($this.hasClass('folder-counter')){
                            let thisNumber = $this.find('.counter').attr('data-number')
                            $this.find('.counter').rollNumber({
                                number: thisNumber,
                                speed: 500,
                                fontStyle: {
                                    'font-size': 50,
                                }
                            });
                        }
                    }, 400 * index)
                });
            }, 800);

        }, 300);
    };
}

function showElementsOnScroll(t) {
    $('.fade-up').each(function(){
        $this = $(this);
        if($this.offset().top <= t){
            $(this).addClass('animate')
        }
    });
    var Time = 0;
    $(".fade-up:not(.animate)").each(function() {
        var elementAnimate = $(this);
        if(elementAnimate.offset().top <= t + $(window).height() / 1.1 && !elementAnimate.hasClass('animate')) {
            Time += 100;
            setTimeout(function () {
                elementAnimate.addClass("animate");
            }, Time);
        }
    })

    $(".btn, .btn-play").each(function() {
        var a = $(this);
        a.offset().top <= t + $(window).height() / 1.2 && a.addClass("animate")
    })
}

function showTitleOnScroll(t) {
    var Time = 0;
    $(".title-element").each(function() {
        var elementAnimate = $(this);
        if(elementAnimate.offset().top <= t + $(window).height() / 1.2 && !elementAnimate.hasClass('animate')) {
            Time += 150;
            setTimeout(function () {
                elementAnimate.addClass("animate");
            }, Time);
        }
    })
}

$(document).ready(function(){

    initTeamSliders();
    initFolderTeamSliders();
    showElementsOnScroll($(window).scrollTop());
    showTitleOnScroll($(window).scrollTop());
    $(window).resize(function() {
        setTimeout(function () {
            initFolderTeamSliders();
        }, 10)
    });

    // Select
    //--------------//
    $("select").chosen();
    //--------------//

    // Mask for input tel
    //--------------//
    $("input[type='tel']").mask("+38 999 999 99 99", {
        autoclear: false
    });
    //--------------//

    // Button Sorting
    //--------------//
    $('.btn-sorting').on('click', function(){
        $(this).toggleClass('sorting-asc');
        if(!$(this).hasClass('sorting-asc')){
            $(this).toggleClass('sorting-desc');
            $(this).removeClass('sorting-asc');
        }else{
            $(this).removeClass('sorting-desc');
        }
    });
    //--------------//

	// Header Burger
	// ------------------------ //
	$('.header-burger').click(function(){
		$('.header').toggleClass('open');
		if($('.header').hasClass('open')){
			overflow.Add()
		} else {
			overflow.Remove()
		}
	});
	// ------------------------ //


    $('.form-added .btn-add').on('click', function(){
       $(this).closest('.form-added').addClass('open')
    });

    $('#open-consult').on('click', function() {
        $.fancybox.open($('#popup-consult'), {
            touch: false
        });
    });

    $('#send-consult').on('click', function(){
       $('#popup-consult').addClass('success')
    });

    $('.documnets-year').on('click', function(){
        $(this).closest('.documnets-list').toggleClass('open')
    });


});


$(function() {
    let pageClass = $('#wrapper').attr('class'),
        footerHeight = $('.footer').height();
    switch (pageClass) {
        case 'page_fonds':
            var chart = new Chartist.Line('.ct-chart', {
                labels: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
                series: [
                    [
                        {value: 3125877},
                        {value: 9125877},
                        {value: 12125877},
                        {value: 15125877},
                        {value: 21125877},
                        {value: 24125877},
                        {value: 24525877},
                        {value: 26825877},
                        {value: 27225877},
                        {value: 27125877},
                        {value: 28125877},
                    ],
                ]
            }, {
                lineSmooth: false,
                showArea: true,
                axisY: {
                    onlyInteger: true,
                    low: 3,
                    labelInterpolationFnc: function(value) {
                        let prefix = '',
                            factor = 1
                        if(value >= 1000000000){
                            prefix = 'B';
                            factor = 1000000000;
                        }else if(value >= 1000000){
                            prefix = 'M';
                            factor = 1000000;
                        }else if(value >= 1000){
                            prefix = 'K';
                            factor = 1000;
                        }
                        return new Intl.NumberFormat().format(Math.round(value / factor)) + prefix;
                    }
                },
                fullWidth: true,
                chartPadding: {
                    right: 70,
                    top: 30
                },
                plugins: [
                    Chartist.plugins.tooltip({
                        transformTooltipTextFnc: function(tooltip) {
                            let pf = [2 ,'.', ' '];
                            tooltip = tooltipFormat(tooltip, pf[0], pf[1], pf[2]);
                            if (pf[0] > 0) {
                                tooltip = tooltip.replace(/(0+)$/, '');
                                tooltip = tooltip.replace(/[^0-9]$/, '');
                            }
                            return tooltip;
                        }
                    })
                ]
            }, null);

            chart.on('draw', function(data) {
                if (data.type === 'point') {
                    var circle = new Chartist.Svg('circle', {
                        cx: [data.x],
                        cy: [data.y],
                        r: [8],
                        'ct:value': data.value.y
                    }, 'ct-point');
                    data.element.replace(circle);
                }
            });

            break;
        case 'page_partners':
            $(window).scroll(function (e) {
                if($(window).scrollTop() >= $(document).height() - $(window).height() - footerHeight) {
                    // Ajax
                    // ------------------------ //
                }
            })
            break;
        case 'page_services':
            let servicesPhotoHeight  = $('.services-photo').height();
            $(window).scroll(function (e) {
                if($(window).scrollTop() >= $(document).height() - $(window).height() - footerHeight - servicesPhotoHeight) {
                    // Ajax
                    // ------------------------ //
                }
            })
            break;
    }
});


// Window on scroll
// ------------------------ //
$(window).scroll(function() {
    var e = $(this).scrollTop();
    e > showElementsOnScroll(e);
    e > showTitleOnScroll(e);
});
// ------------------------ //

// Window on load
// ------------------------ //
$(window).on("load", function () {
	setTimeout(function(){
        loader();
	}, 10);
});
// ------------------------ //



// if($(window).width() > 1024){
// 	document.addEventListener('mousemove', parallax);
// 	function parallax(e) {
// 		e.preventDefault();
// 		this.querySelectorAll('.circle').forEach((layer) => {
// 			let speed = layer.getAttribute('data-speed');
// 			layer.style.transform = `translate(${e.clientX * speed / 1000}px, ${e.clientY * speed / 1000}px) `;
// 		})
// 	}
// }