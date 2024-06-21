import { readdir, unlink } from 'fs/promises';
import sharp from 'sharp';
import { join, extname, basename } from 'path';

// Escanea el directorio y filtra los archivos por tipo
const scanDirectory = async (directory, fileTypes) => {
  const files = await readdir(directory);
  return files.filter(file => fileTypes.includes(extname(file).toLowerCase()));
};

// Convierte y renombra los archivos
const convertAndRename = async (directory, file) => {
  try {
    const filePath = join(directory, file);
    console.info(`Converting ${filePath}`);

    const newFilePath = join(directory, `${basename(file, extname(file))}.webp`);
    const image = sharp(filePath);

    const metadata = await image.metadata();
    const newWidth = Math.round(metadata.width * 0.2);
    const newHeight = Math.round(metadata.height * 0.2);

    await image
      .resize(newWidth, newHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .webp({ quality: 55 })
      .toFile(newFilePath);

    console.info(`Converted to ${newFilePath}`);

    await unlink(filePath);
    console.log(`Removed original file ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${file}:`, error);
  }
};

// Directorio y tipos de archivo a procesar
const directory = 'public/gallery/';
const fileTypes = ['.jpg', '.jpeg', '.png'];

// Escanea y procesa los archivos
const files = await scanDirectory(directory, fileTypes);
await Promise.all(files.map(file => convertAndRename(directory, file)));
