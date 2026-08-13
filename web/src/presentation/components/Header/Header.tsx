import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
export default function Header() {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-4 text-gray-500">
      <div className="flex items-center gap-6 px-4">
        <h1 className="text-lg font-semibold text-gray-800">GeoStats</h1>
        <div className="flex items-center gap-2 rounded-sm bg-neutral-100 focus-within:outline-none">
          <IoIosSearch className="ml-4 text-xl font-bold bg-neutral-100 text-gray-700" />
          <input
            type="text"
            placeholder="Pesquisar clientes, preços ou vendas..."
            className="h-10 w-xl rounded-sm bg-neutral-100 px-2 placeholder:text-neutral-600 placeholder:text-sm focus:border-0 focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <h2 className="text-sm font-medium text-gray-800">My Account</h2>
          <p className="text-xs text-gray-500">Administrador</p>
        </div>
        <Image
          src="/perfil.jpg"
          alt="Foto de Perfil | Por Alex Suprun "
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
