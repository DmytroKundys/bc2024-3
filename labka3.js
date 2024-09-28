const { Command } = require('commander');
const fs = require('fs');
const program = new Command();

// Додаємо параметри командного рядка
program
  .option('-i, --input <type>', 'шлях до файлу, який даємо для читання')
  .option('-o, --output <type>', 'шлях до файлу, у якому записуємо результат')
  .option('-d, --display', 'вивести результат у консоль');

// Парсимо аргументи командного рядка
program.parse(process.argv);

const options = program.opts();

// Перевірка обов’язкового параметра
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1); // Вихід з кодом помилки
}

// Перевірка наявності вхідного файлу
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1); // Вихід з кодом помилки
}

// Читання вмісту файлу
let data;
try {
  const fileContent = fs.readFileSync(options.input, 'utf8');
  data = JSON.parse(fileContent); // Спроба парсити JSON
} catch (error) {
  console.error('Error parsing JSON:', error.message);
  process.exit(1);
}

// Якщо задано параметр -d, виводимо результат у консоль
if (options.display) {
  console.log(JSON.stringify(data, null, 2)); // Вивід у форматі JSON з відступами
}

// Якщо задано параметр -o, записуємо результат у файл
if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(data, null, 2));
  // Якщо задано одночасно -o та -d, виводимо результат у консоль
  if (options.display) {
    console.log('Результат записано у файл:', options.output);
  }
}
