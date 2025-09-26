import ReferenceListItem from "./ReferenceListItem"

const referenceList = [
    {
        name: "John Miller",
        title: "Long-Haul (HGV) Driver",
        date: "19 May 2024",
        photoUrl: "/images/users/john_miller_test.jpg",
        videoUrl: "/images/users/john_miller_test.jpg",
        companyLogoUrl: "/images/logos/asda_logo.jpg",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
        intro: `I am writing in support of Simon Sample. They are a dependable, honest, and hardworking individual. They have consistently shown reliability in meeting schedules, safety in their driving, and respect in their dealings with colleagues and customers. I have no doubt they will be a positive asset to any employer.`
    },
    {
        name: "Barry Kulner",
        title: "Multi-Drop Delivery Driver",
        date: "02 Jun 2024",
        photoUrl: "/images/users/barry_kulner.jpg",
        videoUrl: "",
        companyLogoUrl: "/images/logos/royal_mail_logo.png",
        website: "https://royalmail.com",
        address: "185 Farringdon Rd London, eng EC1A 1AA",
        intro: `I had the pleasure of supervising Simon Sample during their time with us. Their responsibilities included the safe and timely transport of goods, vehicle checks and maintenance, and communication with dispatch teams. <br />
                <b>Simon Sample consistently exceeded expectations in their role, demonstrating:</b> <br />
                A flawless safety and driving record. <br />
                Dependability, even with overnight and cross-country routes. <br />
                Flexibility to adapt to changing schedules and road conditions. <br />
                Strong teamwork, supporting colleagues and training new drivers.`
    },
    {
        name: "Tim Lewis",
        title: "Tanker Driver",
        date: "18 Aug 2024",
        photoUrl: "/images/users/tim_lewis.jpg",
        videoUrl: "/images/users/tim_lewis.jpg",
        companyLogoUrl: "/images/logos/royal_mail_logo.png",
        website: "https://royalmail.com",
        address: "185 Farringdon Rd London, eng EC1A 1AA",
        intro: `I am pleased to provide a reference for Simon Sample. <br />
                <b>Their key skills include:</b> <br />
                Excellent HGV driving competence and route management. <br />
                Strong understanding of road safety and compliance with transport regulations. <br />
                Time management and the ability to meet strict delivery schedules. <br />
                Positive communication with warehouse teams, clients, and customers. <br />
                I believe Simon Sample would be a valuable addition to any logistics or transport team.`
    },
    {
        name: "Kyle Grey",
        title: "Transport Manager",
        date: "22 Aug 2024",
        photoUrl: "/images/users/kyle_grey.jpg",
        videoUrl: "/images/users/kyle_grey.jpg",
        companyLogoUrl: "/images/logos/asda_logo.jpg",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
        intro: `I have known Simon Sample for 9 years in their role as a long-haul driver. They are trustworthy, hardworking, and always conduct themselves with integrity.
                They take pride in their work, maintain a strong commitment to safety, and treat colleagues and customers with respect. I am confident they will bring the same reliability and dedication to any future role.`
    },
    {
        name: "Jenny Smith",
        title: "Fleet Manager",
        date: "16 Sep 2024",
        photoUrl: "/images/users/jenny_smith.jpg",
        videoUrl: "",
        companyLogoUrl: "/images/logos/asda_logo.jpg",
        website: "https://Asda.com",
        address: "Asda House, South Bank, Great Wilson Street, Leeds, LS11 5AD",
        intro: `During Simon Sample's time with us, he demonstrated excellent driving skills, punctuality, and professionalism. <br />
                They have a clean safety record and have always completed their deliveries reliably. I recommend them for any similar role without hesitation.`
    },
    {
        name: "Mary Lupin",
        title: "Logistics Operations Supervisor",
        date: "20 Jul 2025",
        photoUrl: "/images/users/mary_lupin.jpg",
        videoUrl: "",
        companyLogoUrl: "/images/logos/gxo_logo.png",
        website: "https://gxo.com",
        address: "Lancaster House, Nunn Mills Road, Northampton, United Kingdom, NN1 5GE",
        intro: `I am writing to provide a reference for Simon Sample. <br/>
                During this time, he has consistently demonstrated professionalism, reliability, and a strong commitment to safety. Their role involved the long-distance transportation of goods across the UK, ensuring deliveries were made on time and in excellent condition. <br />
                <b>Key strengths I observed include:</b> <br />
                <b>Safe driving record:</b> Maintained excellent road awareness and adhered strictly to all transport and health & safety regulations. <br />
                <b>Reliability and punctuality:</b> Always met delivery schedules, even under tight deadlines. <br />
                <b>Professionalism:</b> Represented ASDA in a positive and courteous manner when dealing with customers, colleagues, and external partners. <br />
                <b>Teamwork and communication:</b> Worked well with the logistics team and was proactive in reporting any issues or delays. <br />
                <b>Adaptability:</b> Handled varied routes, long hours, and changing circumstances with efficiency and resilience. <br />
                I have no hesitation in recommending Simon Sample for any future driving position. They would be an asset to any organisation requiring a skilled, dependable, and professional driver.`
    }
]

const ReferenceList = () => {
    const sortedList = [...referenceList].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    });

    return (
        <div className="grid grid-cols-3 gap-2">
            {
                sortedList.map((item, idx) => {
                    return (
                        <ReferenceListItem {...item} key={idx} />
                    )
                })
            }
        </div>
    )
}

export default ReferenceList;