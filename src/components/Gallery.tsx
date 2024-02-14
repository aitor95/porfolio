import 'photoswipe/style.css';
import locationInfo from '@data/meta-gallery-location.json';
import imagesInfo from '@data/meta-gallery.json';
import { useEffect, useState } from 'preact/hooks';
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
  const [filteredImages, setFilteredImages] = useState<PhotoInfo[]>([]);

  useEffect(() => {
    const init = async (): Promise<void> => {
      await import('@appnest/masonry-layout');
      const module = await import('photoswipe/lightbox');
      const PhotoSwipeLightbox = module.default;
      const lightbox = new PhotoSwipeLightbox({
        gallery: '#gallery',
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      lightbox.init();
    };
    init();
  }, []);

  useEffect(() => {
    const filterImages = () => {
      if (location) {
        const filtered = imagesInfo.filter((_, i) => {
          const locationAtIndex = locationInfo[i + 1]?.location;
          return location === locationAtIndex;
        });
        setFilteredImages(filtered);
      } else {
        setFilteredImages(imagesInfo);
      }
    };

    filterImages();
  }, [location]);

  return (
    <>
      <masonry-layout
        gap='24'
        maxcolwidth='500'
        id='gallery'
      >
        {filteredImages.map(({ height, width }, i) => {
          return (
            <a
              className="rounded-md hover:scale-[1.03] transition-transform duration-200"
              href={`/gallery/${i + 1}.webp`}
              data-pswp-width={width}
              data-pswp-height={height}
              data-cropped="true"
              target="_blank"
              key={i}
            >
              <img
                className="min-w-full"
                loading="lazy"
                src={`/gallery/thumbnails/${i + 1}.webp`}
              />
            </a>
          );
        })}
      </masonry-layout>
    </>
  );
}