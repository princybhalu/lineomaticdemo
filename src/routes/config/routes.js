import { lazy } from 'react';
import Landing from "../../pages/landing"
import Landing1 from "../../pages/landing1"


export const routes = [
  {
    path: '/',
    key: 'landing',
    element: Landing1,
  },
  {
    path: '/',
    key: 'landing',
    element: Landing,
  },
  {
    path: '*',
    key: 'not-found',
    element: Landing,
  },
];
