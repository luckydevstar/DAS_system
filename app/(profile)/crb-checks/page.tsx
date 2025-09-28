import CRBChecks from "@/components/profile/driving-info/crb-checks/CRBChecks";
import TabNav from "@/components/profile/driving-info/tab-nav/TabNav";
import UserInfo from "@/components/profile/user-info/UserInfo";
import { Suspense } from "react";

const References = () => {
    return (
        <div className="max-w-7xl mx-auto py-9">
            <Suspense fallback={<div className="h-9 w-[260px]" />} >
                <div className="h-9" />
            </Suspense>
            <div className="flex gap-8">
                <UserInfo />
                <div className="flex flex-col flex-1 gap-8">
                    <TabNav />
                    <CRBChecks />
                </div>
            </div>
        </div>
    )
}

export default References;