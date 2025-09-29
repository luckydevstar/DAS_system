import Image from "next/image";
import { Settings } from "lucide-react";
import { Fragment } from "react";

const Header = () => {
    return (
        <Fragment>
            <Image width={210} height={210} alt="logo" src="/images/logo.png" className="fixed top-2 left-[50vw] transform -translate-x-1/2 z-50" />
            <div className="h-[90px] bg-white flex items-center justify-end px-10 sticky top-0 z-30" >
                <div className="px-4 py-1.5 border border-black/50 rounded-md cursor-pointer hover:bg-black/5">
                    <Settings size={24} />
                </div>
            </div>
        </Fragment>
    );
};

export default Header;
