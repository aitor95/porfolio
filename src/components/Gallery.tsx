import locationInfo from "@data/meta-gallery-location.json";
import imagesInfo from "@data/meta-gallery.json";
import "photoswipe/style.css";
import { useEffect } from "preact/hooks";
import "./styles/Gallery.css";
import { type Masory } from "@components/types/gallery";
interface GalleryProps {
	location: string;
}

// interface PhotoInfo {
// 	height: number;
// 	width: number;
// }
// interface PhotoInfo {
// 	height: number;
// 	width: number;
// }

export default function Gallery({ location }: GalleryProps) {
	useEffect(() => {
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
	}, []);

	let filteredIndex: number[];

	if (location.trim() === "" || location === "All") {
		filteredIndex = locationInfo.map((_, index) => index + 1);
	} else {
		filteredIndex = locationInfo
			.map((loc, index) => (loc.location === location ? index + 1 : -1))
			.filter((index) => index !== -1);
	}

	const filteredImagesInfo = filteredIndex.map(
		(index) => imagesInfo[index - 1],
	);

	return (

		// <section id="gallery"
		// 	class="mx-auto w-full grid gap-6">
		<masonry-layout
			gap="24"
			maxcolwidth="600"
			class="lg:mx-auto mx-4 py-20"
			id="gallery"
		>
			{filteredIndex.map((index, i) => {
				const { height, width } = filteredImagesInfo[i];
				return (
					<a
						className="group rounded-md hover:scale-[1.03] transition-transform duration-200 w-full h-auto block"
						href={`/gallery/${index}.webp`}
						data-cropped="true"
						data-pswp-width={width}
						data-pswp-height={height}
						target="_blank"
						rel="noreferrer"
					>
						<img
							className="rounded-md w-full h-auto block"
							loading="lazy"
							src={`/gallery/thumbnails/${index}.webp`}
							width={width}
							height={height}
							alt="Imagen de la galería"
						/>
						<img
							className="blur-md opacity-0 group-hover:opacity-100 absolute inset-0 transition contrast-130 -z-10 w-full h-auto block"
							loading="lazy"
							src={`/gallery/thumbnails/${index}.webp`}
							width={width}
							height={height}
							alt="Imagen con efecto blur para hacer de sombra de una fotografía"
						/>
					</a>
				)
			})}

		</masonry-layout>

	);
}