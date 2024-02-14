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

export default function Gallery({ location }: GalleryProps) {
  const [filteredImages, setFilteredImages] = useState<PhotoInfo[]>([]);

  useEffect(() => {
    const init = async (): Promise<void> => {

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
      <section className="grid gap-4" id="gallery">
        {filteredImages.map((photo, i) => {
          const { height, width } = photo;
          return (
            <a
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
      </section>
      {/* <div>
        {All()}
      </div> */}
    </>
  );
}