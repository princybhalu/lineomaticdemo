import { lazy } from 'react';
import Landing from "../../pages/landing2"
import Landing4 from "../../pages/landing4"
import AnimatedBackgroundWithCard from "../../pages/landing";

export const routes = [
  {
    path: '/',
    key: 'landing',
    element: AnimatedBackgroundWithCard,
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
