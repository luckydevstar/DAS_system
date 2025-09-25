import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header"
import DrivingFootprint from "@/components/profile/driving-info/experience/driving-footprint/DrivingFootprint";
import HighwayTypeDriving from "@/components/profile/driving-info/experience/highway-type-driving/HighwayTypeDriving";
import TotalHoursGauge from "@/components/profile/driving-info/experience/total-hours-guage/TotalHoursGauge";
import OperationalHours from "@/components/profile/driving-info/experience/operational-hours/OperationalHours";
import TabNav from "@/components/profile/driving-info/tab-nav/TabNav";
import Filter from "@/components/profile/driving-info/experience/filter/ExperienceFilter";
import UserInfo from "@/components/profile/user-info/UserInfo";
import React from "react";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#fafafa]">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Page;