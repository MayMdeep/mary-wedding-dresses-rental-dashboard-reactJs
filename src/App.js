import React from "react";
import './App.css';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./Route/AuthContext";
import AppContent from "./AppContent";

function App() {
  return (
    <div className="App">
      <SnackbarProvider autoHideDuration={2000} maxSnack={1}>
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;