import DrivingFootprint from "@/components/profile/driving-info/experience/driving-footprint/DrivingFootprint"
import ExperienceFilter from "@/components/profile/driving-info/experience/filter/ExperienceFilter"
import HighwayTypeDriving from "@/components/profile/driving-info/experience/highway-type-driving/HighwayTypeDriving"
import OperationalHoursLegacy from "@/components/profile/driving-info/experience/operational-hours/OperationalHours"
import TotalHoursGaugeApex from "@/components/profile/driving-info/experience/total-hours-guage/TotalHoursGauge"
import TabNav from "@/components/profile/driving-info/tab-nav/TabNav"
import Nav from "@/components/profile/nav/Nav"
import UserInfo from "@/components/profile/user-info/UserInfo"
import { Fragment } from "react"

const Experience = () => {
    return (
        <Fragment>
            <Nav>
                <ExperienceFilter />
            </Nav>
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-8 w-full">
                    <UserInfo />
                    <div className="flex flex-col gap-8 w-full">
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