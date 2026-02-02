// Sanitize input to prevent XSS
function sanitizeInput(input) {
    return input.replace(/[<>]/g, "");
}

// FORM LOGIC
const form = document.getElementById("feedbackForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = sanitizeInput(document.getElementById("name").value.trim());
        let email = sanitizeInput(document.getElementById("email").value.trim());
        let message = sanitizeInput(document.getElementById("message").value.trim());

        if (name.length < 3) {
            alert("Name must be at least 3 characters");
            return;
        }

        if (!email.includes("@")) {
            alert("Invalid email");
            return;
        }

        if (message.length < 5) {
            alert("Message too short");
            return;
        }

        let feedback = { name, email, message };

        let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        feedbacks.push(feedback);
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

        document.getElementById("successMsg").innerText =
            "Feedback submitted successfully";

        form.reset();
    });
}

// DISPLAY LOGIC
const feedbackList = document.getElementById("feedbackList");

if (feedbackList) {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    let currentPage = 1;
    const itemsPerPage = 3;

    function showFeedback() {
        feedbackList.innerHTML = "";

        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;

        let pageItems = feedbacks.slice(start, end);

        pageItems.forEach((fb, index) => {
            let actualIndex = start + index;

            let div = document.createElement("div");
            div.className = "feedback-item";

            div.innerHTML = `
                <strong>${fb.name}</strong><br>
                <small>${fb.email}</small><br>
                <p>${fb.message}</p>
                <button class="btn btn-sm btn-danger mt-2"
                    onclick="deleteFeedback(${actualIndex})">
                    Delete
                </button>
            `;

            feedbackList.appendChild(div);
        });

        document.getElementById("pageInfo").innerText =
            `Page ${currentPage} of ${Math.ceil(feedbacks.length / itemsPerPage)}`;
    }

    window.deleteFeedback = function (index) {
        if (confirm("Are you sure you want to delete this feedback?")) {
            feedbacks.splice(index, 1);
            localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

            if (currentPage > Math.ceil(feedbacks.length / itemsPerPage)) {
                currentPage--;
            }

            showFeedback();
        }
    };

    document.getElementById("prevBtn").onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            showFeedback();
        }
    };

    document.getElementById("nextBtn").onclick = () => {
        if (currentPage < Math.ceil(feedbacks.length / itemsPerPage)) {
            currentPage++;
            showFeedback();
        }
    };

    showFeedback();
}

