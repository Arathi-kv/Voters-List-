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
        showAllMembers();
    });

// Show all members
function showAllMembers() {
    displayedData = sheetData;
    renderGrid(displayedData);
}

// Render grid for given array
function renderGrid(dataArray) {
    let html = dataArray.map(person => `
        <div class="person-card">
            <h3>${person.Name}</h3>
            <p><strong>Voter ID:</strong> ${person.VoterID}</p>
            <p><strong>Age:</strong> ${person.Age}</p>
            <p><strong>Ward:</strong> ${person.Ward}</p>
            <p><strong>Address:</strong> ${person.Address}</p>
        </div>
    `).join("");
    
    if(!html) html = "<p>No member found.</p>";
    resultDiv.innerHTML = html;
}

// Search function
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

// Print all displayed cards
printBtn.addEventListener("click", () => {
    const printWindow = window.open("", "", "width=800,height=600");
    const styles = `
        <style>
            body { font-family: Arial; padding: 20px; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
            .person-card { border: 1px solid #ccc; padding: 15px; border-radius: 8px; background: #f9f9f9; page-break-inside: avoid; }
            .person-card h3 { margin: 0 0 10px; font-size: 18px; }
        </style>
    `;

    let html = `<div class="grid">`;
    displayedData.forEach(person => {
        html += `
            <div class="person-card">
                <h3>${person.Name}</h3>
                <p><strong>Voter ID:</strong> ${person.VoterID}</p>
                <p><strong>Age:</strong> ${person.Age}</p>
                <p><strong>Ward:</strong> ${person.Ward}</p>
                <p><strong>Address:</strong> ${person.Address}</p>
            </div>
        `;
    });
    html += `</div>`;

    printWindow.document.write(styles + html);
    printWindow.document.close();
    printWindow.print();
});
