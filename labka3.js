const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
    .option('-i, --input <file>', 'input file')
    .option('-o, --output <file>', 'output file')
    .option('-d, --display', 'display result in console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// Перевірка наявності файлу
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// Читання файлу
const data = fs.readFileSync(options.input);
let jsonData;

try {
    jsonData = JSON.parse(data);
} catch (error) {
    console.error("Error parsing JSON:", error.message);
    process.exit(1);
}

// Знаходження максимального курсу
let maxRate = -Infinity; // Ініціалізуємо з мінімального значення
jsonData.forEach(entry => {
    if (entry.rate > maxRate) {
        maxRate = entry.rate;
    }
});

// Форматування результату
const result = `Максимальний курс: ${maxRate}`;

// Виведення результатів
if (options.display) {
    console.log(result);
}

// Запис у файл, якщо задано
if (options.output) {
    fs.writeFileSync(options.output, result);
}
