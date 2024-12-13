(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
		setTimeout(() => { markActiveMenu(); }, 1000);
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
	
	var includeHTML = function() {
		var z, i, elmnt, file, xhttp;
		  /* Loop through a collection of all HTML elements: */
		  z = document.getElementsByTagName("*");
		  for (i = 0; i < z.length; i++) {
		    elmnt = z[i];
		    /*search for elements with a certain atrribute:*/
		    file = elmnt.getAttribute("w3-include-html");
		    if (file) {
		      /* Make an HTTP request using the attribute value as the file name: */
		      xhttp = new XMLHttpRequest();
		      xhttp.onreadystatechange = function() {
		        if (this.readyState == 4) {
		          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
		          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
		          /* Remove the attribute, and call this function once more: */
		          elmnt.removeAttribute("w3-include-html");
		          includeHTML();
		        }
		      }
		      xhttp.open("GET", file, true);
		      xhttp.send();
		      /* Exit the function: */
		      return;
		    }
		  }
	};
	
	var markActiveMenu = function() {
		var url = window.location.pathname,
		urlRegExp = new RegExp(url.replace(/\/$/, '') + "$");  
	    $('.nav-link').each(function () {
	        if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
	            $(this).addClass('active');
	        }
	    });
	};
	
	let captchaAnswer = 0;
	
	var generateCaptcha = function() {
		// Generate CAPTCHA
	    const num1 = Math.floor(Math.random() * 10) + 1;
	    const num2 = Math.floor(Math.random() * 10) + 1;
	    captchaAnswer = num1 + num2;
	
	    $('#captcha').text(`${num1} + ${num2}`);
	}
	
	$(document).ready(function () {
		includeHTML();
		
		generateCaptcha();
		
        $('#contactForm').on('submit', function (e) {
			e.preventDefault();
			$('#statusMessage').html(``).hide();
			// CAPTCHA validation
            const userCaptchaAnswer = parseInt($('#captchaInput').val());
            if (userCaptchaAnswer !== captchaAnswer) {
                $('#statusMessage').html(`<div class="alert alert-danger">Please complete the CAPTCHA.</div>`).fadeIn();
                return;
            }
			this.submit();
			$('#statusMessage').html('<div class="alert alert-success">Submitting your response...please wait!</div>').css('color', 'blue').fadeIn();
			$('#spinner').removeClass('bg-white');
			$('#spinner').addClass('show bg-trans');
			// Trigger a delayed success message (simulating success)
	        $('#hidden_iframe').on('load', function () {
	            $('#statusMessage').html('<div class="alert alert-success">Hurray, message sent successfully!</div>').fadeIn();
				$('#contactForm')[0].reset();
				generateCaptcha();
				$('#spinner').removeClass('show bg-trans');
	        });
        });
		
		
		$('#quoteForm').on('submit', function (e) {
            e.preventDefault();
			$('#statusMessage').html(``).hide();
			// CAPTCHA validation
            const userCaptchaAnswer = parseInt($('#captchaInput').val());
            if (userCaptchaAnswer !== captchaAnswer) {
                $('#statusMessage').html(`<div class="alert alert-danger">Please complete the CAPTCHA.</div>`).fadeIn();
                return;
            }
			this.submit();
			$('#statusMessage').html('<div class="alert alert-success">Submitting your request...please wait!</div>').css('color', 'blue').fadeIn();
			$('#spinner').removeClass('bg-white');
			$('#spinner').addClass('show bg-trans');
			// Trigger a delayed success message (simulating success)
	        $('#hidden_iframe').on('load', function () {
	            $('#statusMessage').html('<div class="alert alert-success">Hurray, quotation request sent successfully!').fadeIn();
				$('#quoteForm')[0].reset();
				generateCaptcha();
				$('#spinner').removeClass('show bg-trans');
	        });
        });
    });
	
})(jQuery);