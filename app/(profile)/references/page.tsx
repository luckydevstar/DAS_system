import ReferencesFilter from "@/components/profile/driving-info/references/reference-filter/ReferencesFilter";
import ReferenceCard from "@/components/profile/driving-info/references/reference-list/ReferenceCard";
import ReferenceList from "@/components/profile/driving-info/references/reference-list/ReferenceList";
import ReferenceListItem from "@/components/profile/driving-info/references/reference-list/ReferenceListItem";
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
                    <ReferenceList />
                </div>
            </div>
        </div>
    )
}

export default References;