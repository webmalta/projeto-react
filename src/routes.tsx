import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRouter";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import Cadastro from "./pages/Cadastro";
import Alterar from "./pages/Alterar";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProtectedRoute>
              <Detalhes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change/:id"
          element={
            <ProtectedRoute>
              <Alterar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Cadastro />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;