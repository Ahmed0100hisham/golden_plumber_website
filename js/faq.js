document.addEventListener("DOMContentLoaded", function() {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(button => {
        button.addEventListener("click", () => {
            const answer = button.nextElementSibling;
            const isActive = button.classList.contains("active");

            // Close all other answers
            faqQuestions.forEach(btn => {
                if (btn !== button) {
                    btn.classList.remove("active");
                    btn.nextElementSibling.style.maxHeight = null;
                    btn.nextElementSibling.style.padding = "0 25px"; // Adjust padding based on CSS
                }
            });

            // Toggle current answer
            if (isActive) {
                button.classList.remove("active");
                answer.style.maxHeight = null;
                answer.style.padding = "0 25px"; // Adjust padding based on CSS
            } else {
                button.classList.add("active");
                // Set padding before maxHeight for smoother transition
                answer.style.padding = "0 25px 20px 25px"; // Adjust padding based on CSS
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});

