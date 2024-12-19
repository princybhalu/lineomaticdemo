import { lazy } from 'react';
import Landing from "../../pages/landing"
import Dashboard from "../../pages/dashboard"

export const routes = [
  {
    path: '/',
    key: 'landing',
    element: Landing,
  },
  {
    path: '/dashboard',
    key: 'dashboard',
    element: Dashboard,
  },
  {
    path: '*',
    key: 'not-found',
    element: Landing,
  },
];
