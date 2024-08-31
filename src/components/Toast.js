"use client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      let toastString = localStorage.getItem("toast");

      let toastMessage;

      try {
        toastMessage = toastString ? JSON.parse(toastString) : null;
      } catch (error) {
        console.error("Failed to parse toast message:", error);
        return;
      }

      if (toastMessage) {
        toast[toastMessage.type](toastMessage.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.removeItem("toast");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <ToastContainer />;
};

export default Toast;
