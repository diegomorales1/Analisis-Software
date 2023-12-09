import React, { useState } from 'react';
import Calendar from "./Calendar";
import Login from "./Login";
import Register from "./Register";
import "./App.css";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    nombre: '',
    apellido: '',
    rut: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const toggleLoginView = () => {
    setShowLogin(!showLogin);
    setErrorMessage(''); 
  };

  const handleLogin = (userData) => {
    setLoggedIn(true);
    setUserDetails(userData);
    setErrorMessage('');
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleRegister = () => {
    toggleLoginView(); //Cambia a la vista de inicio de sesión después del registro
  };

  const handleError = (message) => {
    setErrorMessage(message);
  };

  return (
    <div>
      <div>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        {loggedIn ? (
          <><div className="cerrarSesion">
            <button onClick={handleLogout}>
              Cerrar Sesión
            </button>
            </div>
            <div className="calendar-container">
              <Calendar {...userDetails} />
            </div>
          </>
        ) : (
          <>
            {showLogin ? (
              <div className="page-background">
              <><div className="App">
                <Login onLogin={handleLogin} onError={handleError} />
                <p className="pregunta"> ¿No tienes sesión? </p>
                <button onClick={toggleLoginView}>
                  REGISTRATE
                </button>
                </div>
              </>
              </div>
            ) : (
              <div className="page-background">
              <><div className="App">
                <Register onRegister={handleRegister} onError={handleError} />
                <p className="pregunta"> ¿Ya tienes una sesión? </p>
                <button onClick={toggleLoginView}>
                  INGRESAR
                </button>
                </div>
              </>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;