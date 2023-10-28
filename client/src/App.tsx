import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import LoadingPage from "./app/features/Loader/LoadingPage";
const Home = lazy(() => import("./pages/Home"));
const Error = lazy(() => import("./pages/Error"));
const Auth = lazy(() => import("./pages/Auth"));

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
