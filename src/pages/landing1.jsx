import React, { useState } from 'react';
import AudioReactiveParticles from '../compnent/avatar';
import ProfileCard from '../compnent/a';

export default function Landing1() {
  const [IsSet, Setted] = useState(false);

  return (
    <>
      {!IsSet && (
        <>
          <div className="w-1/2 h-screen mx-auto flex flex-col justify-center item-centre 88888888888888">
            <div className="w-full h-1/2 99999999999">
              <AudioReactiveParticles />
            </div>
            <div className="flex flex-col w-1/2 h-1/2 mx-auto justify-center items-center">
              <ProfileCard setted={Setted} />
            </div>
          </div>
        </>
      )}

      {IsSet && (
        <>
          <div className="flex item center">
            <div className="w-1/2 h-screen mx-auto flex flex-col justify-center item-centre">
              <div className="w-full h-1/2 99999999999">
                <AudioReactiveParticles />
              </div>
              <div className="flex flex-col w-1/2 h-1/2 mx-auto justify-center items-center">
                <ProfileCard setted={Setted} />
              </div>
            </div>

            <div className='text-white w-1/3 h-full'>
              getteed data
            </div>
          </div>
        </>
      )}
    </>
  );
}
