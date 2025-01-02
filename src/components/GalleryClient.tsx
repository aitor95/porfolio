import { useState, useEffect } from "react";
import type { CloudinaryImageType } from "./types/types";

interface GalleryClientProps {
  images: CloudinaryImageType[];
  location: string;
  children?: any;
}

export default function GalleryClient({ images, location }: GalleryClientProps) {
  const [filteredImages, setFilteredImages] = useState(images);

  // Filtra las imágenes según la ubicación seleccionada
  useEffect(() => {
    if (location === "All") {
      setFilteredImages(images);
    } else {
      const filtered = images.filter((img) => img.tags?.includes(location));
      setFilteredImages(filtered);
    }
  }, [images, location]);

  return (
    <section id="gallery" className="mx-auto w-full grid gap-6">
      {filteredImages.length === 0 ? (
        <p className="text-center">No images found for "{location}"</p>
      ) : (
        filteredImages.map((image, index) => (
          <a key={index} href={image.url} target="_blank" rel="noreferrer">
            <img
              className="rounded-md w-full h-auto"
              loading="lazy"
              src={image.url}
              alt={"Gallery Image"}
            />
          </a>
        ))
      )}
    </section>
  );
}
