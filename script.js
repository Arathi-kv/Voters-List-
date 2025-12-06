const sheetURL = "https://opensheet.elk.sh/1G38BBMCNl2JeGS4JXOfFcWn9PaFD2YyCEcSLpzhL01I/Sheet1";
let sheetData = [];
let displayedData = [];

const searchInput = document.getElementById("searchInput");
const printBtn = document.getElementById("printBtn");
const resultDiv = document.getElementById("result");

// Load data
fetch(sheetURL)
    .then(res => res.json())
    .then(data => {
        sheetData = data;
        showAllMembers();
    });

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

// slip card 
function createCard(person, index) {
    return `
          <div class="person-card">
    <div class="info-row">
        <!-- Sl.No -->
        <div class="label">Sl.No</div>
        <div class="value">: ${index + 1}</div>

        <!-- V.ID aligned right -->
        <div class="label" style="margin-left:auto;"></div>
        <div class="value"> ${person["ID Card No."]}</div>
    </div>

            <div class="info-row">
                <div class="label">പേര്</div>
                <div class="value">: ${person["Name"]}</div>
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
                <div class="value">: ${person["PollingStation"].replace(/(\d+)/, '<span class="booth-number">$1</span>')}
                </div>
            </div>

            <div class="info-row">
                <div class="label">വാർഡ്</div>
                <div class="value">: ${person["Ward"]}</div>
            </div>
        </div>
    `;
}


// Print All
printBtn.addEventListener("click", () => {
    const printWindow = window.open("", "", "width=800,height=600");
    let html = `<link rel="stylesheet" href="style.css">`;
    html += `<div class="grid">`;

    displayedData.forEach((person, index) => {
        html += createCard(person, index);
    });

    html += `</div>`;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
});
