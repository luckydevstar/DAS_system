import React from "react";
import TabNav from "../driving-info/tab-nav/TabNav";

const Nav = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-7xl mx-auto sticky top-[90px] z-20 bg-[#FAFAFA] pt-4 py-8 flex gap-8 z-40">
            <div className="flex flex-col justify-center gap-2 items-center bottom-full w-80 shrink-0 -mt-28">
                <div className="rounded-full w-34 h-34 border border-white">
                    <img src="/images/avatar.jpg" alt="avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-2xl font-semibold">Simon Sample</h3>
            </div>
            <div className="flex-1 flex flex-col">
                {children}
                <TabNav />
            </div>
        </div>
    );
};

export default Nav;
