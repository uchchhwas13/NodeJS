const fs = require('fs');

fs.writeFile('output.txt', 'Hello, World!', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('File written successfully');
  }
});

fs.readFile('output.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    console.log('File content:', data);
  }
});