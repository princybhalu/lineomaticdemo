import { lazy } from 'react';
import Landing from "../../pages/landing2"
import AnimatedBackgroundWithCard from "../../pages/landing";

export const routes = [
  {
    path: '/',
    key: 'landing',
    element: AnimatedBackgroundWithCard,
  },

  {
    path: '*',
    key: 'not-found',
    element: Landing,
  },
];
