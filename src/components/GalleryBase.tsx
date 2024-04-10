import { useState } from "preact/hooks";
import Locations from "../data/meta-gallery-location.json";
import Gallery from "./Gallery";

export default function GalleryBase() {
  const locationsUnique = [...new Set(Locations.map(loc => loc.location))];
  const [location, setLocation] = useState<string>(locationsUnique[1]);

	const handleClick = (event: MouseEvent) => {
		event.preventDefault();
		const target = event.target as HTMLAnchorElement;
		const currentLocation = target.textContent || "";
		setLocation(currentLocation);
	};

	return (
		<div>
			<header class="flex flex-col gap-4 justify-start items-start mb-4 sm:mb-8 lg:mb-12 w-full md:flex-row md:items-end md:justify-between">
				<div class="flex flex-col gap-2 font-light text-3xl uppercase  ">
					<a href="/" class="font-bold text-accent">
						Aitor Blesa
					</a>
					<span class="text-xl sm:text-2xl">Photography</span>
				</div>
				<nav class="flex gap-4 tracking-normal sm:tracking-widest uppercase text-content text-base sm:text-lg">
					<button
						type="button"
						className={`transition-colors hover:text-accent ${
							location === "All" ? "text-accent" : ""
						}`}
						onClick={handleClick}
					>
						All
					</button>
					{locationsUnique.map((locationItem) => (
						<button
							type="button"
							className={`transition-colors hover:text-accent ${
								location === locationItem ? "text-accent" : ""
							}`}
							onClick={handleClick}
						>
							{locationItem}
						</button>
					))}
				</nav>
			</header>
			<Gallery location={location} />
		</div>
	);
}
