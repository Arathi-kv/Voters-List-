const sheetURL = "https://opensheet.elk.sh/1G38BBMCNl2JeGS4JXOfFcWn9PaFD2YyCEcSLpzhL01I/Sheet1";
let sheetData = [];
let displayedData = [];

const searchInput = document.getElementById("searchInput");
const printBtn = document.getElementById("printBtn");
const resultDiv = document.getElementById("result");

// Load data from Google Sheet
fetch(sheetURL)
    .then(res => res.json())
    .then(data => {
        sheetData = data;
        console.log(sheetData[0]); // For debugging: check exact keys
        showAllMembers();
    });

// Show all members
function showAllMembers() {
    displayedData = sheetData;
    renderGrid(displayedData);
}

// Render cards
function renderGrid(dataArray) {
    let html = dataArray.map(person => `
       <div class="person-card">
        <h3>
            Local Body: ${person["LocalBody"]} <br>
            Polling Station: ${person["PollingStation"]}
        </h3>

        <p><strong>Name:</strong> ${person["Name"]}</p>
        <p><strong>W No/H No.:</strong> ${person["W No/H No."]}</p>
        <p><strong>Guardian's Name:</strong> ${person["Guardian's Name"]}</p>
        <p><strong>House Name:</strong> ${person["House Name"]}</p>
        <p><strong>Gender/Age:</strong> ${person["Gender/Age"]}</p>
        <p><strong>ID Card No.:</strong> ${person["ID Card No."]}</p>
       </div>
    `).join("");

    if (!html) html = "<p>No member found.</p>";
    resultDiv.innerHTML = html;
}

// Search functionality
searchInput.addEventListener("keyup", () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        showAllMembers();
        return;
    }

    const filtered = sheetData.filter(person =>
        person["ID Card No."].toLowerCase().includes(query) ||
        person["Name"].toLowerCase().includes(query)
    );

    displayedData = filtered;
    renderGrid(displayedData);
});

// Print functionality
printBtn.addEventListener("click", () => {
    const printWindow = window.open("", "", "width=800,height=600");

    let html = `<div class="grid">`;

    displayedData.forEach(person => {
        html += `
            <div class="person-card">
                <h3>
                    Local Body: ${person["LocalBody"]} <br>
                    Polling Station: ${person["PollingStation"]}
                </h3>

                <p><strong>Name:</strong> ${person["Name"]}</p>
                <p><strong>W No/H No.:</strong> ${person["W No/H No."]}</p>
                <p><strong>Guardian's Name:</strong> ${person["Guardian's Name"]}</p>
                <p><strong>House Name:</strong> ${person["House Name"]}</p>
                <p><strong>Gender/Age:</strong> ${person["Gender/Age"]}</p>
                <p><strong>ID Card No.:</strong> ${person["ID Card No."]}</p>
            </div>
        `;
    });

    html += `</div>`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
});
