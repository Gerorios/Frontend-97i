import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/Common/NavBar';
import HomeScreen from './Pages/HomeScreen';
import IniciarSesion from './Components/Home/IniciarSesion';
import PageAdmin from './Pages/PageAdmin';
import MedicoScreen from './Pages/MedicoScreen';
import ProtectedRoutesUser from './routes/ProtectedRoutesUser';
import ProtectedRoutesAdmin from './routes/ProtectedRoutesAdmin';
import ProtectedRoutesMedico from './routes/ProtectedRoutesMedico';
import Footer from './Components/Common/Footer';
import AboutScreen from './Pages/AboutScreen';
import ErrorScreen from './Pages/ErrorScreen';
import PerfilScreen from './Pages/PerfilScreen';
import MyAppointments from './Pages/MyAppointments';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      console.log("Usuario cargado desde localStorage:", JSON.parse(savedUser));
    }
    setIsLoading(false); 
  }, []);

  useEffect(() => {
    if (user) {
      console.log("Estado user en App actualizado:", user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const guardarUsuario = (usuario) => {
    console.log("Usuario guardado:", usuario);
    setUser(usuario);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/login"
          element={<IniciarSesion guardarUsuario={guardarUsuario} />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoutesAdmin user={user}>
              <PageAdmin />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path="/medico"
          element={
            <ProtectedRoutesMedico user={user}>
              <MedicoScreen />
            </ProtectedRoutesMedico>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoutesUser user={user}>
              <MyAppointments />
            </ProtectedRoutesUser>
          }
          />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/perfil" element={<PerfilScreen />} />
        <Route path='/error' element={<ErrorScreen/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
