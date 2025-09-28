import CurrentProgress from "@/components/profile/driving-info/accreditations/current-progress/CurrentProgress";
import DigitalBadegs from "@/components/profile/driving-info/accreditations/digital-badges/DigitalBadges";
import DrvingInductions from "@/components/profile/driving-info/accreditations/driving-inductions/DrivingInductions";
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
                    <div className="flex flex-col gap-8">
                        <DigitalBadegs />
                        <CurrentProgress />
                        <DrvingInductions />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default References;