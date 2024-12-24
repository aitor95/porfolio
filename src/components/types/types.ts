export type Masory<T> = T & { gap: string; maxcolwidth: string };

declare global {
	namespace preact.createElement.JSX {
		interface IntrinsicElements {
			"masonry-layout": Masory<JSX.HTMLAttributes>;
		}
	}
}

// Tipado de respuesta para imágenes
export interface CloudinaryImageType {
	public_id?: string;
	format?: string;
	version?: number;
	resource_type?: string;
	type?: string;
	created_at?: string;
	bytes?: number;
	width: number;
	height: number;
	url: string;
	secure_url?: string;
	tags?: string[];
	aspectRatio?: number;
}

export interface CloudinaryOptimizedImage {
  tags: string[];
	url: string,
	width: string,
	height: string,
	aspectRatio?: number,
}