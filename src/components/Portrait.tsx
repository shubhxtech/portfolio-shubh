import Image from "next/image";
import { site } from "@/content/site";

export function Portrait() {
  return (
    <figure className="panel w-40 sm:w-48 md:w-full">
      <div className="hidden items-center justify-between gap-3 border-b border-line px-4 py-2.5 md:flex">
        <p className="kicker truncate !text-fg-2">{site.name}</p>
        <p className="kicker hidden lg:block">{site.location}</p>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] md:rounded-t-none">
        <Image
          src={site.photo.src}
          width={site.photo.width}
          height={site.photo.height}
          alt={`Portrait of ${site.name}`}
          priority
          sizes="(min-width: 1024px) 340px, (min-width: 768px) 240px, 192px"
          className="absolute inset-0 size-full object-cover object-[50%_28%] brightness-[0.93] saturate-[0.92]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-transparent" />
        <div aria-hidden className="absolute inset-0 ring-1 ring-fg/5 ring-inset" />
      </div>
    </figure>
  );
}
