import { Button } from "@/components/ui/button";

const VEHICLE_TABS: { id: string; label: string; icon?: string }[] = [
    { id: 'motorcycle', label: 'Motorcycle', icon: '/images/nav/motorcycle.png' },
    { id: 'car', label: 'Car', icon: '/images/nav/car.png' },
    { id: 'delivery-truck', label: 'Delivery', icon: '/images/nav/delivery-truck.png' },
    { id: 'minibus', label: 'Minibus', icon: '/images/nav/minibus.png' },
    { id: 'motor-home', label: 'Motor-home', icon: '/images/nav/motor-home.png' },
    { id: 'truck', label: 'Truck', icon: '/images/nav/truck.png' },
    { id: 'lorry', label: 'Lorry', icon: '/images/nav/lorry.png' },
    { id: 'double-lorry', label: 'Double', icon: '/images/nav/double-lorry.png' },
    { id: 'tracktor', label: 'Tractor', icon: '/images/nav/tracktor.png' }, // matches your file name
];

const OperationalHours = () => {
    return (
        <div className="mt-8 shadow-md bg-white rounded-md p-6">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold">Breakdown of Operational Hours</h4>
                <div className="flex items-center justify-end gap-6">
                    <Button variant="outline" className="text-xs h-8 cursor-pointer">
                        All
                    </Button>
                    {
                        VEHICLE_TABS.map((item) => {
                            return (
                                <div className="cursor-pointer" key={item.id}>
                                    <img src={item.icon} className="h-6 w-auto" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default OperationalHours;
