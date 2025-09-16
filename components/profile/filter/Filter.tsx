import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Filter = () => {
    return (
        <div className="flex justify-end gap-3 w-full">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="px-2 py-1 border border-[#76A0B5] text-[#0F0F0F] font-normal">
                        Vehicle Type <ChevronDown size={16} />
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="px-2 py-1 border border-[#76A0B5] text-[#0F0F0F] font-normal">
                        Select Make <ChevronDown size={16} />
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="px-2 py-1 border border-[#76A0B5] text-[#0F0F0F] font-normal">
                        Select Model <ChevronDown size={16} />
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>

            <Button className="bg-[#76A0B5] border border=[#76A0B5]">Filter</Button>
        </div>
    )
}

export default Filter;
