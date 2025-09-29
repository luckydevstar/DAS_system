import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header"
import DrivingFootprint from "@/components/profile/driving-info/experience/driving-footprint/DrivingFootprint";
import HighwayTypeDriving from "@/components/profile/driving-info/experience/highway-type-driving/HighwayTypeDriving";
import TotalHoursGauge from "@/components/profile/driving-info/experience/total-hours-guage/TotalHoursGauge";
import OperationalHours from "@/components/profile/driving-info/experience/operational-hours/OperationalHours";
import UserInfo from "@/components/profile/user-info/UserInfo";
import Nav from "@/components/profile/nav/Nav";
import ExperienceFilter from "@/components/profile/driving-info/experience/filter/ExperienceFilter";

const Page = () => {
  return (
    <div className="bg-[#fafafa]">
      <Header />
      <div className="h-[160px] bg-[#76A0B5]" />
      <Nav>
        <ExperienceFilter />
      </Nav>
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8 w-full">
          <UserInfo />
          <div className="flex flex-col gap-8 w-full">
            <div className="flex gap-8">
              <TotalHoursGauge day={3424} night={1078} />
              <HighwayTypeDriving day={3424} night={1078} />
            </div>
            <DrivingFootprint />
          </div>
        </div>
        <OperationalHours />
      </div>
      <Footer />
    </div>
  )
}

export default Page;