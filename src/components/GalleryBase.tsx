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
      <header class="flex flex-col gap-4 justify-start items-start mb-4 sm:mb-8 lg:mb-12 w-full md:flex-row md:items-end md:justify-between">
        <div class="flex flex-col gap-2 font-light text-3xl uppercase  ">
          <a href="/" class="font-bold">
            Aitor Blesa
          </a>
          <span class="text-xl sm:text-2xl">Photography</span>
        </div>
        <nav class="flex gap-4 tracking-normal sm:tracking-widest uppercase text-gray-500 text-base sm:text-lg">
          <a
            href="#"
            class={`transition-colors hover:text-gray-950 ${location === 'All' ? 'text-gray-950' : ''}`}
            onClick={handleClick}
          >
            All
          </a>
          {
            locationsUnique.map((locationItem) => (

              <a
                href="#"
                class={`transition-colors hover:text-gray-950 ${location === locationItem ? 'text-gray-950' : ''}`}
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
