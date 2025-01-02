import { useEffect, useState } from "react";
import type { CloudinaryOptimizedImage } from "./types/types";
import "./styles/Gallery.css";
import "photoswipe/style.css";

interface GalleryBaseProps {
  images: CloudinaryOptimizedImage[];
}

export default function GalleryBase({ images }: GalleryBaseProps) {
  const [optimizedImages, setOptimizedImages] = useState<CloudinaryOptimizedImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  useEffect(() => {
    setOptimizedImages([]);

    // Procesar imágenes directamente en el hilo principal
    const optimizeImages = async (images: CloudinaryOptimizedImage[]) => {
      try {
        const processedImages = images.map((image) => ({
          ...image,
          url: image.url,
        }));
        setOptimizedImages(processedImages);
      } catch (error) {
        console.error("Error optimizando imágenes:", error);
      } finally {
        setLoading(false);
      }
    };

    optimizeImages(images);

    const init = async (): Promise<void> => {
      await import("@appnest/masonry-layout");
      const module = await import("photoswipe/lightbox");
      const PhotoSwipeLightbox = module.default;
      const lightbox = new PhotoSwipeLightbox({
        gallery: "#gallery",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      lightbox.init();
    };
    init();
  }, [images]);

  // Filtrar imágenes según el tag seleccionado
  const filteredImages = selectedTag === "All"
    ? optimizedImages
    : optimizedImages.filter((image) => image.tags?.includes(selectedTag));

  // Obtener los tags únicos de las imágenes
  const allTags = [...new Set(optimizedImages.flatMap((image) => image.tags || []))];

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const tag = target.textContent || "";
    setSelectedTag(tag);
  };

  if (loading) {
    return <p>Cargando imágenes...</p>;
  }

  return (
    <div>
      <header class="flex flex-col gap-4 justify-start items-start mb-4 sm:mb-8 lg:mb-12 w-full md:flex-row md:items-end md:justify-between">
        <div class="flex flex-col gap-2 font-light text-3xl uppercase">
          <a href="/#experiencia" class="font-bold text-accent">
            Aitor Blesa
          </a>
          <span class="text-xl sm:text-2xl">Photography</span>
        </div>

        <nav class="flex gap-4 tracking-normal sm:tracking-widest uppercase text-content text-base sm:text-lg">
          <button
            type="button"
            className={`transition-colors hover:text-accent ${selectedTag === "All" ? "text-accent" : ""}`}
            onClick={handleClick}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`capitalize transition-colors hover:text-accent ${selectedTag === tag ? "text-accent" : ""}`}
              onClick={handleClick}
            >
              {tag}
            </button>
          ))}
        </nav>
      </header>

      <masonry-layout
        gap="24"
        maxcolwidth="500"
        id="gallery"
        class="mx-auto w-full"
      >
        {filteredImages.map((image, i) => (
          <a
            key={i}
            className="group rounded-md hover:scale-[1.03] transition-transform duration-200"
            href={`${image.highResURL}`}
            data-cropped="true"
            data-pswp-width={image.width}
            data-pswp-height={image.height}
            target="_blank"
            rel="noreferrer"
            style={{ aspectRatio: `${image.aspectRatio}` }}
          >
            <img
              decoding="async"
              className="rounded-md object-cover"
              loading="lazy"
              src={`${image.optimizedUrl}`}
              width={image.width}
              height={image.height}
              alt="Imagen de la galería"
              style={{ aspectRatio: `${image.aspectRatio}` }}
            />
            <img
              className="blur-md opacity-0 group-hover:opacity-100 absolute inset-0 transition contrast-130 -z-10 object-cover"
              loading="lazy"
              src={`${image.optimizedUrl}`}
              width={image.width}
              height={image.height}
              alt="Imagen de la galería"
              style={{ aspectRatio: `${image.aspectRatio}` }}
            />
          </a>
        ))}
      </masonry-layout>
    </div>
  );
}
