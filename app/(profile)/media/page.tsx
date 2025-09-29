import { Fragment, Suspense } from "react";
import MediaFilter from "@/components/profile/driving-info/media/media-filter/MediaFilter";
import MediaList from "@/components/profile/driving-info/media/media-list/MediaList";
import TabNav from "@/components/profile/driving-info/tab-nav/TabNav";
import UserInfo from "@/components/profile/user-info/UserInfo";
import Nav from "@/components/profile/nav/Nav";

const Media = () => {
    return (
        <Fragment>
            <Nav>
                <Suspense fallback={<div className="h-9 w-[260px]" />} >
                    <MediaFilter />
                </Suspense>
            </Nav>
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-8">
                    <UserInfo />
                    <div className="flex flex-col flex-1 gap-8">
                        <MediaList />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Media;