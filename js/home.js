
(() => {

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);

    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }

    closeNavBtn.addEventListener("click", hideNavMenu);

    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("link-item")) {
            if (event.target.hash !== "") {
                event.preventDefault();
                const hash = event.target.hash;

                // deactivate existing acttive section 

                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                // activate new section 

                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                // changing nav colors

                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                if (navMenu.classList.contains("open")) {
                    // activating new navigation menu link 

                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    hideNavMenu();
                }
                else {
                    let navItems = navMenu.querySelectorAll(".link-item");

                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                // add # hash to url 
                window.location.hash = hash;
            }
        }
    })
})();




// __________________________________________________________________________________________________
(() => {
    const aboutSection = document.querySelector(".about-section");
    const tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
            const targett = event.target.getAttribute("data-target");

            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            event.target.classList.add("active", "outer-shadow");

            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(targett).classList.add("active");
        }
    })
})();

function bodyScrollingToggle() {
    document.body.classList.toggle("stop-scrolling");
}

// ________________________________________Portfolio_________________________________



(() => {
    const filterContainer = document.querySelector(".portfolio-filter");
    const portfolioItemsContainer = document.querySelector(".portfolio-items");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const popup = document.querySelector(".portfolio-popup");
    const prevBtn = popup.querySelector(".pp-prev");
    const nextBtn = popup.querySelector(".pp-next");
    const closeBtn = popup.querySelector(".pp-close");
    const projectDetailsContainer = popup.querySelector(".pp-details");
    const projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {

            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            event.target.classList.add("active", "outer-shadow");

            const targett = event.target.getAttribute("data-target");

            portfolioItems.forEach((item) => {
                const dc = item.getAttribute("data-category").split(" ");
                if (targett === dc[0] || targett === dc[1] || targett === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // console.log(portfolioItem);
            // console.log(portfolioItems);
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");

            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
        // popup.classList.add("ani");
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        // console.log(screenshots[slideIndex]);
        const popupImg = popup.querySelector(".pp-img");

        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;

        popupImg.onload = () => {
            popup.querySelector(".pp-loader").classList.remove("active");
        }

        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }

    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        popupSlideshow();
    })
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        }
        else {
            slideIndex--;
        }
        popupSlideshow();
    })

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetails() {
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;

        popup.querySelector(".pp-project-details").innerHTML = details;

        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        console.log(title)
        popup.querySelector(".pp-title h2").innerHTML = title;

        const category = portfolioItems[itemIndex].getAttribute("data-category").split(" ");
        popup.querySelector(".pp-project-category").innerHTML = category[0].split("-").join(" ");


    }

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
        }
        else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }
})();

// ____________________________________________TestimonialSlider_____________________________________



(() => {
    const sliderContainer = document.querySelector(".testi-slider-container"),
        slides = sliderContainer.querySelectorAll(".testi-item"),
        slideWidth = sliderContainer.offsetWidth,
        prevBtn = document.querySelector(".testi-slider-nav .prev"),
        nextBtn = document.querySelector(".testi-slider-nav .next"),
        activeSlide = sliderContainer.querySelector(".testi-item.active");

    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    })

    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () => {
        if (slideIndex === slides.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        slider();
    })
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = slides.length - 1;
        }
        else {
            slideIndex--;
        }
        slider();
    })

    function slider() {
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");

        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();
})();


// ______________________________________________HidingSections_______________________________________


(() => {
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })
})();
// _________________________________________________________________________________
const load = () => {
    document.querySelector(".preloader").classList.add("fade-out");

    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 600)
}


// ______________________________________GSAP____________________________________


gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    const home = gsap.timeline({
        smoothChildTiming: "true"
    });

    home
        .from(
            '#home', {
            duration: 1,
            opacity: 0,
        }
        )
        .from(
            '.header', {
            duration: 0.5,
            opacity: 0,
            y: -100
        }
        )
        .from(
            '.home-text h2 span', {
            duration: 0.5,
            opacity: 0,
            stagger: 0.1
        }
        )
        .from(
            '.home-text h1', {
            duration: 0.5,
            opacity: 0,
            y: -10
        }
        )
        .from(
            '.home-text p', {
            duration: 0.5,
            opacity: 0,
            y: 10
        }, 2.9
        )
        .from(
            '.abt', {
            duration: 0.8,
            opacity: 0,
            className: '-=btn-1 '
        }
        )
        .from(
            '.home-img .img-box', {
            duration: 0.8,
            opacity: 0,
            className: '-=img-box '
        }, 0.5
        )
        .to(
            '.home-img .img-box img', {
            duration: 0.8,
            opacity: 1,
            className: '+=outer-shadow '
        }, 2
        )
        .from(
            '.effect', {
            duration: 1,
            opacity: 0,
            stagger: 0.1
        }
        )
        .from(
            '.s-icon', {
            duration: 0.1,
            opacity: 0,
            x: 40,
            yoyo: "true",
            yoyoEase: "power2.in"
        }
        )


})




const aboutAni = document.querySelector(".about-ani");
const aboutSecAni = document.querySelector(".abt");

aboutAni.addEventListener("click", () => {

    const about = gsap.timeline({
        yoyo: true,
        yoyoEase: "power2.in"
    })

    about
        .from(
            "#about", {
            duration: 0.5,
            opacity: 0
        }
        )
        .from(
            ".abtt", {
            duration: 0.5,
            opacity: 0,
            y: -30
        }
        )
        .from(
            ".abt-img", {
            duration: 0.5,
            opacity: 0,
            x: -30,
        }
        )
        .from(
            ".about-info p", {
            duration: 0.5,
            opacity: 0,
            y: -30
        }, 1
        )
        .from(
            ".about-info a", {
            duration: 0.1,
            opacity: 0,
            y: 30,
        }, 1
        )
        .from(
            ".social-links a", {
            duration: 0.1,
            opacity: 0,
            stagger: 0.1
        }
        )


    const aboutscrl = gsap.timeline({
        scrollTrigger: {
            trigger: '.gsap-scrl',
            start: 'top center+=40%',
            end: 'bottom bottom',
            yoyo: true,
            yoyoEase: "power2.in"
            // markers: true

        }
    })

    aboutscrl
        .from(
            ".about-tabs span", {
            duration: 0.1,
            opacity: 0,
            // y: 50,
            stagger: 0.1
        }
        )
        .from(
            ".gsap-scrl .skill-item", {
            delay: 0.7,
            duration: 0.3,
            opacity: 0,
            y: 60,
            stagger: 0.1
        }
        )
        .from(
            ".gsap-scrl .skill-item .progress-bar", {
            duration: 1,
            width: 0
        }, 2.3
        )
        .from(
            ".gsap-scrl .skill-item .progress-bar span", {
            duration: 1,
            opacity: 0
        }
        )

})

aboutSecAni.addEventListener("click", () => {

    const about = gsap.timeline({

    })

    about
        .from(
            "#about", {
            duration: 0.5,
            opacity: 0
        }
        )
        .from(
            ".abtt", {
            duration: 0.5,
            opacity: 0,
            y: -30
        }
        )
        .from(
            ".abt-img", {
            duration: 0.5,
            opacity: 0,
            x: -30,
        }
        )
        .from(
            ".about-info p", {
            duration: 0.5,
            opacity: 0,
            y: -30
        }, 1
        )
        .from(
            ".about-info a", {
            duration: 0.1,
            opacity: 0,
            y: 30,
        }, 1
        )
        .from(
            ".social-links a", {
            duration: 0.1,
            opacity: 0,
            stagger: 0.1
        }
        )

    const aboutSecscrl = gsap.timeline({
        scrollTrigger: {
            trigger: '.gsap-scrl',
            start: 'top center+=40%',
            end: 'bottom bottom',
            yoyo: true,
            yoyoEase: "power2.in"
            // markers: true

        }
    })

    aboutSecscrl
        .from(
            ".about-tabs span", {
            duration: 0.1,
            opacity: 0,
            // y: 50,
            stagger: 0.1
        }
        )
        .from(
            ".gsap-scrl .skill-item", {
            delay: 0.7,
            duration: 0.3,
            opacity: 0,
            y: 60,
            stagger: 0.1
        }
        )
        .from(
            ".gsap-scrl .skill-item .progress-bar", {
            duration: 1,
            width: 0
        }, 2.3
        )
        .from(
            ".gsap-scrl .skill-item .progress-bar span", {
            duration: 1,
            opacity: 0
        }
        )

})


const serviceAni = document.querySelector(".service-ani");

serviceAni.addEventListener("click", () => {
    const service = gsap.timeline();

    service
        .from(
            ".service-section", {
            duration: 1,
            opacity: 0
        }
        )
        .from(
            ".serv", {
            duration: 0.5,
            opacity: 0,
            y: -30
        }
        )
        .from(
            ".service-item", {
            duration: 0.5,
            opacity: 0,
            y: 30,
            stagger: 0.1
        }
        )
        .from(
            ".service-item-inner h3", {
            duration: 0.5,
            opacity: 0,
            y: 30,
            stagger: 0.1
        }, 2
        )
        .from(
            ".service-item-inner p", {
            duration: 0.1,
            opacity: 0,
            stagger: 0.1
        }, 1.9
        )
})



const portAni = document.querySelector(".port-ani");

portAni.addEventListener("click", () => {
    const portfolio = gsap.timeline();

    portfolio
        .from(
            ".portfolio-section", {
            duration: 1,
            opacity: 0
        }
        )
        .from(
            ".porttitle", {
            duration: 0.5,
            opacity: 0,
            y: -30
        }
        )
        .from(
            ".filter-item", {
            duration: 0.1,
            opacity: 0,
            // y: 50,
            stagger: 0.1
        }
        )
        .from(
            ".portfolio-item", {
            duration: 0.5,
            opacity: 0,
            y: 30,
            stagger: 0.1
        }
        )
        .from(
            ".portfolio-item-title", {
            duration: 0.1,
            opacity: 0,
            stagger: 0.1
        }
        )
})

const testiAni = document.querySelector(".testi-ani");

testiAni.addEventListener("click", () => {
    const testi = gsap.timeline();

    testi
        .from(
            ".testimonial-section", {
            duration: 0.5,
            opacity: 0
        }
        )
        .from(
            ".testititle", {
            duration: 0.5,
            opacity: 0,
            y: -30
        }
        )
        .from(
            ".testi-slider", {
            duration: 0.5,
            opacity: 0,
            y: 50,
            stagger: 0.1
        }
        )
        .from(
            ".testi-item span", {
            duration: 0.5,
            opacity: 0,
            y: 30
        }
        )
        .from(
            ".testi-slider-nav span", {
            duration: 0.1,
            opacity: 0,
            y: -30,
        },1
        )
})

const contactAni = document.querySelector(".contact-ani");

contactAni.addEventListener("click", () => {
    const contact = gsap.timeline();

    contact
        .from(
            ".contact-section", {
            duration: 0.5,
            opacity: 0
        }
        )
        .from(
            ".contactitle", {
            duration: 0.5,
            opacity: 0,
            y: -30
        }
        )
        .from(
            ".contact-item", {
            duration: 0.5,
            opacity: 0,
            y: 50,
            stagger: 0.1
        }
        )
        .from(
            ".inputs", {
            duration: 0.7,
            opacity: 0,
            x: 90,
            // stagger: 0.1
        }
        )
        .from(
            ".textarea", {
            duration: 0.7,
            opacity: 0,
            x: -90,
            // stagger: 0.1
        },1.5
        )
        .from(
            ".submit-btn", {
            duration: 0.7,
            opacity: 0,
            y: 50,
            // stagger: 0.1
        },1.9
        )
})


const contactsecAni = document.querySelector(".hiresec");

contactsecAni.addEventListener("click", () => {
    const contactsec = gsap.timeline();

    contactsec
        .from(
            ".contact-section", {
            duration: 0.5,
            opacity: 0
        }
        )
        .from(
            ".contactitle", {
            duration: 0.5,
            opacity: 0,
            y: -30
        }
        )
        .from(
            ".contact-item", {
            duration: 0.5,
            opacity: 0,
            y: 50,
            stagger: 0.1
        }
        )
        .from(
            ".inputs", {
            duration: 0.7,
            opacity: 0,
            x: 90,
            // stagger: 0.1
        }
        )
        .from(
            ".textarea", {
            duration: 0.7,
            opacity: 0,
            x: -90,
            // stagger: 0.1
        },1.5
        )
        .from(
            ".submit-btn", {
            duration: 0.7,
            opacity: 0,
            y: 50,
            // stagger: 0.1
        },1.9
        )
})

