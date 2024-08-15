const fs = require('fs')

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

// Update the 'main' field
const newMainValue = process.argv[2]

if (!newMainValue) {
  console.error('Please provide the new value for the "main" field.')
  process.exit(1)
}
packageJson.main = newMainValue

// Write the changes back to the package.json file
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2), 'utf8')

console.log('package.json updated successfully!')
