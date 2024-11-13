import Image from 'next/image';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { GoBell } from "react-icons/go";

const Header = () => (
  <header className="w-full bg-gray-200 fixed py-4 px-6 flex items-center justify-between z-50">
    {/* Logo and Title */}
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-[#7662e9] rounded-lg flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </div>
      <span className="text-[#1c1f24] text-3xl font-semibold">Sunstone</span>
    </div>

    {/* Search Bar */}
    <div className="relative flex-1 max-w-md mx-auto">
      <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 bg-transparent rounded-xl text-sm text-gray-600 placeholder-gray-500 outline-none"
        placeholder="Search..."
      />
    </div>

    {/* Notifications and Profile */}
    <div className="flex items-center gap-3">
      <GoBell className="text-[#1c1f24] w-6 h-6" />
      <div className="flex px-3.5 py-1.5 bg-white rounded-xl items-center gap-3">
        <div className="w-8 h-8 bg-[#4c0606] rounded-full overflow-hidden">
          <Image alt="Profile" width={34} height={34} src="https://via.placeholder.com/34x34" />
        </div>
        <div className="flex items-center cursor-pointer">
          <div>
            <div className="text-md font-medium text-[#1c1f24]">Alexander</div>
            <div className="text-sm text-[#6b6e74]">Admin</div>
          </div>
          <MdKeyboardArrowDown className="ml-8 text-[#6b6e74]" />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
