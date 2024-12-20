import React from 'react';
import { AVATARSTATE } from '../utills/constant';
import AudioReactiveParticles from '../component/avatar';

export default function AvatraMainagement({ state }) {
  return (
    <>
      {state == AVATARSTATE.LISTERN && (
        <>
          <AudioReactiveParticles />
        </>
      )}

      {
        state == AVATARSTATE.LOADING || state === AVATARSTATE.NORMAL && <>
        
        </>
      }
    </>
  );
}
