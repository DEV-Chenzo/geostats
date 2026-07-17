import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-4 text-gray-500">
      <div className="flex items-center gap-3">
        <button
          className="rounded p-2 hover:bg-gray-100"
          aria-label="Abrir menu"
        >
          <RxHamburgerMenu className="text-xl" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">GeoStats</h1>
      </div>
      <div className="flex items-center gap-3">
        
        <div className="text-right">
          <h2 className="text-sm font-medium text-gray-800">My Account</h2>
          <p className="text-xs text-gray-500">Administrador</p>
        </div>
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      </div>
    </header>
  );
}
