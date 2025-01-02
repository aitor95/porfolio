import type React from "react";

export type Masory<T> = T & { gap: string; maxcolwidth: string };

declare global {
	namespace react.createElement.JSX {
		interface IntrinsicElements {
			"masonry-layout": Masory<React.HTMLAttributes<HTMLDivElement>>;
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
	highResURL?: string;
  optimizedUrl?: string;
  tags: string[];
	url?: string,
	width: string,
	height: string,
	aspectRatio?: number,
}

export interface TextHighlightProps {
  url: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
	setModal?: React.Dispatch<React.SetStateAction<boolean>>;
}