import fs from 'fs-extra';
import path from 'path';
import sizeOf from 'image-size';

const galleryPath = './public/gallery';
const outputFilePath = './src/data/meta-gallery.json';
const outputFilePathLoc = './src/data/meta-gallery-location.json';

const defaultObject = { location: '' };

async function processImages() {
  try {
    const files = await fs.readdir(galleryPath);
    const imageFiles = files.filter(file => /\.(webp)$/i.test(file));
    const metadataArray = [];
    for (const file of imageFiles) {
      const filePath = path.join(galleryPath, file);
      const { height, width } = sizeOf(filePath);
      metadataArray.push({
        height,
        width
      });
    }

    let metadataArrayLoc = [];
    if (fs.existsSync(outputFilePathLoc)) {
      const existingData = await fs.readJson(outputFilePathLoc);
      metadataArrayLoc = existingData;
    }

    // Add defaultObject to metadataArrayLoc if needed
    while (metadataArrayLoc.length < metadataArray.length) {
      metadataArrayLoc.push(defaultObject);
    }

    await fs.writeFile(outputFilePath, JSON.stringify(metadataArray, null, 2));
    await fs.writeFile(outputFilePathLoc, JSON.stringify(metadataArrayLoc, null, 2));
    console.log(`Metadata almacenada en ${outputFilePath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

processImages();
