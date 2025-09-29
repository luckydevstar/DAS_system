import CRBChecks from "@/components/profile/driving-info/crb-checks/CRBChecks";
import TabNav from "@/components/profile/driving-info/tab-nav/TabNav";
import Nav from "@/components/profile/nav/Nav";
import UserInfo from "@/components/profile/user-info/UserInfo";
import { Fragment, Suspense } from "react";

const References = () => {
    return (
        <Fragment>
            <Nav>
                <Suspense fallback={<div className="h-9 w-[260px]" />} >
                    <div className="h-9" />
                </Suspense>
            </Nav>
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-8">
                    <UserInfo />
                    <CRBChecks />
                </div>
            </div>
        </Fragment >
    )
}

export default References;