$(document).ready(function() {
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
        }
    });

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Counter animation for stats
    $('.counter').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    // Form submission handling
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        
        // Show loading state
        $('#submitBtn').html('<span class="spinner-border spinner-border-sm me-2"></span>Sending...');
        $('#submitBtn').prop('disabled', true);
        
        // Simulate API call
        setTimeout(function() {
            $('#submitBtn').html('Message Sent!');
            $('#submitBtn').removeClass('btn-primary').addClass('btn-success');
            
            // Reset form
            $('#contactForm')[0].reset();
            
            // Show success message
            $('#successAlert').removeClass('d-none');
            
            // Reset button after 3 seconds
            setTimeout(function() {
                $('#submitBtn').html('Send Message');
                $('#submitBtn').prop('disabled', false);
                $('#submitBtn').removeClass('btn-success').addClass('btn-primary');
                $('#successAlert').addClass('d-none');
            }, 3000);
        }, 1500);
    });

    // Testimonial carousel auto-play
    $('#testimonialCarousel').carousel({
        interval: 5000
    });

    // Calculator functionality
    $('#profitCalculatorModal .btn-primary').on('click', function() {
        var positionSize = parseFloat($('#profitCalculatorModal input[type="number"]').eq(0).val());
        var entryPrice = parseFloat($('#profitCalculatorModal input[type="number"]').eq(1).val());
        var exitPrice = parseFloat($('#profitCalculatorModal input[type="number"]').eq(2).val());
        
        var pips = (exitPrice - entryPrice) * 10000; // Assuming 4 decimal places
        var pipValue = positionSize * 0.0001;
        var profit = pips * pipValue;
        
        $('#profitCalculatorModal .alert').html(`
            <h6 class="fw-bold">Calculation Result:</h6>
            <p class="mb-1">Profit/Loss: <span class="fw-bold">$${profit.toFixed(2)}</span></p>
            <p class="mb-1">Pip Value: <span class="fw-bold">$${pipValue.toFixed(2)}</span></p>
            <p class="mb-0">Pips Gained: <span class="fw-bold">${pips.toFixed(1)} pips</span></p>
        `);
    });

    // Risk calculator functionality
    $('#riskCalculatorModal .btn-primary').on('click', function() {
        var accountBalance = parseFloat($('#riskCalculatorModal input[type="number"]').eq(0).val());
        var riskPercentage = parseFloat($('#riskCalculatorModal input[type="number"]').eq(1).val());
        var stopLoss = parseFloat($('#riskCalculatorModal input[type="number"]').eq(2).val());
        
        var riskAmount = accountBalance * (riskPercentage / 100);
        var pipValue = riskAmount / stopLoss;
        var positionSize = pipValue * 10000;
        
        $('#riskCalculatorModal .alert').html(`
            <h6 class="fw-bold">Calculation Result:</h6>
            <p class="mb-1">Risk Amount: <span class="fw-bold">$${riskAmount.toFixed(2)}</span></p>
            <p class="mb-1">Position Size: <span class="fw-bold">${positionSize.toFixed(0)} units</span></p>
            <p class="mb-0">Pip Value: <span class="fw-bold">$${pipValue.toFixed(2)}</span></p>
        `);
    });

    // Active navigation highlighting
    var currentPage = window.location.pathname.split('/').pop();
    $('.navbar-nav .nav-link').each(function() {
        var linkPage = $(this).attr('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
});