import ReferencesFilter from "@/components/profile/driving-info/references/reference-filter/ReferencesFilter";
import ReferenceList from "@/components/profile/driving-info/references/reference-list/ReferenceList";
import TabNav from "@/components/profile/driving-info/tab-nav/TabNav";
import Nav from "@/components/profile/nav/Nav";
import UserInfo from "@/components/profile/user-info/UserInfo";
import { Fragment, Suspense } from "react";

const References = () => {
    return (
        <Fragment>
            <Nav>
                <Suspense fallback={<div className="h-9 w-[260px]" />} >
                    <ReferencesFilter />
                </Suspense>
            </Nav>
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-8">
                    <UserInfo />
                    <div className="flex flex-col flex-1 gap-8">
                        <ReferenceList />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default References;