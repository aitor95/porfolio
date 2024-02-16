import { useState, useEffect } from "preact/hooks";
import Gallery from "./Gallery";
import Locations from '../data/meta-gallery-location.json';

export default function GalleryBase() {
  const locationsUnique = [...new Set(Locations.map(loc => loc.location))];
  const [location, setLocation] = useState<string>('');

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    const currentLocation = target.textContent || '';
    setLocation(currentLocation);
  };

  return (
    <>
      <header class="flex flex-col justify-start items-start mb-12 md:flex-row md:items-end md:justify-between w-full">
        <div class="flex flex-col gap-2 font-light text-3xl uppercase sm:flex-row">
          <a href="/" class="font-bold">
            Aitor Blesa
          </a>
          <span class="text-xl sm:text-3xl">Photography</span>
        </div>
        <nav class="flex gap-4 tracking-widest uppercase font-semibold text-gray-500">
          {locationsUnique.map((locationItem) => (
            <a
              href="#"
              class={`transition-colors hover:text-gray-950`}
              onClick={handleClick}
            >
              {locationItem}
            </a>
          ))}
        </nav>
      </header>
      <Gallery location={location} />
    </>
  );
}
