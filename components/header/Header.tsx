import Image from "next/image";
import { Button } from "../ui/button";

import { Settings } from "lucide-react";

const Header = () => {
    return (
        <div>
            <div className="h-[90px] bg-white relative flex items-center justify-end px-10">
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
                    <Image className="" width={210} height={210} alt="logo" src="/images/logo.png" />
                </div>
                <div className="px-4 py-1.5 border border-black/50 rounded-md cursor-pointer hover:bg-black/5">
                    <Settings size={24} />
                </div>
            </div>
            <div className="h-[160px] bg-[#76A0B5]"></div>
        </div>
    )
}

export default Header;
