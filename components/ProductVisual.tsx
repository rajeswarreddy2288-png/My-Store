import Image from "next/image";

type Props = {
  image?: string | null;
  alt: string;
  color: string;
  brand: string;
  label: string;
  priority?: boolean;
  sizes?: string;
  big?: boolean;
};

// Fills its parent. The parent must be "relative" and have a size.
export default function ProductVisual({
  image,
  alt,
  color,
  brand,
  label,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  big = false,
}: Props) {
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div
      className={
        "absolute inset-0 flex flex-col items-center justify-center px-3 text-center " + color
      }
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-black/10" />
      <span className="relative text-[10px] font-semibold uppercase tracking-[0.25em] text-black/45">
        {brand}
      </span>
      <span
        className={
          "relative mt-2 font-extrabold leading-tight text-black/30 transition duration-500 group-hover:scale-105 " +
          (big ? "text-5xl" : "text-2xl")
        }
      >
        {label}
      </span>
    </div>
  );
}
