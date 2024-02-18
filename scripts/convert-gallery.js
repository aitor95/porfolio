import { readdir, unlink } from 'fs/promises';
import sharp from 'sharp';
import { join, extname, basename } from 'path';

const scanDirectory = async (directory, fileTypes) => {
  const files = await readdir(directory);
  return files.filter(file => fileTypes.includes(extname(file).toLowerCase()));
};

const convertAndRename = async (directory, file) => {
  try {
    const filePath = join(directory, file);
    console.info(`Converting ${filePath}`);

    const newFilePath = join(directory, `${basename(file, extname(file))}.webp`);
    const image = sharp(filePath);

    const metadata = await image.metadata();
    const newWidth = Math.round(metadata.width * 0.4);
    const newHeight = Math.round(metadata.height * 0.4);

    await image
      .resize(newWidth, newHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .webp({ quality: 60 })
      .toFile(newFilePath);

    console.info(`Converted to ${newFilePath}`);

    await unlink(filePath);
    console.log(`Removed original file ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${file}:`, error);
  }
};

const directory = 'public/gallery/'; // Ruta del directorio
const fileTypes = ['.jpg', '.jpeg', '.png']; // Tipos de archivo a procesar

const files = await scanDirectory(directory, fileTypes);

// Procesamiento en paralelo
await Promise.all(files.map(file => convertAndRename(directory, file)));
