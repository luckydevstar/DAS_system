import Header from "@/components/header/Header"
import DrivingFootprint from "@/components/profile/driving-info/experience/DrivingFootprint/DrivingFootprint";
import HighwayTypeDriving from "@/components/profile/driving-info/experience/HighwayTypeDriving/HighwayTypeDriving";
import TotalHoursGauge from "@/components/profile/driving-info/experience/TotalHoursGauge/TotalHoursGauge";
import TabNav from "@/components/profile/driving-info/tab-nav/TabNav";
import Filter from "@/components/profile/filter/Filter";
import UserInfo from "@/components/profile/user-info/UserInfo";

const Page = () => {
  return (
    <div className="bg-[#fafafa]">
      <Header />
      <div className="max-w-7xl mx-auto py-9">
        <Filter />
        <div className="flex gap-8">
          <UserInfo />
          <div className="flex flex-col flex-1 gap-8">
            <TabNav />
            <div className="flex gap-8">
              <TotalHoursGauge day={3424} night={1078} />
              <HighwayTypeDriving day={3424} night={1078} />
            </div>
            <DrivingFootprint />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;