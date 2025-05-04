// src/components/UserMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { getStoredUser, isLoggedIn, logout } from '@src/utils/auth';

export default function UserMenu() {
  // Estado para almacenar el usuario y para controlar la visibilidad del menú
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  // Al montarse el componente, se obtiene el usuario (si existe) desde el almacenamiento local
  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
  }, []);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para alternar la visibilidad del menú de usuario
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Maneja la acción del botón que según el estado ejecuta logout o redirige a /login
  const handleLogoutOrLogin = () => {
    if (isLoggedIn()) {
      logout();
      setUser(null); // Actualizamos el estado para reflejar que ya no hay un usuario
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        id="userMenuButton" 
        onClick={toggleMenu}
        className="flex items-center space-x-2 text-white hover:text-gray-300 transition-all duration-200"
      >
        <span id="username" className="font-medium">
          {user ? user.username : "Usuario"}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>

      {menuOpen && (
        <div 
          id="userMenu" 
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-md py-2 z-10"
        >
          {isLoggedIn() && (
            <>
              <a 
                href="/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                Mi Perfil
              </a>
              <a 
                href="/settings" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                Configuración
              </a>
            </>
          )}
          <button 
            id="logoutButton" 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
            onClick={handleLogoutOrLogin}
          >
            {isLoggedIn() ? "Cerrar sesión" : "Iniciar sesión"}
          </button>
        </div>
      )}
    </div>
  );
}
