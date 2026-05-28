"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full p-4 h-16 md:h-18 flex flex-col items-center justify-center bg-background shadow-[0_-8px_24px_rgba(0,0,0,0.1)]
"
    >
      <Image
        className="cursor-pointer md:w-48"
        src="/svg/logo-blue.svg"
        alt="DEV-Chenzo"
        width={100}
        height={40}
        onClick={() => window.open("https://github.com/DEV-Chenzo", "_blank")}
      />
      <p className=" text-sm text-primary-muted-foreground ">
        &copy; {new Date().getFullYear()} GeoStats. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
