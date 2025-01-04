import { v2 as cloudinary } from 'cloudinary';
import type { CloudinaryImageType }  from '../components/types/types.ts';

cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const getImagesByTag = async (tag: string = ""): Promise<CloudinaryImageType[]> => {
  try {
    const expression = tag ? `tags:${tag}` : `resource_type:image`;
    const response = await cloudinary.search
      .expression(expression)
      .max_results(500)  
      .with_field("tags")
      .execute();
    return response.resources as CloudinaryImageType[];

  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return [];
  }
};

export const optimizeImage = (image: CloudinaryImageType) => {
  const [base, imgPath] = image.url.split("upload/")
  const optimizedUrl = `${base}upload/cs_srgb,dn_130,dpr_0.75,f_webp,h_0.5,q_45/${imgPath}`
  const highResURL = `${base}upload/cs_srgb,dpr_0.75,f_webp,h_0.6,q_75/${imgPath}`
  return {
    optimizedUrl,
    highResURL,
    width: image.width,
    height: image.height,
    aspectRatio: image.aspectRatio,
    tags: image.tags,
  }
};