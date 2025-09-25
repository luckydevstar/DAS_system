import ReferencesFilter from "@/components/profile/driving-info/references/reference-filter/ReferencesFilter";
import TabNav from "@/components/profile/driving-info/tab-nav/TabNav";
import UserInfo from "@/components/profile/user-info/UserInfo";

const References = () => {
    return (
        <div className="max-w-7xl mx-auto py-9">
            <ReferencesFilter />
            <div className="flex gap-8">
                <UserInfo />
                <div className="flex flex-col flex-1 gap-8">
                    <TabNav />
                    
                </div>
            </div>
        </div>
    )
}

export default References;