import 'photoswipe/style.css';
import locationInfo from '@data/meta-gallery-location.json';
import imagesInfo from '@data/meta-gallery.json';
import { useEffect } from 'preact/hooks';
import './styles/Gallery.css';

interface GalleryProps {
  location: string
}

interface PhotoInfo {
  height: number;
  width: number;
}

type Masonry<T> = T & { gap: string; maxcolwidth: string };

declare global {
  namespace preact.createElement.JSX {
    interface IntrinsicElements {
      ['masonry-layout']: Masonry<JSX.HTMLAttributes>;
    }
  }
}

export default function Gallery({ location }: GalleryProps) {

  useEffect(() => {
    const initGallery = async () => {
      const module = await import('@appnest/masonry-layout');
      module.default
      const PhotoSwipeLightbox = (await import('photoswipe/lightbox')).default;
      const lightbox = new PhotoSwipeLightbox({
        gallery: '#gallery',
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      lightbox.init();
    };
    initGallery();
  }, []);


  let filteredIndex;

  if (location.trim() === '' || location === "All") {
    filteredIndex = locationInfo.map((_, index) => index + 1);
  } else {
    filteredIndex = locationInfo
      .map((loc, index) => loc.location === location ? index + 1 : -1)
      .filter(index => index !== -1);
  }

  const filteredImagesInfo = filteredIndex.map(index => imagesInfo[index - 1]);

  return (
    <masonry-layout
      gap='24'
      maxcolwidth='500'
      id='gallery'
      class="mx-auto w-full"
    >
      {filteredIndex.map((index, i) => {
        const { height, width } = filteredImagesInfo[i];
        const resizedWidth = Math.floor(width * 0.6);
        const resizedHeight = Math.floor(height * 0.6);
        const cloudinaryBaseURL = 'https://res.cloudinary.com/aitorblesadev/image/upload/';
        const imagePath = `${cloudinaryBaseURL}w_${resizedWidth},h_${resizedHeight},c_fill,q_auto,f_auto/${index}.webp`;
        const thumbnailPath = `${cloudinaryBaseURL}w_${resizedWidth},h_${resizedHeight},c_fill,q_auto,f_auto/thumbnails/${index}.webp`;

        return (
          <a
            className="group rounded-md hover:scale-[1.03] transition-transform duration-200"
            href={imagePath}
            data-cropped="true"
            data-pswp-width={width}
            data-pswp-height={height}
            target="_blank"
          >
            <img
              className="w-full h-auto rounded-md object-cover"
              loading="lazy"
              src={thumbnailPath}
              sizes="(max-width: 600px) 500px, 1000px"
            />
            <img
              className="blur-md opacity-0 group-hover:opacity-100 absolute inset-0 transition contrast-130 -z-10 object-cover"
              loading="lazy"
              src={thumbnailPath}
              alt="Imagen con efecto blur para hacer de sombra de una fotografía"
            />
          </a>
        );
      })}
    </masonry-layout>
  );
}