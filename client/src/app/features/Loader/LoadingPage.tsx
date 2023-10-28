import React from "react";
import styles from "./LoadingPage.module.css";

const LoadingPage: React.FC = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <span className={`${styles.loader}`}></span>
      </div>
    </>
  );
};

export default LoadingPage;
