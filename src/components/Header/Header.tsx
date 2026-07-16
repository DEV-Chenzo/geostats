import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() { 
    return (
        <header className="flex items-center justify-between p-4 bg-white text-gray-500">
            <div>
                <button><RxHamburgerMenu /></button>
                <h1>GeoStats</h1>
            </div>
            <div>
                <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                <h1>My Account</h1>
                <p>Administrador</p>
            </div>
        </header>
    );
}