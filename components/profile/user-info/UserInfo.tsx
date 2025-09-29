import { Button } from "@/components/ui/button";
import { CirclePlay, CirclePlus, ExternalLink, Globe, Info, Mail } from "lucide-react";

const USER_INFO = {
    name: "Simon Sample",
    role: "Long-Haul Driver",
    location: "London, UK",
    website: "simonlonghauldriving.com",
    cpcStatus: {
        name: "Simon Sample",
        licenceMumber: "SMITJ7012345A99BC",
        cardNumber: "1234 5678 9012",
        status: "Active",
        expiryDate: "15/09/2029",
        trainingHoursCompleted: "35/35 hours",
        modulesCompleted: "5/5",
        trainingPeriod: "16/09/2024 - 15/09/2029",
        nextRenewalDue: "15/09/2029"
    }
}

const UserInfo = () => {
    return (
        <div className="relative px-4 py-7 w-80 shrink-0 rounded-2xl shadow-md bg-white mt-15 h-max">
            <div className="absolute flex flex-col justify-center gap-2 items-center bottom-full mb-10">
                <div className="rounded-full w-34 h-34 border border-white">
                    <img src="/images/avatar.jpg" alt="avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-2xl font-semibold">{USER_INFO.name}</h3>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                        <Info size={16} />
                        <span>{USER_INFO.role}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe size={16} />
                        <span>{USER_INFO.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ExternalLink size={16} />
                        <span className="font-semibold">{USER_INFO.website}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-[10px] pb-2">
                    <Button className="w-full bg-[#76A0B5] hover:bg-[#76A0B5] cursor-pointer py-2 text-white">
                        <CirclePlus size={16} />
                        <span>Add Friend</span>
                    </Button>
                    <Button className="w-full bg-[#76A0B540] hover:bg-[#76A0B540] cursor-pointer py-2 text-[#76A0B5]">
                        <Mail size={16} />
                        <span>Message</span>
                    </Button>
                </div>
                <div className="w-full relative">
                    <img src="/images/working-image.jpg" className="w-full h-auto" />
                    <div className="absolute top-0 w-full h-full hover:bg-black/20 transition duration-75 cursor-pointer flex items-center justify-center">
                        <CirclePlay size={56}  className="text-white" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-6">
                    <img src={"/images/das-card.png"} className="w-full h-auto" />
                    <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-bold">Diver CPC Status</h4>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <span className="text-sm font-bold mr-1">Driver Name:</span>
                                <span>{USER_INFO.cpcStatus.name}</span>
                            </li>
                            <li>
                                <span className="text-sm font-bold mr-1">Licence Number:</span>
                                <br />
                                <span>{USER_INFO.cpcStatus.licenceMumber}</span>
                            </li>
                            <li>
                                <span className="text-sm font-bold mr-1">Driver CPC Card Number:</span>
                                <br />
                                <span className="block text-left">{USER_INFO.cpcStatus.cardNumber}</span>
                            </li>
                        </ul>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold">Status:</span>
                            <span>{USER_INFO.cpcStatus.status}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold">Card Expiry Date:</span>
                            <span>{USER_INFO.cpcStatus.expiryDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold">Training Hours Completed:</span>
                            <span>{USER_INFO.cpcStatus.trainingHoursCompleted}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold">Modules Completed:</span>
                            <span>{USER_INFO.cpcStatus.modulesCompleted}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold">Training Period:</span>
                            <span>{USER_INFO.cpcStatus.trainingPeriod}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold">Next Renewel Due:</span>
                            <span>{USER_INFO.cpcStatus.nextRenewalDue}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;