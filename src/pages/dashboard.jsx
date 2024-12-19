"use client"

import AudioReactiveParticles from "../compnent/a3"
import CardLayout from "../compnent/CardLayoutTwo"
import ProfileCard from "../compnent/a";
import CardLeft from "../compnent/CardLeft";
import CardRight from "../compnent/CardRight";


const componentsConfig = [
    {
        isLayout: true,
        comp: ProfileCard,
        compProps: {
            title: "PROFILE",
            description: "This is the first card.",
        },
    },
];




export default function Dashboard() {
    return (
        <div className="min-h-screen bg-black p-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 auto-rows-min">
                {/* Top Row */}
                <div className="border-cyan-500/20 text-cyan-500">
                    <div className="flex items-center  text-white p-1">
                        {/* <CardLayout position="left" /> */}
                        <CardLeft/>
                    </div>
                    <div className="flex items-center  text-white p-1" style={{transform:"rotatex(180deg)"}}>
                        {/* <CardLayout position="left" /> */}
                        <CardLeft/>
                    </div>
                </div>

                <div className="border-cyan-500/20">
                    <div className="h-[500px] flex items-center justify-center">
                        <AudioReactiveParticles />
                    </div>
                </div>

                <div className=" border-cyan-500/20 text-cyan-500">
                    <div className="flex items-center justify-end  text-white p-1" style={{transform:"rotatey(180deg)"}}>
                        {/* <CardLayout position="left" /> */}
                        <CardRight/>
                    </div>
                    <div className="flex items-center justify-end text-white p-1" style={{transform: "rotateX(180deg) rotateY(180deg)"}}>
                        {/* <CardLayout position="left" /> */}
                        <CardRight/>
                    </div>
                </div>

                {/* Second Row */}


            </div>
            <div className="flex">
                <div className="flex flex-wrap">
                    <div className="border-cyan-500/20 text-cyan-500">
                        <div className="flex items-center text-white">
                            <CardLayout
                                cardTitle={"ATTENDANCE ANALYTICS"}
                                position="left"
                                componentsConfig={componentsConfig}
                                className="w-[531.46px] h-[214.5px] "
                            />
                        </div>
                    </div>

                    <div className="border-cyan-500/20 text-cyan-500">
                        <div className="flex items-center text-white">
                            <CardLayout
                                cardTitle={"REJECTION ANALYTICS"}
                                position="left"
                                componentsConfig={componentsConfig}
                                className="w-[667px] h-[214.5px]"
                            />
                        </div>
                    </div>

                    <div className="border-cyan-500/20 text-cyan-500">
                        <div className="flex items-center text-white">
                            <CardLayout
                                cardTitle={"MACHINE EFFICIENCY"}
                                position="left"
                                componentsConfig={componentsConfig}
                                className="w-[531.46px] h-[214.5px]"
                            />
                        </div>
                    </div>
                    <div className="border-cyan-500/20 text-cyan-500">
                        <div className="flex items-center text-white">
                            <CardLayout
                                cardTitle={"SHORTAGE REPORT"}
                                position="left"
                                componentsConfig={componentsConfig}
                                className="w-[531.46px] h-[214.5px]"
                            />
                        </div>
                    </div>
                    <div className="border-cyan-500/20 text-cyan-500">
                        <div className="flex items-center text-white">
                            <CardLayout
                                cardTitle={"DELAY HEATMAP"}
                                position="left"
                                componentsConfig={componentsConfig}
                                className="w-[531.46px] h-[214.5px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="border-cyan-500/20 text-cyan-500">
                        <div className="flex items-center text-white">
                            <CardLayout
                                cardTitle={"AI-POWERED INSIGHTS"}
                                position="left"
                                componentsConfig={componentsConfig}
                                className="w-[531.46px] h-[214.5px]"
                            />
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="border-cyan-500/20 text-cyan-500">
                        <div className="flex items-center text-white">
                            <CardLayout
                                cardTitle={"CUSTOMER COMPLAINTS"}
                                position="left"
                                componentsConfig={componentsConfig}
                                className="w-[400px] h-[214.5px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            

        </div>
    )
}

