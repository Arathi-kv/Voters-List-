// sheetURL must be set in HTML before this script
let sheetData = [];
let displayedData = [];

const resultDiv = document.getElementById("result");

// Load data
fetch(sheetURL)
    .then(res => res.json())
    .then(data => {
        sheetData = data;
        showAllMembers();
    })
    .catch(err => console.error("Failed to fetch sheet:", err));

// Show all members
function showAllMembers() {
    displayedData = sheetData;
    renderGrid(displayedData);
}

// Render cards
function renderGrid(dataArray) {
    let html = dataArray.map((person, index) => createCard(person, index)).join("");
    if (!html) html = "<p>No member found.</p>";
    resultDiv.innerHTML = html;
}

// Create card
function createCard(person, index) {
    return `
        <div class="person-card">
            <div class="info-row slno-id-row">
                <div class="label">Sl.No</div>
                <div class="value">:<b> ${index + 1}</b></div>
                <div class="desktop-spacer"></div>
                <div class="id-value">${person["ID Card No."]}</div>
            </div>

            <div class="info-row">
                <div class="label">പേര്</div>
                <div class="value">: <b>${person["Name"]}</b></div>
            </div>

            <div class="info-row">
                <div class="label">രക്ഷിതാവ്</div>
                <div class="value">: ${person["Guardian's Name"]}</div>
            </div>

            <div class="info-row">
                <div class="label">വീട്</div>
                <div class="value">: ${person["House Name"]}</div>
            </div>

            <div class="info-row">
                <div class="label">ബൂത്ത്</div>
                <div class="value">
                    : ${person["PollingStation"].replace(/(\d+)/, '<span class="booth-number">$1</span>')}
                </div>
            </div>

            <div class="info-row">
                <div class="label">വാർഡ്</div>
                <div class="value">: ${person["Ward"]}</div>
            </div>
        </div>
    `;
}
