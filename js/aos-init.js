AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 100
});

// Reinitialize AOS on window resize
$(window).on('resize', function() {
    AOS.refresh();
});