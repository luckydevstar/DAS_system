import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

const checksData = [
    {
        dataOfIssue: "17 NOVEMBER 2024",
        records: [
            {
                title: "Police Records of Convictions, Cautions, Reprimands and Warnings",
                data: []
            },
            {
                title: "Information from the list under Section 142 of the Education Act 2002",
                data: []
            },
            {
                title: `ISA Children’s Barred List information`,
                data: []
            },
            {
                title: `ISA Vulnerable Adults’ Barred List information`,
                data: []
            },
            {
                title: "Other relevant information disclosed at the Chief Police Officer(s) discretion",
                data: []
            },
        ]
    },
    {
        dataOfIssue: "17 NOVEMBER 2024",
        records: [
            {
                title: "Police Records of Convictions, Cautions, Reprimands and Warnings",
                data: []
            },
            {
                title: "Information from the list under Section 142 of the Education Act 2002",
                data: []
            },
            {
                title: `ISA Children’s Barred List information`,
                data: []
            },
            {
                title: `ISA Vulnerable Adults’ Barred List information`,
                data: []
            },
            {
                title: "Other relevant information disclosed at the Chief Police Officer(s) discretion",
                data: []
            },
        ]
    }
]

const CRBChecks = () => {
    return (
        <div className="w-full -mt-[10px]">
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                {
                    checksData.map((item, idx) => {
                        return (
                            <AccordionItem value={`item-${idx + 1}`} key={idx} className="my-3 border-none">
                                <AccordionTrigger className="bg-white shadow-xs px-4 hover:no-underline cursor-pointer">
                                    <div className="flex gap-3 flex-col px-4">
                                        <h3 className="text-sm font-semibold text-[#76A0B5]">Date of Issue</h3>
                                        <div className="flex items-center gap-8 px-10 py-2">
                                            <span className="text-sm font-semibold">{item.dataOfIssue}</span>
                                            <span className="text-[#76A0B5] flex gap-1 items-center">
                                                <Download size={14} />
                                                Download
                                            </span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 pt-4">
                                    {
                                        (item?.records ?? []).map((r, idx) => {
                                            return (
                                                <div className="flex gap-3 flex-col px-4 border-b py-4" key={idx}>
                                                    <h3 className="text-sm font-semibold text-[#76A0B5]">{r.title}</h3>
                                                    <div className="flex items-center gap-8 px-10 py-2">
                                                        <span className="text-sm font-semibold">None Recorded</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </div>
    )
}

export default CRBChecks;
