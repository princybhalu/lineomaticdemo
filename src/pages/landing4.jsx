// export default function GridBackground() {
//     return (
//       <div className="relative w-full min-h-screen bg-black p-8">
//         <div
//           className="relative w-full h-full rounded-3xl overflow-hidden"
//           style={{
//             background: 'black',
//             padding: '1px', // For gradient border
//             backgroundImage: 'linear-gradient(to right, #0ea5e9, gray)',
//           }}
//         >
//           {/* Gradient border container */}
//           <div className="absolute inset-0 rounded-3xl opacity-20 blur-sm"
//             style={{
//               background: 'linear-gradient(to right, #0ea5e9, gray)',
//             }}
//           />

//           {/* Content container with grid */}
//           <div
//             className="relative w-full h-full min-h-[500px] rounded-3xl bg-black"
//             style={{
//               backgroundImage: `
//                 linear-gradient(to right, rgba(75, 85, 99, 0.2) 1px, transparent 1px),
//                 linear-gradient(to bottom, rgba(75, 85, 99, 0.2) 1px, transparent 1px)
//               `,
//               backgroundSize: '80px 80px',
//               backgroundPosition: 'center center'
//             }}
//           >
//             {/* Your content goes here */}
//           </div>
//         </div>
//       </div>
//     )
//   }

// import React from 'react';
// import AudioReactiveParticles from "../component/avatar";

// export default function GradientBorderCard() {
//     return (
//         <>
//             <div className='w-screen h-screen flex relative'>
//                 <div className='w-full h-full flex flex-col justify-center items-center'>
//                     <div className='h-1/2 w-3/4 '>
//                         <AudioReactiveParticles />
//                     </div>
//                 </div>
//                 <div className='w-full h-full flex flex-col justify-center items-center p-12'>
//                     <div className="gradient-border-card m-8">
//                         <div className="card-content"></div>
//                     </div>
//                     <div className="radial-blur"></div>
//                 </div>
//             </div>
//         </>
//     );
// }

import React, { useEffect, useRef, useState } from 'react';
import AvatraMainagement from '../component/AvatraMainagement';
import CameraView from '../component/CameraView';
import VideoNameCard from '../component/video-name-card';
import { AVATARSTATE, TIGGERSKEYS } from '../utills/constant';
import { ElevenLabsClient } from 'elevenlabs';
import GradientBorderCard from '../component/MainBorderCard';

const content = [
  {
    text: `
# Welcome to the Future
Explore *innovation* and creativity like never before!
  `,
  },
  {
    text: `
## Empower Your Ideas
With *tools* designed for creators, your vision becomes reality.
  `,
  },
  {
    text: `
### Technology Meets Imagination
Let technology drive your *success*.
  `,
  },
  {
    text: `
#### Start Your Journey
Begin today and *see what’s possible*.
  `,
  },
];

const LandingSection = () => {
  const [avatarState, setAvatarState] = useState(AVATARSTATE.NORMAL);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const sourceRef = useRef(null);

  const [tiggers, setTiggers] = useState(TIGGERSKEYS.dept_introduction);
  const [wholeData, setWholeData] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);

  console.log({ userData });

  async function getAudio(text) {
    const client = new ElevenLabsClient({
      apiKey: 'sk_404a2d4f36f3b4711dc5616836405ad44a547df3db465eb7',
    });
    const audioStream = await client.textToSpeech.convert(
      'JBFqnCBsd6RMkjVDRZzb',
      {
        output_format: 'mp3_44100_128',
        text,
        model_id: 'eleven_multilingual_v2',
      }
    );

    // Collect the audio data in a buffer
    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
    const arrayBuffer = await audioBlob.arrayBuffer();
    return arrayBuffer;
  }

  async function playAudio(data) {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(data);
    const s1 = audioContext.createBufferSource();
    sourceRef.current = s1;
    s1.buffer = audioBuffer;
    s1.connect(audioContext.destination);
    s1.start(0);

    s1.onended = () => {
      setIsCameraOpen(false);
      setAvatarState(AVATARSTATE.LISTERN);
    };
  }

  useEffect(() => {
    if (userData !== null) {
      (async () => {
        const audio = await getAudio(
          `Hello ${userData.name}, welcome to Line O Matic`
        );
        await playAudio(audio);
      })();
    }
  }, [userData]);

  useEffect(() => {
    if (tiggers === TIGGERSKEYS.dept_introduction) {
      setIsCardVisible(true);
    } else {
      setIsCardVisible(false);
    }
  }, [tiggers]);

  return (
    <>
      <div className="fixed inset-0 flex bg-black">
        <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden bg-black"
        style={{
          backgroundColor: "black",
          zIndex: "10"
        }}>
          <div className="h-1/2 w-3/4 z-3">
            <AvatraMainagement
              state={avatarState}
              isLoading={false}
              setTiggers={setTiggers}
              setWholeData={setWholeData}
            />
          </div>
          {isCameraOpen && (
            <>
              <div className="w-3/4 h-1/2 mx-auto flex flex-col justify-center items-center ">
                <div className="relative h-[40vh] w-[60vh] p-4">
                  <div className="h-full w-full mb-5">
                    <div className="gradient-border-card m-8 ">
                      <div className="card-content">
                        <CameraView
                          userData={userData}
                          setUserData={setUserData}
                        />
                      </div>
                    </div>
                    {userData !== null && (
                      <>
                        <VideoNameCard userData={userData} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {tiggers == TIGGERSKEYS.dept_introduction && (
          <>
            <div
              className={`w-full h-full flex flex-col justify-center items-center p-12 border-l border-solid border-[#919191] relative transition-all duration-700 ${
                isCardVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <GradientBorderCard content={content} />
            </div>
          </>
        )}
      </div>
    
      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-2 px-1 py-1 max-w-[800px] mt-32 ">
        <div class="rounded-xl">
          <SvgAccount />
        </div>
        <div class="rounded-xl">
          <SvgHr />
        </div>
        <div class="rounded-xl">
          <SvgIt />
        </div>
        <div class="rounded-xl">
          <SvgSaleMarketing />
        </div>
        <div class="rounded-xl">
          <SvgPurches />
        </div>
        <div class="rounded-xl">
          <SvgErp />
        </div>
        <div class="rounded-xl">
          <SvgCsd />
        </div>
        <div class="rounded-xl">
          <SvgAutomation />
        </div>
        <div class="rounded-xl">
          <SvgAssemblyProduction />
        </div>
        <div class="rounded-xl">
          <SvgStores />
        </div>
        <div class="rounded-xl">
          <SvgQualityCheck />
        </div>
        <div class="rounded-xl">
          <SvgDesign />
        </div>
        <div class="rounded-xl">
          <SvgResearch />
        </div>
        <div class="rounded-xl">
          <SvgAccountFinance />
        </div>
        <div class="rounded-xl">
          <SvgQa />
        </div>
      </div>
    
      
    </>
  );
};

export default LandingSection;

{
  /* <div className="w-full h-full flex flex-col justify-center items-center p-12 relative">
          <div className="gradient-border-card m-8">
            <div className="radial-blur-overlay" />
            <div className="card-content" />
          </div>
        </div> */
}
