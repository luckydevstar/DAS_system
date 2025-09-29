import CurrentProgress from "@/components/profile/driving-info/accreditations/current-progress/CurrentProgress";
import DigitalBadegs from "@/components/profile/driving-info/accreditations/digital-badges/DigitalBadges";
import DrvingInductions from "@/components/profile/driving-info/accreditations/driving-inductions/DrivingInductions";
import Nav from "@/components/profile/nav/Nav";
import UserInfo from "@/components/profile/user-info/UserInfo";
import { Fragment, Suspense } from "react";

const References = () => {
    return (
        <Fragment>
            <Nav>
                <Suspense fallback={<div className="h-9 w-[260px]" />} >
                    <div className="h-9" />
                </Suspense>
            </Nav>
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-8">
                    <UserInfo />
                    <div className="flex flex-col gap-8">
                        <DigitalBadegs />
                        <CurrentProgress />
                        <DrvingInductions />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default References;