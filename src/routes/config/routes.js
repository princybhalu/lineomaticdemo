import { lazy } from 'react';
import Landing from "../../pages/landing"

export const routes = [
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
