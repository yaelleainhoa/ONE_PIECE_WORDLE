// scripts/fix-index-html.js
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.resolve(__dirname, '../dist/index.html');

const additionalScriptTag = '<script type="module" src="/src/main.js"></script>';

async function updateIndexFile() {
  try {
    // Read the existing index.html file
    const data = await fs.readFile(indexPath, 'utf-8');

    // Add the additional script tag before the closing </body> tag
    const updatedContent = data.replace('</body>', `${additionalScriptTag}\n</body>`);

    // Write the updated content back to the file
    await fs.writeFile(indexPath, updatedContent, 'utf-8');

    console.log('dist/index.html updated successfully!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// Call the async function to update the index file
updateIndexFile();
