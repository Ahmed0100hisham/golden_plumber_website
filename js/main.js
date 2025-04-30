document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById("preloader");
    const header = document.querySelector("header");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector("nav");
    const overlay = document.querySelector(".overlay");
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("main section[id]");
    const logoImg = document.getElementById("logo-img");
    const contactForm = document.getElementById("contactForm");
    let lastScrollTop = 0;

    // --- Preloader --- 
    window.addEventListener("load", () => {
        if (preloader) {
            document.body.classList.add("loaded");
        }
    });

    // --- Header Scroll Effect --- 
    window.addEventListener("scroll", () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Scroll Down
            header.classList.add("hide");
        } else {
            // Scroll Up
            header.classList.remove("hide");
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // --- Mobile Menu Toggle --- 
    if (mobileMenuBtn && nav && overlay) {
        mobileMenuBtn.addEventListener("click", () => {
            nav.classList.toggle("active");
            overlay.classList.toggle("active");
            mobileMenuBtn.querySelector("i").classList.toggle("fa-bars");
            mobileMenuBtn.querySelector("i").classList.toggle("fa-times");
            document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "auto";
        });

        overlay.addEventListener("click", () => {
            nav.classList.remove("active");
            overlay.classList.remove("active");
            mobileMenuBtn.querySelector("i").classList.remove("fa-times");
            mobileMenuBtn.querySelector("i").classList.add("fa-bars");
            document.body.style.overflow = "auto";
        });
    }

    // --- Smooth Scrolling & Close Mobile Menu on Link Click --- 
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            
            // Close mobile menu if open
            if (nav.classList.contains("active")) {
                nav.classList.remove("active");
                overlay.classList.remove("active");
                mobileMenuBtn.querySelector("i").classList.remove("fa-times");
                mobileMenuBtn.querySelector("i").classList.add("fa-bars");
                document.body.style.overflow = "auto";
            }

            // Smooth scroll for internal links
            if (targetId && targetId.startsWith("#") && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 10; // Adjust offset as needed

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            } else if (targetId === "#") { // Scroll to top for home link
                 e.preventDefault();
                 window.scrollTo({
                     top: 0,
                     behavior: "smooth"
                 });
            }
        });
    });

    // --- Active Nav Link Highlighting on Scroll --- 
    function updateActiveLink() {
        let currentSection = "";
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50; // Adjust offset
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });
        
        // If no section is active (e.g., at the very top or bottom), default to home or contact
        if (currentSection === "" && scrollPosition < sections[0].offsetTop - header.offsetHeight - 50) {
             currentSection = "home";
        } else if (currentSection === "" && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) {
             currentSection = "contact"; // Or the ID of the last section
        }

        navLinks.forEach(link => {
            link.classList.remove("active-link");
            const linkHref = link.getAttribute("href");
            // Handle both #section and # cases
            if ((linkHref === `#${currentSection}`) || (currentSection === "home" && linkHref === "#")) {
                link.classList.add("active-link");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink(); // Initial check on load

    // --- Logo Image Source Change on Scroll (Optional) ---
    // Example: Change to a smaller/different logo when header is scrolled
    // if (logoImg) {
    //     const originalSrc = logoImg.src;
    //     const scrolledSrc = "images/logo-scrolled.png"; // Path to scrolled logo
    //     window.addEventListener("scroll", () => {
    //         if (header.classList.contains("scrolled")) {
    //             logoImg.src = scrolledSrc;
    //         } else {
    //             logoImg.src = originalSrc;
    //         }
    //     });
    // }

    // --- WhatsApp Contact Form Submission --- 
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission

            // --- Configuration ---
            // !!! IMPORTANT: Replace 'YOUR_WHATSAPP_NUMBER' with the actual WhatsApp number, including the country code, without '+' or spaces. 
            // Example: For +965 12345678, use '96512345678'
            const whatsappNumber = '96551375332'; 
            // --- End Configuration ---

            // Get form data
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const serviceSelect = document.getElementById('service');
            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const areaSelect = document.getElementById('area');
            const area = areaSelect.options[areaSelect.selectedIndex].text;
            const message = document.getElementById('message').value.trim();

            // Enhanced validation (combining previous checks)
            if (!name || !phone || !serviceSelect.value || !areaSelect.value || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة.');
                return;
            }
            
            // Phone number validation (basic example)
            const phoneRegex = /^\+?[0-9\s-()]{8,}$/;
            if (!phoneRegex.test(phone)) {
                 alert("يرجى إدخال رقم هاتف صحيح.");
                 return;
            }
            
            // Format the message for WhatsApp
            let whatsappMsg = `*طلب خدمة جديد من السباك الذهبي*\n\n`;
            whatsappMsg += `*الاسم:* ${name}\n`;
            whatsappMsg += `*الهاتف:* ${phone}\n`;
            if (email) {
                whatsappMsg += `*البريد الإلكتروني:* ${email}\n`;
            }
            whatsappMsg += `*الخدمة المطلوبة:* ${service}\n`;
            whatsappMsg += `*المنطقة:* ${area}\n`;
            whatsappMsg += `*تفاصيل المشكلة:*\n${message}\n`;

            // Encode the message for the URL
            const encodedMsg = encodeURIComponent(whatsappMsg);

            // Construct the WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

            // Open WhatsApp link in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: Clear the form after submission or show a success message
            // contactForm.reset();
            alert('تم تحويلك إلى واتساب لإرسال طلبك!');
        });
    }

});




// ===== Scroll to Top Button Functionality =====
const scrollToTopBtn = document.getElementById("scroll-to-top");

if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

