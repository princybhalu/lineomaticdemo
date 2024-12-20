// import React, { Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { routes } from './routes/config/routes';
// import ProtectedRoute from './routes/protected-route';
// import Layout from './layouts/layouts';
// // import ErrorBoundary from './components/error-boundry/error-boundry';

// const LoadingSpinner = () => (
//   <div className="flex h-screen w-screen items-center justify-center">
//     <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
//   </div>
// );

// const App = () => {
//   return (
//     <>
//       {/* <ErrorBoundary> */}
//           <Router>
//             <Routes>
//               {routes.map((route) => (
//                 <Route
//                   key={route.path}
//                   path={route.path}
//                   element={
//                     route.isProtected ? (
//                       <ProtectedRoute profilingIncomplete={true}>
//                         {/* Exclude Layout for specific routes like /login */}
//                         {route.islayout === true ? (
//                           <Layout>
//                             <Suspense fallback={<LoadingSpinner />}>
//                               <route.element />
//                             </Suspense>
//                           </Layout>
//                         ) : (
//                           <Suspense fallback={<LoadingSpinner />}>
//                             <route.element />
//                           </Suspense>
//                         )}
//                       </ProtectedRoute>
//                     ) : route.islayout === true ? (
//                       <Layout>
//                         <Suspense fallback={<LoadingSpinner />}>
//                           <route.element />
//                         </Suspense>
//                       </Layout>
//                     ) : (
//                       <Suspense fallback={<LoadingSpinner />}>
//                         <route.element />
//                       </Suspense>
//                     )
//                   }
//                 />
//               ))}
//             </Routes>
//           </Router>
//       {/* <ErrorBoundary> */}
//     </>
//   );
// };

// export default App;
// // import React from "react";
// // import ParentComponent from "./component/ParentComponent"; // Importing the parent component

// // function App() {
// //   return (
// //     <div className="App">
// //       <ParentComponent />
// //     </div>
// //   );
// // }

// // export default App;


// src/App.js
import React from 'react';
import GradientBorderCard from './component/GradientBorderCard'; // Make sure the path is correct

const App = () => {
  return (
    <div className="App">
      <GradientBorderCard />
    </div>
  );
}

export default App;

