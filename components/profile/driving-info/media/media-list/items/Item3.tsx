import { PlayCircle } from "lucide-react"

const PostDetailItem3 = () => {
    return (
        <div className="pt-10 pb-4 px-8 w-full">
            <h1 className="text-4xl font-black mb-4">Container Loading Operation</h1>
            <div className="w-full px-20 py-8 relative">
                <img src="/images/posts/post3-1.jpg" className="w-full sm:h-[340px] md:h-[420px] lg:h-[500px] xl:h-[600px] object-cover" />
                <PlayCircle size={200} className="absolute left-1/2 top-1/2 text-white transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="w-full py-8 grid grid-cols-2 gap-8">
                <img src="/images/posts/post3-2.jpg" className="w-full sm:h-[340px] md:h-[420px] lg:h-[500px] xl:h-[600px] object-cover col-span-1" />
                <div className="space-y-2 col-span-1 h-full w-full flex flex-col justify-center">
                    <p className="text-base">
                        {`In this image, we are looking at container loading operations at a shipping yard:`}
                    </p>
                    <ul className="text-base">
                        <li>
                            {`A lorry (HGV) with a flatbed trailer is parked in position while a large container handling machine (a reach stacker or container handler) carefully lowers a yellow shipping container onto the trailer.`}
                        </li>
                        <li>
                            {`Two workers wearing high-visibility safety vests and hard hats are standing nearby, supervising the operation. One appears to be giving hand signals or instructions, coordinating with the machine operator to ensure the container is safely aligned.`}
                        </li>
                        <li>
                            {`In the background, there are stacks of yellow and white shipping containers, showing that this is an active freight or logistics hub, likely linked to shipping or rail transport.`}
                        </li>
                        <li>
                            {`The setup highlights safety and teamwork: the ground crew oversees positioning, while the heavy machinery operator handles the container.`}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full px-20 py-8">
                <img src="/images/posts/post3-3.jpg" className="w-full sm:h-[340px] md:h-[420px] lg:h-[500px] xl:h-[600px] object-cover" />
            </div>
        </div>
    )
}

export default PostDetailItem3;
