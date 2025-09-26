import React from "react";

export type MediaItemType = {
    serviceTitle: string;
    serviceProvider: string;
    coverImage: string;
    postNode: React.ReactNode;
}

interface MediaItemProps {
    media: MediaItemType;
    onClick: () => void
}

const MediaItem = ({media, onClick}: MediaItemProps) => {
    return (
        <div className="w-full h-80 rounded-sm shadow-sm group relative cursor-pointer" onClick={onClick}>
            <img src={media.coverImage} className="w-full h-full object-cover absolute left-0 top-0" />
            <div className="w-full flex flex-col h-18 bg-linear-to-t from-black/50 to-black/0 absolute bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300 px-4 py-3 gap-1">
                <h3 className="text-lg text-white font-bold">{media.serviceTitle}</h3>
                <h4 className="text-xs text-white font-semibold">{media.serviceProvider}</h4>
            </div>
        </div>
    )
}

export default MediaItem;
