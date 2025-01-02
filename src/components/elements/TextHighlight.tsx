import type { TextHighlightProps } from "@components/types/types";

export default function TextHighlight({
  url,
  children,
  target,
  rel,
  setModal
}: TextHighlightProps) {

  const handleMouseEnter = () => {
    if (setModal) {
      setModal(true);
    }
  };

  const handleMouseLeave = () => {
    if (setModal) {
      setModal(false);
    }
  };
  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={url}
      target={target}
      rel={rel}
      className="text-accent font-semibold hover:underline "
    >
      {children}
    </a>
  );
}
