"use client"

import React, { Fragment, useState } from "react"
import PostDetailItem1 from "./items/Item1"
import PostDetailItem2 from "./items/Item2"
import PostDetailItem3 from "./items/Item3"
import MediaItem, { MediaItemType } from "./MediaItem"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const mediaList: MediaItemType[] = [
    {
        serviceTitle: "Changing a Tyre",
        serviceProvider: "Simon Sample",
        coverImage: "/images/posts/post1-1.jpg",
        postNode: <PostDetailItem1 />
    },
    {
        serviceTitle: "HGV Service",
        serviceProvider: "Simon Sample",
        coverImage: "/images/posts/post2.jpg",
        postNode: <PostDetailItem2 />
    },
    {
        serviceTitle: "Container Loading Operation",
        serviceProvider: "Simon Sample",
        coverImage: "/images/posts/post3-1.jpg",
        postNode: <PostDetailItem3 />
    },
]

const MediaList = () => {
    const [activeMedia, setActiveMedia] = useState<MediaItemType>();
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <Fragment>
            <div className="grid grid-cols-2 gap-5">
                {
                    mediaList.map((item, idx) => {
                        return (
                            <div className="col-span-1" key={idx}>
                                <MediaItem
                                    media={item}
                                    key={idx}
                                    onClick={() => { setActiveMedia(item); setVisible(true); }}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <Dialog open={visible} onOpenChange={setVisible}>
                <DialogContent
                    className="sm:max-w-[90vw] max-w-[80vw] w-[80vw] h-[95vh] p-8"
                >
                    <div className="flex h-full flex-col overflow-auto">
                        <DialogHeader className="px-24 pt-16 hidden">
                            <DialogTitle>{activeMedia?.serviceTitle}</DialogTitle>
                        </DialogHeader>

                        <div className="flex-1 overflow-auto p-4">
                            {activeMedia?.postNode ?? null}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>


        </Fragment>
    )
}

export default MediaList;