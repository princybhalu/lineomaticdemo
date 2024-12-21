import { lazy } from 'react';
import Landing from "../../pages/landing2"
import Landing4 from "../../pages/landing4"
import AnimatedBackgroundWithCard from "../../pages/landing";
import ParentComponent from '../../component/ParentComponent';
import ParticleAvatar from "../../component/mainAvatar1";

export const routes = [
  {
    path: '/',
    key: 'landing',
    element: ParticleAvatar,
  },
  {
    path: '/new',
    key: 'landing',
    element: Landing4,
  },
  {
    path: '*',
    key: 'not-found',
    element: Landing,
  },
];
