import ReferenceListItem from "./ReferenceListItem"

const referenceList = [
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
    },
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
    },
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
    },
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
    },
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
    },
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
    }
]

const ReferenceList = () => {
    return (
        <div className="grid grid-cols-2 gap-8">
            {
                referenceList.map((item, idx) => {
                    return (
                        <ReferenceListItem {...item} key={idx} />
                    )
                })
            }
        </div>
    )
}

export default ReferenceList;