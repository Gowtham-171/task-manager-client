import React, { useState, useCallback } from "react";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Toast from "./components/ToastNotification/ToastNotification";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <>
      <Header />
      <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
      <main>
        <Dashboard onToast={showToast} />
      </main>
      <Footer />
    </>
  );
}

export default App;
