// =====================================================
// LOGIN
// =====================================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const error =
        document.getElementById("loginError");


    if (username === "admin" && password === "admin123") {

        document
            .getElementById("loginPage")
            .classList.add("hidden");

        document
            .getElementById("app")
            .classList.remove("hidden");

        error.textContent = "";

    } else {

        error.textContent =
            "Invalid username or password.";

    }

});


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    document
        .getElementById("app")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

    document
        .getElementById("username")
        .value = "";

    document
        .getElementById("password")
        .value = "";

    document
        .getElementById("profileMenu")
        .classList.remove("show");
}


// =====================================================
// PAGE NAVIGATION
// =====================================================

function showPage(pageId, clickedButton = null) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function (page) {

        page.classList.remove("active-page");

    });


    const selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.add("active-page");

    }


    // Update sidebar active state

    const menuItems =
        document.querySelectorAll(".menu-item");


    menuItems.forEach(function (item) {

        item.classList.remove("active");

    });


    if (clickedButton) {

        clickedButton.classList.add("active");

    }


    // Page titles

    const titles = {

        dashboard: [
            "Dashboard",
            "Overview of your vehicle inspection system"
        ],

        inspection: [
            "Vehicle Inspection",
            "Upload and analyze vehicle images or videos"
        ],

        detection: [
            "AI Detection",
            "AI-powered vehicle damage analysis"
        ],

        reports: [
            "Reports",
            "Vehicle inspection history"
        ],

        admin: [
            "Admin Panel",
            "System administration and configuration"
        ],

        profile: [
            "Profile",
            "Administrator account information"
        ],

        settings: [
            "Settings",
            "Manage application preferences"
        ]

    };


    if (titles[pageId]) {

        document
            .getElementById("pageTitle")
            .textContent = titles[pageId][0];

        document
            .getElementById("pageSubtitle")
            .textContent = titles[pageId][1];

    }

}


// =====================================================
// PROFILE MENU
// =====================================================

function toggleProfileMenu() {

    const menu =
        document.getElementById("profileMenu");

    menu.classList.toggle("show");
}


// Close profile menu when clicking outside

document.addEventListener("click", function (event) {

    const wrapper =
        document.querySelector(".profile-wrapper");

    const menu =
        document.getElementById("profileMenu");


    if (
        wrapper &&
        menu &&
        !wrapper.contains(event.target)
    ) {

        menu.classList.remove("show");

    }

});


// =====================================================
// PROFILE PAGE
// =====================================================

function showProfile() {

    showPage("profile");

    document
        .getElementById("profileMenu")
        .classList.remove("show");

}


// =====================================================
// SETTINGS PAGE
// =====================================================

function showSettings() {

    showPage("settings");

    document
        .getElementById("profileMenu")
        .classList.remove("show");

}


// =====================================================
// FILE PREVIEW
// =====================================================

const vehicleFile =
    document.getElementById("vehicleFile");


vehicleFile.addEventListener("change", function () {

    const file = this.files[0];

    const preview =
        document.getElementById("preview");


    preview.innerHTML = "";


    if (!file) {

        return;

    }


    const fileURL =
        URL.createObjectURL(file);


    // IMAGE

    if (file.type.startsWith("image/")) {

        const image =
            document.createElement("img");

        image.src = fileURL;

        image.alt =
            "Vehicle Preview";

        preview.appendChild(image);

    }


    // VIDEO

    else if (file.type.startsWith("video/")) {

        const video =
            document.createElement("video");

        video.src = fileURL;

        video.controls = true;

        preview.appendChild(video);

    }

});


// =====================================================
// VEHICLE ANALYSIS
// =====================================================

function analyzeVehicle() {

    const fileInput =
        document.getElementById("vehicleFile");

    const result =
        document.getElementById("inspectionResult");

    const badge =
        document.getElementById("resultBadge");


    if (!fileInput.files.length) {

        result.innerHTML = `

            <div class="result-placeholder">

                <div class="large-icon">
                    ⚠
                </div>

                <h3>
                    No vehicle selected
                </h3>

                <p>
                    Please upload a vehicle image
                    or video first.
                </p>

            </div>

        `;

        return;

    }


    const file =
        fileInput.files[0];


    badge.textContent =
        "Uploaded";

    badge.className =
        "result-badge success-badge";


    result.innerHTML = `

        <div class="result-placeholder">

            <div class="large-icon">
                🤖
            </div>

            <h3>
                Vehicle Uploaded Successfully
            </h3>

            <p>
                File: <strong>${file.name}</strong>
            </p>

            <p>
                YOLOv8s damage detection will
                be connected next.
            </p>

        </div>

    `;


    // Temporary dashboard update

    document
        .getElementById("totalInspections")
        .textContent = "1";


    document
        .getElementById("recentDetection")
        .innerHTML = `

            <div>

                <strong>
                    ${file.name}
                </strong>

                <p>
                    Waiting for YOLOv8s damage analysis.
                </p>

            </div>

        `;

}

