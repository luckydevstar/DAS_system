"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const ActiveTabItem = ({ title, slug }: { title: string, slug: string }) => {
    return (
        <li className="me-2">
            <Link href={slug} className="inline-block py-4 px-2 text-black border-b-2 border-black rounded-t-lg active" aria-current="page">{title}</Link>
        </li>
    )
}

const TabItem = ({ title, slug }: { title: string, slug: string }) => {
    return (
        <li className="me-2">
            <Link href={slug} className="inline-block py-4 px-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">{title}</Link>
        </li>
    )
}

const NAV_LIST = [
    {
        title: "Experience",
        slug: "experience"
    },
    {
        title: "Accreditations",
        slug: "accreditations"
    },
    {
        title: "References",
        slug: "references"
    },
    {
        title: "Media",
        slug: "media"
    },
    {
        title: "CRB Checks",
        slug: "crb-checks"
    },
    {
        title: "Health Checks",
        slug: "health-checks"
    },
    {
        title: "CV",
        slug: "#"
    }
]

const TabNav = () => {
    const pathname = usePathname();

    const isActive = (slug: string) => {
        return pathname.split("/").includes(slug)
    };

    return (
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 w-full mt-0">
            <ul className="flex flex-wrap -mb-px">
            {
                NAV_LIST.map((item, idx) => {
                    if (isActive(item.slug)) {
                        return (
                            <ActiveTabItem key={idx} slug={item.slug} title={item.title} />
                        )
                    } else {
                        return (
                            <TabItem key={idx} slug={item.slug} title={item.title} />
                        )
                    }
                })
            }
            </ul>
        </div>
    )
}

export default TabNav;
