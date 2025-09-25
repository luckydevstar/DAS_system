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
        intro: "I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly... I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly..."
    },
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
        intro: "I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly... I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly..."
    },
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
        intro: "I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly... I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly..."
    },
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
        intro: "I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly... I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly..."
    },
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
        intro: "I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly... I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly..."
    },
    {
        name: "Bill Hunter",
        title: "Fleet Manager",
        date: "25 Aug 2025",
        photoUrl: "/images/man.jpg",
        companyLogoUrl: "https://dummyimage.com/80x80/ffffff/007fa3.png&text=Logo",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
        intro: "I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly... I had the pleasure of working with Simon, where they served as a Logistics Assistant. He is dependable, hardworking, and always willing to go the extra mile to make sure deliveries and stock management were handled smoothly..."
    }
]

const ReferenceList = () => {
    return (
        <div className="grid grid-cols-3 gap-2">
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