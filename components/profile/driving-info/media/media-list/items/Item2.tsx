import { PlayCircle } from "lucide-react"

const PostDetailItem2 = () => {
    return (
        <div className="pt-10 pb-4 px-8 w-full">
            <h1 className="text-4xl font-black mb-4">HGV Service</h1>
            <div className="space-y-2">
                <p className="text-base">
                    {`In this video, the HGV (lorry) is undergoing a service check at the inspection bay.`}
                </p>
                <ul className="text-base">
                    <li>
                        {`The vehicle is parked in a designated service lane, marked with STOP on the ground, ensuring it’s in the correct position for inspection.`}
                    </li>
                    <li>
                        {`Technicians in high-visibility vests are carrying out the service work:`}
                    </li>
                    <li>
                        <ul>
                            <li>
                                {`Two are on top of the lorry, checking access hatches or equipment (likely inspecting or maintaining the roof area, such as refrigeration units, air systems, or load covers).`}
                            </li>
                            <li>
                                {`Another is at the side, guiding the process and possibly checking external fittings, mirrors, or communication with the driver.`}
                            </li>
                        </ul>
                    </li>
                    <li>
                       {`The raised concrete platforms on either side give safe access to higher parts of the lorry, showing that this facility is designed for routine maintenance, safety checks, or loading inspections.`} 
                    </li>
                    <li>
                        {`The driver is seated in the cab, keeping the vehicle secure while the technicians work.`}
                    </li>
                </ul>
            </div>
            <div className="w-full px-20 py-8 relative">
                <img src="/images/posts/post2.jpg" className="w-full sm:h-[340px] md:h-[420px] lg:h-[500px] xl:h-[600px] object-cover" />
                <PlayCircle size={200} className="absolute left-1/2 top-1/2 text-white transform -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    )
}

export default PostDetailItem2;
