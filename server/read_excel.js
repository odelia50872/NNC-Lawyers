const XLSX = require('xlsx');
const path = require('path');
const dataDir = path.join(__dirname, '..', 'data');

const files = [
    "\u05d3\u05d5''ch 1 - shnat 2024.xlsx",
    "\u05d3\u05d5''ch 2 - shnat 2024 -.xlsx"
];

const fs = require('fs');
const allFiles = fs.readdirSync(dataDir);
const xlsxFiles = allFiles.filter(f => f.endsWith('.xlsx'));
console.log('XLSX files found:', JSON.stringify(xlsxFiles));

xlsxFiles.forEach(f => {
    try {
        const wb = XLSX.readFile(path.join(dataDir, f));
        process.stdout.write('=== ' + f + ' ===\n');
        wb.SheetNames.forEach(s => {
            const ws = wb.Sheets[s];
            process.stdout.write('Sheet: ' + s + '\n');
            const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
            rows.forEach((r, i) => {
                process.stdout.write(i + ': ' + JSON.stringify(r) + '\n');
            });
        });
    } catch (e) {
        process.stdout.write('Error: ' + e.message + '\n');
    }
});
