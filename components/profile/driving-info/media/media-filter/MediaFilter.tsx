import { Search } from "lucide-react"

const MediaFilter = () => {
    return (
        <div className="flex justify-end gap-3 w-full h-9 items-center">
            <div className="w-52 h-8 rounded-sm px-3 py-2 bg-[#78788029] flex items-center gap-2">
                <Search size={14} />
                <input type="text" className="border-none text-xs outline-0" placeholder="Search" />
            </div>
        </div>
    )
}

export default MediaFilter;