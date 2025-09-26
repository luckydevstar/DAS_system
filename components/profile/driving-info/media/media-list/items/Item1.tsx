import { PlayCircle } from "lucide-react"

const PostDetailItem1 = () => {
    return (
        <div className="pt-10 pb-4 px-8 w-full">
            <h1 className="text-4xl font-black mb-4">Changing a Tyre</h1>
            <div className="w-full px-20 py-8">
                <img src="/images/posts/post1-1.jpg" className="w-full sm:h-[340px] md:h-[420px] lg:h-[500px] xl:h-[600px] object-cover" />
            </div>
            <div className="space-y-2">
                <p className="text-base">
                    {`First things first—safety. Make sure the lorry’s parked on firm, level ground and put the handbrake on. Switch on your hazard lights and set out warning triangles if you’re on the roadside. Before you touch anything, you’ll need heavy-duty wheel chocks behind the other tyres so the lorry doesn’t roll.`}
                </p>
                <p className="text-base">
                    {`Next, loosen the wheel nuts slightly with a long breaker bar while the wheel’s still on the ground—you don’t want it spinning in the air. Don’t take them off completely yet, just crack them loose.`}
                </p>
                <p className="text-base">
                    {`Now, you’ll need a proper jack rated for lorries, usually an air or hydraulic jack. Position it under the designated jacking point on the axle and start lifting slowly until the faulty tyre is clear off the ground.`}
                </p>
                <p className="text-base">
                    {`Once it’s up, remove the loosened wheel nuts fully and carefully pull the wheel off—it’s heavy, so mind your back and get a second pair of hands if possible. Roll the old tyre away and bring in the spare. Line it up with the studs, push it on, then refit the nuts by hand to make sure they’re not cross-threaded.`}
                </p>
                <p className="text-base">
                    {`Tighten the nuts in a crisscross pattern to seat the wheel evenly, but only snug them up for now. Lower the lorry back down until the tyre makes firm contact with the ground, then torque the nuts to the correct setting with a calibrated torque wrench.`}
                </p>
                <p className="text-base">
                    {`Finally, remove the jack, take away the chocks, and stow your tools. Always recheck the wheel nuts after about 30 miles of driving, just to be safe.”`}
                </p>
            </div>
            <div className="w-full px-20 py-8 relative">
                <img src="/images/posts/post1-2.jpg" className="w-full sm:h-[340px] md:h-[420px] lg:h-[500px] xl:h-[600px] object-cover" />
                <PlayCircle size={200} className="absolute left-1/2 top-1/2 text-white transform -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    )
}

export default PostDetailItem1;
