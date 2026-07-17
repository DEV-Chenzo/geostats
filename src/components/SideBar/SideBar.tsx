import { SiEnterprisedb } from "react-icons/si";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiContactsFill } from "react-icons/ri";
import { MdOutlineInventory2, MdOutlineShoppingCart } from "react-icons/md";
import { FaSquarePollVertical } from "react-icons/fa6";
export default function SideBar() {
  return (
    <aside className="h-screen w-64 shrink-0 bg-primary-900 p-4">
      <section className="mt-4 mb-10 flex flex-row items-center gap-4">
        <SiEnterprisedb className="text-6xl text-secondary-400" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-tertiary-50">
            Enterprise
          </h1>
          <p className="text-[10px] text-tertiary-400">
            GERENCIAMENTO GEOGRÁFICO DE EMPRESAS
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-4 mt-4">
        <button className="w-full flex flex-row items-center justify-items-start hover:bg-primary-600 hover:text-tertiary-100 text-tertiary-200   py-2 px-5 rounded">
          <div className="flex flex-row items-center gap-4 w-35">
            <TbLayoutDashboardFilled className="text-2xl" />{" "}
            <p className="text-xs">Dashboard</p>
          </div>
        </button>
        <button className="w-full flex flex-row items-center justify-items-start hover:bg-primary-600 hover:text-tertiary-100  text-tertiary-200  py-2 px-5 rounded">
          <div className="flex flex-row items-center gap-4 w-35">
            <RiContactsFill className="text-2xl" />{" "}
            <p className="text-xs">Clientes</p>
          </div>
        </button>
        <button className="w-full flex items-center justify-items-start hover:bg-primary-600 hover:text-tertiary-100  text-tertiary-200  py-3 px-5 rounded">
          <div className="flex flex-row items-center gap-4 w-35">
            <MdOutlineShoppingCart className="text-2xl" />{" "}
            <p className="text-xs">Vendas</p>
          </div>
        </button>
        <button className="w-full flex items-center justify-items-start hover:bg-primary-600 hover:text-tertiary-100  text-tertiary-200  py-2 px-5 rounded">
          <div className="flex flex-row items-center gap-4 w-35">
            <MdOutlineInventory2 className="text-2xl" />{" "}
            <p className="text-xs">Inventário</p>
          </div>
        </button>
        <button className="w-full flex flex-row items-center justify-items-start hover:bg-primary-600 hover:text-tertiary-100  text-tertiary-200  py-2 px-5 rounded">
          <div className="flex flex-row items-center gap-4 w-35">
            <FaSquarePollVertical className="text-2xl" />{" "}
            <p className="text-xs">Relatórios</p>
          </div>
        </button>
      </section>
    </aside>
  );
}
