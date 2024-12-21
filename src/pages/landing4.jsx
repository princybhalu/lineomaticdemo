// import React, { useEffect, useRef, useState } from 'react';
// import AvatraMainagement from '../component/AvatraMainagement';
// import CameraView from '../component/CameraView';
// import VideoNameCard from '../component/video-name-card';
// import { AVATARSTATE, TIGGERSKEYS } from '../utills/constant';
// import { ElevenLabsClient } from 'elevenlabs';
// import GradientBorderCard from '../component/MainBorderCard';
// import GradientBorderCard1 from '../component/MainBorderCard1';
// import DashboardCards from '../component/dashboard-cards';

// const content = [
//   {
//     text: `
// # Welcome to the Future
// Explore *innovation* and creativity like never before!
//   `,
//   },
//   {
//     text: `
// ## Empower Your Ideas
// With *tools* designed for creators, your vision becomes reality.
//   `,
//   },
//   {
//     text: `
// ### Technology Meets Imagination
// Let technology drive your *success*.
//   `,
//   },
//   {
//     text: `
// #### Start Your Journey
// Begin today and *see what’s possible*.
//   `,
//   },
// ];

// const data = {
//   basic_description:
//     'Mainne har department ke manual workflows aur processes ko analyze kiya hai aur yeh bottlenecks identify kiye hain',
//   department: [
//     {
//       key: 'admin',
//       text: 'Visitor management me repeat visitor data ka record nahi hota, jo process ko inefficient banata hai. Housekeeping aur stationary procurement me manual tracking ke karan delays aur errors hote hain.',
//     },
//     {
//       key: 'hr',
//       text: 'Recruitment aur onboarding approvals manual hain, jo hiring time ko unnecessarily increase karte hain. Attendance aur payroll reconciliation manually hone ki wajah se errors aur delays common hain.',
//     },
//     {
//       key: 'it',
//       text: 'Application development aur deployment ke liye manual coordination slow aur error-prone hai. Server troubleshooting processes manual hone ki wajah se downtime badhta hai.',
//     },
//     {
//       key: 'erp',
//       text: 'Shortage reports generate karne me 12 ghante lagte hain, jo decision-making slow karta hai. ERP aur LWMS ke beech synchronization inefficient hai.',
//     },
//     {
//       key: 'purchase',
//       text: 'Vendor communication aur rate setup manual hone ki wajah se procurement time badhta hai. New item approval process slow hai, jo operations ko impact karta hai.',
//     },
//     {
//       key: 'stores',
//       text: 'Inventory tracking inconsistent hai, jo production aur dispatch workflows ko slow karta hai. Material locations ka proper mapping nahi hone se errors hoti hain.',
//     },
//     {
//       key: 'quality_check',
//       text: 'Manual defect detection aur inspection time-consuming hai. Rejected items aur rework tracking inefficient hai.',
//     },
//     {
//       key: 'sales_and_marketing',
//       text: 'Quotations aur follow-up processes manual hain, jo customer experience ko impact karte hain. Sales data aur follow-up entries incomplete rehti hain.',
//     },
//     {
//       key: 'automation',
//       text: 'Mujhe is department ke bare me jankari nahi he.',
//     },
//     {
//       key: 'assembly_production',
//       text: 'Mujhe is department ke bare me jankari nahi he.',
//     },
//     {
//       key: 'design',
//       text: 'Engineering changes ke approvals slow hain, jo implementation time ko increase karte hain.',
//     },
//     {
//       key: 'csd',
//       text: 'Mujhe is department ke bare me jankari nahi he.',
//     },
//     {
//       key: 'research_and_development',
//       text: 'Mujhe is department ke bare me jankari nahi he.',
//     },
//     {
//       key: 'accounts_and_finance',
//       text: 'Mujhe is department ke bare me jankari nahi he.',
//     },
//     {
//       key: 'quality_assurance',
//       text: 'Mujhe is department ke bare me jankari nahi he.',
//     },
//   ],
// };

// const LocalRes1 = [];
// const LandingSection = () => {
//   const [avatarState, setAvatarState] = useState(AVATARSTATE.NORMAL);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const sourceRef = useRef(null);

//   const [tiggers, setTiggers] = useState(TIGGERSKEYS.general);
//   const [wholeData, setWholeData] = useState(null);
//   const [isCardVisible, setIsCardVisible] = useState(false);
//   const [playAudioKeyName, setPlayAudioKeyName] = useState(null);

//   console.log({ userData });

//   async function getAudio(text) {
//     const client = new ElevenLabsClient({
//       apiKey: 'sk_404a2d4f36f3b4711dc5616836405ad44a547df3db465eb7',
//     });
//     const audioStream = await client.textToSpeech.convert(
//       'JBFqnCBsd6RMkjVDRZzb',
//       {
//         output_format: 'mp3_44100_128',
//         text,
//         model_id: 'eleven_multilingual_v2',
//       }
//     );

//     // Collect the audio data in a buffer
//     const chunks = [];
//     for await (const chunk of audioStream) {
//       chunks.push(chunk);
//     }
//     const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
//     const arrayBuffer = await audioBlob.arrayBuffer();
//     return arrayBuffer;
//   }

//   async function playAudio(data, callBack) {
//     const audioContext = new (window.AudioContext ||
//       window.webkitAudioContext)();
//     const audioBuffer = await audioContext.decodeAudioData(data);
//     const s1 = audioContext.createBufferSource();
//     sourceRef.current = s1;
//     s1.buffer = audioBuffer;
//     s1.connect(audioContext.destination);
//     s1.start(0);

//     s1.onended = () => {
//       if (!callBack) {
//         setIsCameraOpen(false);
//         setAvatarState(AVATARSTATE.LISTERN);
//       } else {
//         callBack();
//       }
//     };
//   }

//   useEffect(() => {
//     if (userData !== null) {
//       (async () => {
//         const audio = await getAudio(
//           `Hello ${userData.name}, welcome to Line O Matic`
//         );
//         await playAudio(audio);
//       })();
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (
//       tiggers === TIGGERSKEYS.dept_introduction ||
//       tiggers === TIGGERSKEYS.root_map ||
//       tiggers === TIGGERSKEYS.specific_department
//     ) {
//       setIsCardVisible(true);
//     } else {
//       setIsCardVisible(false);
//     }
//   }, [tiggers]);

//   useEffect(() => {
//     // set condition of whole data
//     setWholeData(data);

//     if (data) {
//       LocalRes1.length = data.department.length ;
//       console.log(data.basic_description , "data.basic_description");

//       const temp = async function(){
//         let audio = await getAudio(data.basic_description);
//         const res = await playAudio(audio);
//       }

//       temp().then();

//       // getAudio(data.basic_description).then(async (audio) => {
//       //   console.log("audio :  " , audio);
//       //   const res = await playAudio(audio);
//       //   // setPlayAudioKeyName(data.department[0].key);
//       // }).catch(err => {
//       //   // todo : not call any api
//       //   console.log(err);
//       // });

//       const rejectedRes = [];

//       // for (let i = 0; i < data.department.length; i++) {
//       //   getAudio(data.department[i].text)
//       //     .then((audio) => {
//       //       const temp = async () => {
//       //         const res = await playAudio(audio , () => {
//       //           // todo: add cond. for last one
//       //           while(1){
//       //             if(LocalRes1[i+1]){
//       //                break;
//       //             }
//       //           }
//       //           setPlayAudioKeyName(data.department[i+1].key);
//       //         });
//       //       }
//       //       LocalRes1[i] =  temp ;
//       //     })
//       //     .catch((err) => {
//       //       rejectedRes(i);
//       //     });
//       // }

//       // //  rejected for
//       // if (rejectedRes.length > 0) {
//       //   // again call
//       // }
//     }
//   }, [data]); // wholeData

//   useEffect(() => {
//     if(playAudioKeyName){
//       const Index =  wholeData.department.findIndex((({key})=> key === playAudioKeyName));
//       if(Index !== -1){
//         console.log("temp : " , LocalRes1[Index] , Index);
//         LocalRes1[Index]?.();
//       }
//     }
//   },[playAudioKeyName])

//   return (
//     <>
//       <div className="fixed inset-0 flex bg-black">
//         <div
//           className="w-full h-full flex flex-col justify-center items-center overflow-hidden bg-black"
//           style={{
//             backgroundColor: 'black',
//             zIndex: '10',
//           }}
//         >
//           <div className="h-1/2 w-3/4 z-3">
//             <AvatraMainagement
//               state={avatarState}
//               isLoading={false}
//               setTiggers={setTiggers}
//               setWholeData={setWholeData}
//             />
//           </div>
//           {isCameraOpen && (
//             <>
//               <div className="w-3/4 h-1/2 mx-auto flex flex-col justify-center items-center ">
//                 <div className="relative h-[40vh] w-[60vh] p-4">
//                   <div className="h-full w-full mb-5">
//                     <div className="gradient-border-card m-8 ">
//                       <div className="card-content">
//                         <CameraView
//                           userData={userData}
//                           setUserData={setUserData}
//                         />
//                       </div>
//                     </div>
//                     {userData !== null && (
//                       <>
//                         <VideoNameCard userData={userData} />
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//         {/* dept_introduction  */}
//         {tiggers == TIGGERSKEYS.dept_introduction && (
//           <>
//             <div
//               className={`w-full h-full flex flex-col justify-center items-center p-12 border-l border-solid border-[#919191] relative transition-all duration-700 ${
//                 isCardVisible
//                   ? 'opacity-100 translate-y-0'
//                   : 'opacity-0 translate-y-10'
//               }`}
//               style={{
//                 borderLeft: '3px solid #919191',
//               }}
//             >
//               <GradientBorderCard1>
//                 <DashboardCards />
//               </GradientBorderCard1>
//             </div>
//           </>
//         )}

//         {tiggers === TIGGERSKEYS.specific_department && (
//           <>
//             <div
//               className={`w-full h-full flex flex-col justify-center items-center p-12 border-l border-solid border-[#919191] relative transition-all duration-700 ${
//                 isCardVisible
//                   ? 'opacity-100 translate-y-0'
//                   : 'opacity-0 translate-y-10'
//               }`}
//               style={{
//                 borderLeft: '3px solid #919191',
//               }}
//             >
//               <GradientBorderCard content={content} />
//             </div>
//           </>
//         )}

//         {/* Root map */}
//         {tiggers === TIGGERSKEYS.root_map && (
//           <>
//             <div
//               className={`w-full h-full flex flex-col justify-center items-center p-12 border-l border-solid border-[#919191] relative transition-all duration-700 ${
//                 isCardVisible
//                   ? 'opacity-100 translate-y-0'
//                   : 'opacity-0 translate-y-10'
//               }`}
//               style={{
//                 borderLeft: '3px solid #919191',
//               }}
//             >
//               LOadinbknrngkbnkt
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default LandingSection;

import React, { useEffect, useRef, useState, createContext } from 'react';
import AvatraMainagement from '../component/AvatraMainagement';
import CameraView from '../component/CameraView';
import VideoNameCard from '../component/video-name-card';
import { AVATARSTATE, TIGGERSKEYS, STATEOFSPEAK } from '../utills/constant';
import { ElevenLabsClient } from 'elevenlabs';
import GradientBorderCard from '../component/DepartmentModel';
import GradientBorderCard1 from '../component/MainBorderCard1';
import DashboardCards from '../component/dashboard-cards';
import { io } from 'socket.io-client';
import WebSocketComponent from '../component/ws';
import { motion } from 'framer-motion';
import DepartmentModel from '../component/DepartmentModel';

const content = [
  {
    text: `
# Welcome to the Future
Explore innovation and creativity like never before!
  `,
  },
  {
    text: `
## Empower Your Ideas
With tools designed for creators, your vision becomes reality.
  `,
  },
  {
    text: `
### Technology Meets Imagination
Let technology drive your success.
  `,
  },
  {
    text: `
#### Start Your Journey
Begin today and see what’s possible.
  `,
  },
];

const data1 = {
  basic_description:
    'Mainne har department ke manual workflows aur processes ko analyze kiya hai aur yeh bottlenecks identify kiye hain',
  department: [
    {
      key: 'admin',
      text: 'Visitor management me repeat visitor data ka record nahi hota, jo process ko inefficient banata hai. Housekeeping aur stationary procurement me manual tracking ke karan delays aur errors hote hain.',
    },
    {
      key: 'hr',
      text: 'Recruitment aur onboarding approvals manual hain, jo hiring time ko unnecessarily increase karte hain. Attendance aur payroll reconciliation manually hone ki wajah se errors aur delays common hain.',
    },
    {
      key: 'it',
      text: 'Application development aur deployment ke liye manual coordination slow aur error-prone hai. Server troubleshooting processes manual hone ki wajah se downtime badhta hai.',
    },
    {
      key: 'erp',
      text: 'Shortage reports generate karne me 12 ghante lagte hain, jo decision-making slow karta hai. ERP aur LWMS ke beech synchronization inefficient hai.',
    },
    {
      key: 'purchase',
      text: 'Vendor communication aur rate setup manual hone ki wajah se procurement time badhta hai. New item approval process slow hai, jo operations ko impact karta hai.',
    },
    {
      key: 'stores',
      text: 'Inventory tracking inconsistent hai, jo production aur dispatch workflows ko slow karta hai. Material locations ka proper mapping nahi hone se errors hoti hain.',
    },
    {
      key: 'quality_check',
      text: 'Manual defect detection aur inspection time-consuming hai. Rejected items aur rework tracking inefficient hai.',
    },
    {
      key: 'sales_and_marketing',
      text: 'Quotations aur follow-up processes manual hain, jo customer experience ko impact karte hain. Sales data aur follow-up entries incomplete rehti hain.',
    },
    {
      key: 'automation',
      text: 'Mujhe is department ke bare me jankari nahi he.',
    },
    {
      key: 'assembly_production',
      text: 'Mujhe is department ke bare me jankari nahi he.',
    },
    {
      key: 'design',
      text: 'Engineering changes ke approvals slow hain, jo implementation time ko increase karte hain.',
    },
    {
      key: 'csd',
      text: 'Mujhe is department ke bare me jankari nahi he.',
    },
    {
      key: 'research_and_development',
      text: 'Mujhe is department ke bare me jankari nahi he.',
    },
    {
      key: 'accounts_and_finance',
      text: 'Mujhe is department ke bare me jankari nahi he.',
    },
    {
      key: 'quality_assurance',
      text: 'Mujhe is department ke bare me jankari nahi he.',
    },
  ],
};

let currentCallBackOfSpeech = () => {};
const LocalRes1 = [];

// Create the ThemeContext
export const ThemeContext = createContext();

const LandingSection = () => {
  const [avatarState, setAvatarState] = useState(AVATARSTATE.LISTERN);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  // ws
  const [currentStateOfSpeech, setCurrentStateOfSpeech] = useState(
    STATEOFSPEAK.NORMAL
  );
  const [currentPlayString, setCurrentPlayString] = useState(null);
  const [currentCategoryOfSpeech, setCurrentCategoryOfSpeech] =
    useState('dept_intro');
  const [stopAudio, setStopAudio] = useState(0);

  const [tiggers, setTiggers] = useState(TIGGERSKEYS.general);
  const [wholeData, setWholeData] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [playAudioKeyName, setPlayAudioKeyName] = useState(null);

  const divRef = useRef(null);
  const [width, setWidth] = useState(0);

  // Function to get audio from Eleven Labs
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

  // Function to play the audio
  async function playAudio(data, callBack) {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Ensure AudioContext is resumed if suspended
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    try {
      const audioBuffer = await audioContext.decodeAudioData(data);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      source.connect(audioContext.destination);
      source.start(0);

      source.onended = () => {
        if (!callBack) {
          setIsCameraOpen(false);
          // setAvatarState(AVATARSTATE.LISTERN);
          setTimeout(() => {
            setWholeData(data1);
          }, 1000);
        } else {
          callBack();
        }
      };
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  const callBackOfSpeak = (state) => {
    if (state === 'userintro') {
      console.log('in call back 2nd');
      setIsCameraOpen(false);
      setAvatarState(AVATARSTATE.LISTERN);
      setCurrentCategoryOfSpeech('dept_intro');
    } else if (state == 'dept_intro') {
    }
  };

  // Effect to handle userData and fetch audio
  useEffect(() => {
    if (userData !== null) {
      setCurrentPlayString(
        `नमस्कार ${userData.name}, लाइन ओ मैटिक में आपका स्वागत है`
      );
      setCurrentCategoryOfSpeech('userintro');
      setCurrentStateOfSpeech(STATEOFSPEAK.SPEAK);
      // setTimeout(() => {
      //   setIsCameraOpen(false);
      //   setAvatarState(AVATARSTATE.LISTERN);
      // }, 10000);
    }
  }, [userData]);

  // Effect to handle trigger changes
  useEffect(() => {
    if (
      tiggers === TIGGERSKEYS.dept_introduction ||
      tiggers === TIGGERSKEYS.root_map ||
      tiggers === TIGGERSKEYS.specific_department
    ) {
      setIsCardVisible(true);
    } else {
      setIsCardVisible(false);
    }
  }, [tiggers]);

  // Effect to handle wholeData and audio playback
  useEffect(() => {
    if (wholeData) {
      console.log(wholeData, 'data.basic_description');

      LocalRes1.length = wholeData.department.length;

      getAudio(wholeData.basic_description)
        .then(async (audio) => {
          console.log('audio:', audio);
          await playAudio(audio);
        })
        .catch((err) => {
          console.log(err);
        });

      let rejectedRes = [];

      for (let i = 0; i < wholeData.department.length - 12; i++) {
        getAudio(wholeData.department[i].text)
          .then((audio) => {
            const temp = async () => {
              const res = await playAudio(audio, () => {
                while (1) {
                  if (LocalRes1[i + 1]) {
                    break;
                  }
                }
                setPlayAudioKeyName(wholeData.department[i + 1].key);
              });
            };
            LocalRes1[i] = temp;
          })
          .catch((err) => {
            rejectedRes.push(i);
          });
      }

      // rejected for
      if (rejectedRes.length > 0) {
        // again call
      }
    }
  }, [wholeData]);

  // Effect to play audio for each department when its key is triggered
  useEffect(() => {
    if (playAudioKeyName) {
      const Index = wholeData.department.findIndex(
        ({ key }) => key === playAudioKeyName
      );
      if (Index !== -1) {
        console.log('temp:', LocalRes1[Index], Index);
        LocalRes1[Index]?.();
      }
    }
  }, [playAudioKeyName]);

  // set videocard position
  useEffect(() => {
    const updateWidth = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        console.log(rect);
        setWidth(rect.width);
      }
    };

    // Use ResizeObserver for responsive width detection
    const observer = new ResizeObserver(() => updateWidth());
    if (divRef.current) {
      observer.observe(divRef.current);
    }

    // Initial width update
    updateWidth();

    // Cleanup observer on unmount
    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  return (
    <>
      <ThemeContext.Provider
        value={{
          setStopAudio,
          stopAudio,
          currentStateOfSpeech,
          setCurrentStateOfSpeech,
          setCurrentPlayString,
        }}
      >
        <div className="fixed inset-0 flex bg-black">
          <div
            className="w-full h-full flex flex-col justify-center items-center overflow-hidden bg-black"
            style={{
              backgroundColor: 'black',
              zIndex: '10',
            }}
          >
            <div className="h-1/2 w-3/4 z-3">
              <AvatraMainagement
                state={avatarState}
                isLoading={false}
                setTiggers={setTiggers}
                setWholeData={setWholeData}
              />
              <WebSocketComponent
                text={currentPlayString}
                currentStateOfSpeech={currentStateOfSpeech}
                setCurrentStateOfSpeech={setCurrentStateOfSpeech}
                callBackOfSpeak={callBackOfSpeak}
                currentCategoryOfSpeech={currentCategoryOfSpeech}
              />
            </div>
            {isCameraOpen && (
              <>
                <div className="w-3/4 h-1/2 mx-auto flex flex-col justify-center items-center ">
                  {/* <div className="relative h-[40vh] w-[60vh] p-4"> */}
                  <div className="relative h-[85%] w-[40%] min-h-[200px] p-4">
                    {/* <div className="h-full w-full mb-5"> */}
                    <div className="h-full w-full">
                      {/* <div className="gradient-border-card m-8 "> */}
                      <div className="gradient-border-card " ref={divRef}>
                        <div className="card-content">
                          <CameraView
                            userData={userData}
                            setUserData={setUserData}
                          />
                        </div>
                      </div>
                      {userData !== null && (
                        <>
                          <VideoNameCard userData={userData} width={width} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* dept_introduction  */}
          {tiggers == TIGGERSKEYS.dept_introduction && (
            <>
              <div
                className={`w-full h-full flex flex-col justify-center items-center p-12 border-l border-solid border-[#919191] relative transition-all duration-700 ${
                  isCardVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  borderLeft: '3px solid #919191',
                }}
              >
                <GradientBorderCard1>
                  <DashboardCards />
                </GradientBorderCard1>
              </div>
            </>
          )}

          {tiggers === TIGGERSKEYS.specific_department && (
            <>
              <motion.div
                className={`w-full h-full flex flex-col justify-center items-center p-12 border-l border-solid border-[#919191] relative transition-all duration-700 ${
                  isCardVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  borderLeft: '3px solid #919191',
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <DepartmentModel content={content} />
              </motion.div>
            </>
          )}
          {/* Root map */}
          {tiggers === TIGGERSKEYS.root_map && (
            <>
              <div
                className={`w-full h-full flex flex-col justify-center items-center p-12 border-l border-solid border-[#919191] relative transition-all duration-700 ${
                  isCardVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  borderLeft: '3px solid #919191',
                }}
              >
                LOadinbknrngkbnkt
              </div>
            </>
          )}
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default LandingSection;
