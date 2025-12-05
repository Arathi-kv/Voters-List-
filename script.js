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

function showAllMembers() {
    displayedData = sheetData;
    renderGrid(displayedData);
}

// Render cards
function renderGrid(dataArray) {
    let html = dataArray.map(person => `
       <div class="person-card">
    <h3 style="text-align:center; margin-bottom:10px;">
        Local Body: ${person.LocalBody} <br>
        Polling Station: ${person.PollingStation}
    </h3>

    <p><strong>Name:</strong> ${person.Name}</p>
    <p><strong>W No/H No.:</strong> ${person.HouseNumber}</p>
    <p><strong>Guardian's Name:</strong> ${person.GuardianName}</p>
    <p><strong>House Name:</strong> ${person.HouseName}</p>
    <p><strong>Gender/Age:</strong> ${person.Gender} / ${person.Age}</p>
    <p><strong>ID Card No.:</strong> ${person.IDCard}</p>
</div>

    `).join("");

    if(!html) html = "<p>No member found.</p>";
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
        person.VoterID.toLowerCase().includes(query) || 
        person.Name.toLowerCase().includes(query)
    );

    displayedData = filtered;
    renderGrid(displayedData);
});

// Print functionality
printBtn.addEventListener("click", () => {
    const printWindow = window.open("", "", "width=800,height=600");
    const styles = `
        <style>
            body { font-family: Arial; padding: 20px; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); row-gap: 40px; column-gap: 30px; }
            .person-card { border: 1px solid #ccc; padding: 15px; border-radius: 8px; background: #f9f9f9; page-break-inside: avoid; }
            .person-card h3 { margin: 0 0 10px; font-size: 16px; text-align: center; }
        </style>
    `;

    let html = `<div class="grid">`;
    displayedData.forEach(person => {
        html += `
           <div class="person-card">
    <h3 style="text-align:center; margin-bottom:10px;">
        Local Body: ${person.LocalBody} <br>
        Polling Station: ${person.PollingStation}
    </h3>

    <p><strong>Name:</strong> ${person.Name}</p>
    <p><strong>W No/H No.:</strong> ${person.HouseNumber}</p>
    <p><strong>Guardian's Name:</strong> ${person.GuardianName}</p>
    <p><strong>House Name:</strong> ${person.HouseName}</p>
    <p><strong>Gender/Age:</strong> ${person.Gender} / ${person.Age}</p>
    <p><strong>ID Card No.:</strong> ${person.IDCard}</p>
</div>

        `;
    });
    html += `</div>`;

    printWindow.document.write(styles + html);
    printWindow.document.close();
    printWindow.print();
});
