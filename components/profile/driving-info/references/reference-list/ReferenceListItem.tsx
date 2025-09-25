import ReferenceCard from "./ReferenceCard";

export type ReferenceListItemType = {
    photoUrl: string;
    companyLogoUrl: string;
    date: string;
    name: string;
    title: string;
    website: string;
    address: string;
    intro: string;
    videoUrl: string;
}

const ReferenceListItem = (item: ReferenceListItemType) => {
    return (
        <ReferenceCard {...item} />
    )
}

export default ReferenceListItem;