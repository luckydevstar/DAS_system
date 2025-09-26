import { Suspense } from "react";
import MediaFilter from "@/components/profile/driving-info/media/media-filter/MediaFilter";
import MediaList from "@/components/profile/driving-info/media/media-list/MediaList";
import TabNav from "@/components/profile/driving-info/tab-nav/TabNav";
import UserInfo from "@/components/profile/user-info/UserInfo";

const Media = () => {
    return (
        <div className="max-w-7xl mx-auto py-9">
            <Suspense fallback={<div className="h-9 w-[260px]" />} >
                <MediaFilter />
            </Suspense>
            <div className="flex gap-8">
                <UserInfo />
                <div className="flex flex-col flex-1 gap-8">
                    <TabNav />
                    <MediaList />
                </div>
            </div>
        </div>
    )
}

export default Media;