import Header from "@/components/header/Header"
import Filter from "@/components/profile/filter/Filter";
import UserInfo from "@/components/profile/user-info/UserInfo";

const Page = () => {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto py-9">
        <Filter />
        <div className="flex gap-8">
          <UserInfo />
        </div>
      </div>
    </div>
  )
}

export default Page;