// =====================================================
// AUTOGUARD AI - COMPLETE SCRIPT
// Frontend → FastAPI → Roboflow YOLO Model
// =====================================================


// =====================================================
// FASTAPI BACKEND URL
// =====================================================

const API_URL = "http://127.0.0.1:8000";


// =====================================================
// GLOBAL DATA
// =====================================================

let inspectionHistory = [];


// =====================================================
// LOGIN
// =====================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username")?.value.trim();

        const password =
            document.getElementById("password")?.value.trim();

        const error =
            document.getElementById("loginError");

        if (username === "admin" && password === "admin123") {

            const loginPage =
                document.getElementById("loginPage");

            const app =
                document.getElementById("app");

            if (loginPage) {
                loginPage.classList.add("hidden");
            }

            if (app) {
                app.classList.remove("hidden");
            }

            if (error) {
                error.textContent = "";
            }

        } else {

            if (error) {
                error.textContent =
                    "Invalid username or password.";
            }

        }

    });

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    const app =
        document.getElementById("app");

    const loginPage =
        document.getElementById("loginPage");

    if (app) {
        app.classList.add("hidden");
    }

    if (loginPage) {
        loginPage.classList.remove("hidden");
    }

    const username =
        document.getElementById("username");

    const password =
        document.getElementById("password");

    if (username) {
        username.value = "";
    }

    if (password) {
        password.value = "";
    }

    const profileMenu =
        document.getElementById("profileMenu");

    if (profileMenu) {
        profileMenu.classList.remove("show");
    }

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


    // Sidebar active state

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

        const pageTitle =
            document.getElementById("pageTitle");

        const pageSubtitle =
            document.getElementById("pageSubtitle");


        if (pageTitle) {

            pageTitle.textContent =
                titles[pageId][0];

        }


        if (pageSubtitle) {

            pageSubtitle.textContent =
                titles[pageId][1];

        }

    }

}


// =====================================================
// PROFILE MENU
// =====================================================

function toggleProfileMenu() {

    const menu =
        document.getElementById("profileMenu");

    if (menu) {

        menu.classList.toggle("show");

    }

}


// =====================================================
// CLOSE PROFILE MENU WHEN CLICKING OUTSIDE
// =====================================================

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

    const menu =
        document.getElementById("profileMenu");

    if (menu) {

        menu.classList.remove("show");

    }

}


// =====================================================
// SETTINGS PAGE
// =====================================================

function showSettings() {

    showPage("settings");

    const menu =
        document.getElementById("profileMenu");

    if (menu) {

        menu.classList.remove("show");

    }

}


// =====================================================
// FILE PREVIEW
// =====================================================

const vehicleFile =
    document.getElementById("vehicleFile");


if (vehicleFile) {

    vehicleFile.addEventListener("change", function () {

        const file = this.files[0];

        const preview =
            document.getElementById("preview");


        if (!preview) {
            return;
        }


        preview.innerHTML = "";


        if (!file) {
            return;
        }


        const fileURL =
            URL.createObjectURL(file);


        // =================================================
        // IMAGE PREVIEW
        // =================================================

        if (file.type.startsWith("image/")) {

            const image =
                document.createElement("img");

            image.src = fileURL;

            image.alt =
                "Vehicle Preview";

            image.style.maxWidth = "100%";

            image.style.height = "auto";

            image.style.display = "block";

            preview.appendChild(image);

        }


        // =================================================
        // VIDEO PREVIEW
        // =================================================

        else if (file.type.startsWith("video/")) {

            const video =
                document.createElement("video");

            video.src = fileURL;

            video.controls = true;

            video.style.maxWidth = "100%";

            video.style.height = "auto";

            preview.appendChild(video);

        }

    });

}


// =====================================================
// VEHICLE ANALYSIS
// =====================================================

async function analyzeVehicle() {

    const fileInput =
        document.getElementById("vehicleFile");

    const result =
        document.getElementById("inspectionResult");

    const badge =
        document.getElementById("resultBadge");


    // =================================================
    // CHECK ELEMENTS
    // =================================================

    if (!fileInput || !result) {

        console.error(
            "vehicleFile or inspectionResult element not found."
        );

        return;
    }


    // =================================================
    // CHECK FILE
    // =================================================

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
                    Please upload a vehicle image first.
                </p>

            </div>

        `;

        if (badge) {

            badge.textContent =
                "Waiting";

        }

        return;
    }


    const file =
        fileInput.files[0];


    // =================================================
    // IMAGE ONLY
    // =================================================

    if (!file.type.startsWith("image/")) {

        result.innerHTML = `

            <div class="result-placeholder">

                <div class="large-icon">
                    ⚠
                </div>

                <h3>
                    Image required
                </h3>

                <p>
                    Please upload a vehicle image
                    for AI damage detection.
                </p>

            </div>

        `;

        return;
    }


    // =================================================
    // ANALYZING STATUS
    // =================================================

    if (badge) {

        badge.textContent =
            "Analyzing...";

        badge.className =
            "result-badge pending";

    }


    result.innerHTML = `

        <div class="result-placeholder">

            <div class="large-icon">
                🤖
            </div>

            <h3>
                AI Analysis in Progress...
            </h3>

            <p>
                Sending image to Roboflow.
            </p>

        </div>

    `;


    try {

        // =================================================
        // SEND IMAGE TO FASTAPI
        // =================================================

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );


        const response =
            await fetch(
                `${API_URL}/predict`,
                {
                    method: "POST",
                    body: formData
                }
            );


        // =================================================
        // READ RESPONSE
        // =================================================

        const data =
            await response.json();


        console.log(
            "FastAPI response:",
            data
        );


        // =================================================
        // CHECK ERROR
        // =================================================

        if (!response.ok) {

            throw new Error(
                data.error ||
                `Server returned ${response.status}`
            );

        }


        if (data.error) {

            throw new Error(
                data.error
            );

        }


        // =================================================
        // ROBOFLOW RESULT
        // =================================================

        const predictionData =
            data.prediction;


        if (
            !predictionData ||
            typeof predictionData !== "object"
        ) {

            throw new Error(
                "Invalid prediction response from FastAPI."
            );

        }


        let predictions =
            predictionData.predictions;


        // =================================================
        // IMPORTANT:
        // MAKE SURE predictions IS AN ARRAY
        // =================================================

        if (!Array.isArray(predictions)) {

            console.error(
                "Invalid predictions:",
                predictions
            );

            predictions = [];

        }


        console.log(
            "Predictions:",
            predictions
        );


        // =================================================
        // DRAW BOUNDING BOXES
        // =================================================

        drawDetectionBoxes(
            file,
            predictions
        );


        // =================================================
        // NO DAMAGE
        // =================================================

        if (predictions.length === 0) {

            if (badge) {

                badge.textContent =
                    "Normal";

                badge.className =
                    "result-badge success-badge";

            }


            result.innerHTML = `

                <div class="result-success">

                    <div class="large-icon">
                        ✓
                    </div>

                    <h3>
                        No Damage Detected
                    </h3>

                    <p>
                        The AI model did not detect
                        any visible vehicle damage.
                    </p>

                    <p>
                        File:
                        <strong>
                            ${escapeHTML(file.name)}
                        </strong>
                    </p>

                </div>

            `;


            // Dashboard

            updateDashboard(
                file,
                predictions
            );


            // Report

            addReport(
                file,
                predictions
            );


            return;

        }


        // =================================================
        // DAMAGE DETECTED
        // =================================================

        if (badge) {

            badge.textContent =
                "Damage Detected";

            badge.className =
                "result-badge danger-badge";

        }


        let detectionHTML = "";


        predictions.forEach(
            function (prediction, index) {

                const className =
                    prediction.class ||
                    "Unknown";


                const confidence =
                    Number(
                        prediction.confidence || 0
                    ) * 100;


                detectionHTML += `

                    <div class="detection-item">

                        <div>

                            <strong>
                                ${escapeHTML(
                                    className
                                )}
                            </strong>

                            <small>
                                Detection ${index + 1}
                            </small>

                        </div>

                        <strong>
                            ${confidence.toFixed(2)}%
                        </strong>

                    </div>

                `;

            }
        );


        // =================================================
        // DISPLAY RESULT
        // =================================================

        result.innerHTML = `

            <div class="result-content">

                <div class="result-warning">
                    ⚠
                </div>

                <h3>
                    Damage Detected
                </h3>

                <p>
                    AI model detected
                    <strong>
                        ${predictions.length}
                    </strong>
                    damage indication(s).
                </p>

                <div class="detection-list">

                    ${detectionHTML}

                </div>

                <p>
                    File:
                    <strong>
                        ${escapeHTML(file.name)}
                    </strong>
                </p>

            </div>

        `;


        // =================================================
        // UPDATE DASHBOARD
        // =================================================

        updateDashboard(
            file,
            predictions
        );


        // =================================================
        // ADD REPORT
        // =================================================

        addReport(
            file,
            predictions
        );


    }
    catch (error) {

        console.error(
            "Analysis error:",
            error
        );


        if (badge) {

            badge.textContent =
                "Error";

            badge.className =
                "result-badge pending";

        }


        result.innerHTML = `

            <div class="result-placeholder">

                <div class="large-icon">
                    ❌
                </div>

                <h3>
                    Analysis Failed
                </h3>

                <p>
                    ${escapeHTML(error.message)}
                </p>

                <p>
                    Make sure FastAPI is running.
                </p>

            </div>

        `;

    }

}


// =====================================================
// DRAW ROBOFLOW BOUNDING BOXES + LABELS
// =====================================================

function drawDetectionBoxes(
    file,
    predictions
) {

    const preview =
        document.getElementById("preview");


    if (!preview) {

        console.error(
            "Preview element not found."
        );

        return;

    }


    // =================================================
    // SAFETY CHECK
    // =================================================

    if (!Array.isArray(predictions)) {

        console.error(
            "Predictions is not an array:",
            predictions
        );

        predictions = [];

    }


    // =================================================
    // CLEAR OLD PREVIEW
    // =================================================

    preview.innerHTML = "";


    // =================================================
    // OUTER CONTAINER
    // =================================================

    const container =
        document.createElement("div");


    container.className =
        "detection-image-container";


    container.style.position =
        "relative";


    container.style.width =
        "100%";


    container.style.display =
        "inline-block";


    container.style.lineHeight =
        "0";


    // =================================================
    // IMAGE
    // =================================================

    const image =
        document.createElement("img");


    image.src =
        URL.createObjectURL(file);


    image.alt =
        "Vehicle Detection";


    image.style.display =
        "block";


    image.style.width =
        "100%";


    image.style.height =
        "auto";


    image.style.maxWidth =
        "100%";


    container.appendChild(
        image
    );


    preview.appendChild(
        container
    );


    // =================================================
    // WAIT UNTIL IMAGE LOADS
    // =================================================

    image.onload = function () {

        const naturalWidth =
            image.naturalWidth;


        const naturalHeight =
            image.naturalHeight;


        if (
            !naturalWidth ||
            !naturalHeight
        ) {

            console.error(
                "Could not read image dimensions."
            );

            return;

        }


        // =================================================
        // CANVAS
        // =================================================

        const canvas =
            document.createElement("canvas");


        canvas.width =
            naturalWidth;


        canvas.height =
            naturalHeight;


        canvas.style.position =
            "absolute";


        canvas.style.left =
            "0";


        canvas.style.top =
            "0";


        canvas.style.width =
            "100%";


        canvas.style.height =
            "100%";


        canvas.style.pointerEvents =
            "none";


        container.appendChild(
            canvas
        );


        const ctx =
            canvas.getContext("2d");


        if (!ctx) {

            console.error(
                "Canvas context unavailable."
            );

            return;

        }


        // =================================================
        // DRAW EACH PREDICTION
        // =================================================

        predictions.forEach(
            function (prediction) {

                // -----------------------------------------
                // ROBoflow CENTER COORDINATES
                // -----------------------------------------

                const x =
                    Number(
                        prediction.x || 0
                    );


                const y =
                    Number(
                        prediction.y || 0
                    );


                const width =
                    Number(
                        prediction.width || 0
                    );


                const height =
                    Number(
                        prediction.height || 0
                    );


                // -----------------------------------------
                // TOP-LEFT COORDINATES
                // -----------------------------------------

                const left =
                    x - (width / 2);


                const top =
                    y - (height / 2);


                // -----------------------------------------
                // CONFIDENCE
                // -----------------------------------------

                const confidence =
                    Number(
                        prediction.confidence || 0
                    ) * 100;


                // -----------------------------------------
                // CLASS
                // -----------------------------------------

                const className =
                    prediction.class ||
                    "Damage";


                // -----------------------------------------
                // LABEL
                // -----------------------------------------

                const label =
                    `${className} ${confidence.toFixed(2)}%`;


                // =================================================
                // BOUNDING BOX
                // =================================================

                ctx.strokeStyle =
                    "#ff0000";


                ctx.lineWidth =
                    5;


                ctx.strokeRect(
                    left,
                    top,
                    width,
                    height
                );


                // =================================================
                // LABEL FONT
                // =================================================

                ctx.font =
                    "bold 20px Arial";


                const textWidth =
                    ctx.measureText(
                        label
                    ).width;


                const labelWidth =
                    textWidth + 20;


                const labelHeight =
                    34;


                // =================================================
                // LABEL POSITION
                // =================================================

                let labelLeft =
                    left;


                let labelTop =
                    top - labelHeight;


                // Keep label inside image

                if (labelLeft < 0) {

                    labelLeft = 0;

                }


                if (
                    labelLeft + labelWidth >
                    naturalWidth
                ) {

                    labelLeft =
                        naturalWidth -
                        labelWidth;

                }


                if (labelTop < 0) {

                    labelTop =
                        top;

                }


                // =================================================
                // LABEL BACKGROUND
                // =================================================

                ctx.fillStyle =
                    "#ff0000";


                ctx.fillRect(
                    labelLeft,
                    labelTop,
                    labelWidth,
                    labelHeight
                );


                // =================================================
                // LABEL TEXT
                // =================================================

                ctx.fillStyle =
                    "#ffffff";


                ctx.font =
                    "bold 20px Arial";


                ctx.fillText(
                    label,
                    labelLeft + 10,
                    labelTop + 24
                );

            }
        );


        console.log(
            "Bounding boxes drawn:",
            predictions.length
        );

    };


    image.onerror = function () {

        console.error(
            "Could not load uploaded image."
        );

    };

}


// =====================================================
// UPDATE DASHBOARD
// =====================================================

function updateDashboard(
    file,
    predictions
) {

    // Safety check

    if (!Array.isArray(predictions)) {

        predictions = [];

    }


    // =================================================
    // TOTAL INSPECTIONS
    // =================================================

    const totalElement =
        document.getElementById(
            "totalInspections"
        );


    // =================================================
    // DEFECTS
    // =================================================

    const defectElement =
        document.getElementById(
            "defectsDetected"
        );


    // =================================================
    // NORMAL
    // =================================================

    const normalElement =
        document.getElementById(
            "normalInspections"
        );


    let total =
        parseInt(
            totalElement?.textContent || "0"
        );


    let defects =
        parseInt(
            defectElement?.textContent || "0"
        );


    let normal =
        parseInt(
            normalElement?.textContent || "0"
        );


    // =================================================
    // INCREMENT TOTAL
    // =================================================

    total++;


    // =================================================
    // DAMAGE OR NORMAL
    // =================================================

    if (predictions.length > 0) {

        defects++;

    } else {

        normal++;

    }


    // =================================================
    // UPDATE ELEMENTS
    // =================================================

    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (defectElement) {

        defectElement.textContent =
            defects;

    }


    if (normalElement) {

        normalElement.textContent =
            normal;

    }


    // =================================================
    // RECENT DETECTION
    // =================================================

    const recent =
        document.getElementById(
            "recentDetection"
        );


    if (!recent) {

        return;

    }


    // =================================================
    // NORMAL
    // =================================================

    if (predictions.length === 0) {

        recent.innerHTML = `

            <div>

                <strong>
                    ${escapeHTML(file.name)}
                </strong>

                <p>
                    ✓ No damage detected
                </p>

            </div>

        `;

        return;

    }


    // =================================================
    // DAMAGE
    // =================================================

    const first =
        predictions[0];


    const confidence =
        Number(
            first.confidence || 0
        ) * 100;


    recent.innerHTML = `

        <div>

            <strong>
                ${escapeHTML(file.name)}
            </strong>

            <p>
                ⚠
                ${escapeHTML(
                    first.class || "Damage"
                )}
                —
                ${confidence.toFixed(2)}%
            </p>

        </div>

    `;

}


// =====================================================
// ADD REPORT
// =====================================================

function addReport(
    file,
    predictions
) {

    const reportTable =
        document.getElementById(
            "reportTable"
        );


    if (!reportTable) {

        return;

    }


    // Safety check

    if (!Array.isArray(predictions)) {

        predictions = [];

    }


    // =================================================
    // DATE
    // =================================================

    const now =
        new Date();


    const date =
        now.toLocaleString();


    // =================================================
    // DEFAULT VALUES
    // =================================================

    let resultText =
        "No Damage";


    let confidenceText =
        "-";


    let statusText =
        "Normal";


    // =================================================
    // DAMAGE DETECTED
    // =================================================

    if (predictions.length > 0) {

        resultText =
            predictions
                .map(function (item) {

                    return (
                        item.class ||
                        "Unknown"
                    );

                })
                .join(", ");


        const confidenceValues =
            predictions.map(
                function (item) {

                    return Number(
                        item.confidence || 0
                    );

                }
            );


        const highestConfidence =
            Math.max(
                ...confidenceValues
            );


        confidenceText =
            `${(
                highestConfidence * 100
            ).toFixed(2)}%`;


        statusText =
            "Defect Detected";

    }


    // =================================================
    // CREATE RECORD
    // =================================================

    const record = {

        date: date,

        vehicle:
            file.name,

        result:
            resultText,

        confidence:
            confidenceText,

        status:
            statusText

    };


    // =================================================
    // ADD TO HISTORY
    // =================================================

    inspectionHistory.unshift(
        record
    );


    // =================================================
    // DISPLAY REPORTS
    // =================================================

    renderReports();

}


// =====================================================
// RENDER REPORTS
// =====================================================

function renderReports() {

    const reportTable =
        document.getElementById(
            "reportTable"
        );


    if (!reportTable) {

        return;

    }


    // =================================================
    // NO RECORDS
    // =================================================

    if (
        inspectionHistory.length === 0
    ) {

        reportTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="table-empty"
                >

                    No inspection records available.

                </td>

            </tr>

        `;

        return;

    }


    // =================================================
    // CLEAR TABLE
    // =================================================

    reportTable.innerHTML = "";


    // =================================================
    // ADD RECORDS
    // =================================================

    inspectionHistory.forEach(
        function (record) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${escapeHTML(
                        record.date
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        record.vehicle
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        record.result
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        record.confidence
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        record.status
                    )}
                </td>

            `;


            reportTable.appendChild(
                row
            );

        }
    );

}


// =====================================================
// DISPLAY DETECTION RESULT
// =====================================================

function displayDetectionResult(
    file,
    predictions,
    result,
    badge
) {

    if (!Array.isArray(predictions)) {

        predictions = [];

    }


    // =================================================
    // NO DAMAGE
    // =================================================

    if (predictions.length === 0) {

        badge.textContent =
            "Normal";


        badge.className =
            "result-badge success-badge";


        result.innerHTML = `

            <div class="result-success">

                <div class="large-icon">
                    ✓
                </div>

                <h3>
                    No Damage Detected
                </h3>

                <p>
                    The AI model did not detect
                    any visible damage in this image.
                </p>

                <div class="result-file">

                    ${escapeHTML(
                        file.name
                    )}

                </div>

            </div>

        `;

        return;

    }


    // =================================================
    // DAMAGE
    // =================================================

    badge.textContent =
        "Damage Detected";


    badge.className =
        "result-badge danger-badge";


    let detectionsHTML = "";


    predictions.forEach(
        function (item, index) {

            const confidence =
                Number(
                    item.confidence || 0
                ) * 100;


            detectionsHTML += `

                <div class="detection-item">

                    <div>

                        <strong>
                            ${escapeHTML(
                                item.class ||
                                "Unknown"
                            )}
                        </strong>

                        <small>
                            Detection ${index + 1}
                        </small>

                    </div>

                    <strong>
                        ${confidence.toFixed(2)}%
                    </strong>

                </div>

            `;

        }
    );


    result.innerHTML = `

        <div class="result-content">

            <div class="result-main-icon">
                ⚠
            </div>

            <h3>
                Damage Detected
            </h3>

            <p>
                AI model detected
                <strong>
                    ${predictions.length}
                </strong>
                damage indication(s).
            </p>

            <div class="detection-list">

                ${detectionsHTML}

            </div>

            <div class="result-file">

                File:
                <strong>
                    ${escapeHTML(
                        file.name
                    )}
                </strong>

            </div>

        </div>

    `;

}


// =====================================================
// ESCAPE HTML
// Prevents uploaded filenames/results from injecting HTML
// =====================================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}


// =====================================================
// INITIALIZE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderReports();

    }
);