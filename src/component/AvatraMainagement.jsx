import React from 'react';
import { AVATARSTATE } from '../utills/constant';
import AudioReactiveParticles from '../component/avatar';
import ParticleAvatar from "../component/mainAvatar2";

export default function AvatraMainagement({ state = AVATARSTATE.NORMAL , setIsLoading = () => {} , isLoading = false  }) {
  return (
    <>
      {state == AVATARSTATE.LISTERN && (
        <>
          <AudioReactiveParticles />
        </>
      )}

      {
        state == AVATARSTATE.LOADING || state === AVATARSTATE.NORMAL && <>
        <ParticleAvatar setIsLoading={setIsLoading}  isLoading={isLoading} />
        </>
      }
    </>
  );
}
