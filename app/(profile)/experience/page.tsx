import DrivingFootprint from "@/components/profile/driving-info/experience/driving-footprint/DrivingFootprint"
import ExperienceFilter from "@/components/profile/driving-info/experience/filter/ExperienceFilter"
import HighwayTypeDriving from "@/components/profile/driving-info/experience/highway-type-driving/HighwayTypeDriving"
import OperationalHoursLegacy from "@/components/profile/driving-info/experience/operational-hours/OperationalHours"
import TotalHoursGaugeApex from "@/components/profile/driving-info/experience/total-hours-guage/TotalHoursGauge"
import TabNav from "@/components/profile/driving-info/tab-nav/TabNav"
import UserInfo from "@/components/profile/user-info/UserInfo"
import { Fragment } from "react"

const Experience = () => {
    return (
        <Fragment>
            <div className="max-w-7xl mx-auto py-9">
                <ExperienceFilter />
                <div className="flex gap-8">
                    <UserInfo />
                    <div className="flex flex-col flex-1 gap-8">
                        <TabNav />
                        <div className="flex gap-8">
                            <TotalHoursGaugeApex day={3424} night={1078} />
                            <HighwayTypeDriving day={3424} night={1078} />
                        </div>
                        <DrivingFootprint />
                    </div>
                </div>
                <OperationalHoursLegacy />
            </div>
        </Fragment>
    )
}

export default Experience;