import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.PUBLIC_CLOUDINARY_API_SECRET,
});

// Tipado de respuesta para imágenes
export interface CloudinaryImage {
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
  tags: string[];
}

// Obtener imágenes por etiqueta (tag)
export const getImagesByTag = async (tag: string): Promise<CloudinaryImage[]> => {
  console.log("🌐 Fetching images from Cloudinary for tag:", tag);
  try {
    const response = await cloudinary.search
      .expression(`tags:${tag}`)
      .execute();
      debugger
    console.log("🌐 Fetched images from Cloudinary:", response.total);
    return response.resources as CloudinaryImage[];
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return [];
  }
};

// Subir una imagen a Cloudinary
export const uploadImage = async (filePath: string, folder?: string): Promise<CloudinaryImage | null> => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      folder: folder || 'default',
    });

    return response as CloudinaryImage;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return null;
  }
};

// Eliminar una imagen de Cloudinary
export const deleteImage = async (publicId: string): Promise<boolean> => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    return response.result === 'ok';
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return false;
  }
};

// Exportar Cloudinary para configuraciones adicionales
export default cloudinary;
