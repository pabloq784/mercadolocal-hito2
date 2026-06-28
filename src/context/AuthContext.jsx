import { createContext, useEffect, useState } from "react";
import usuariosIniciales from "../mock/usuarios.json";

export const AuthContext = createContext();

const STORAGE_USUARIOS = "mercadolocal_usuarios";
const STORAGE_SESION = "mercadolocal_usuario_actual";

function normalizarUsuarios(usuarios) {
  return usuarios.map((usuario) => ({
    ...usuario,
    direcciones: usuario.direcciones || [usuario.direccion].filter(Boolean)
  }));
}

function cargarUsuarios() {
  const usuariosGuardados = localStorage.getItem(STORAGE_USUARIOS);

  if (usuariosGuardados) {
    return normalizarUsuarios(JSON.parse(usuariosGuardados));
  }

  const iniciales = normalizarUsuarios(usuariosIniciales);
  localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(iniciales));
  return iniciales;
}

function cargarSesion() {
  const sesionGuardada = localStorage.getItem(STORAGE_SESION);

  if (sesionGuardada) {
    const sesion = JSON.parse(sesionGuardada);
    return {
      ...sesion,
      direcciones: sesion.direcciones || [sesion.direccion].filter(Boolean)
    };
  }

  return null;
}

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const usuariosData = cargarUsuarios();
    const sesionData = cargarSesion();

    setUsuarios(usuariosData);

    if (sesionData) {
      setUsuario(sesionData);
      setAutenticado(true);
    }
  }, []);

  const guardarUsuarios = (usuariosActualizados) => {
    setUsuarios(usuariosActualizados);
    localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(usuariosActualizados));
  };

  const actualizarUsuarioActual = (usuarioActualizado) => {
    const usuarioSinPassword = { ...usuarioActualizado };
    delete usuarioSinPassword.password;

    setUsuario(usuarioSinPassword);
    localStorage.setItem(STORAGE_SESION, JSON.stringify(usuarioSinPassword));
  };

  const registrarUsuario = (nuevoUsuario) => {
    const existe = usuarios.some(
      (item) => item.email.toLowerCase() === nuevoUsuario.email.toLowerCase()
    );

    if (existe) {
      return {
        ok: false,
        mensaje: "Ya existe una cuenta registrada con este correo."
      };
    }

    const usuarioCreado = {
      id: Date.now(),
      nombre: nuevoUsuario.nombre,
      apellido: nuevoUsuario.apellido || "",
      rut: nuevoUsuario.rut,
      email: nuevoUsuario.email,
      telefono: nuevoUsuario.telefono || "",
      direccion: nuevoUsuario.direccion,
      direcciones: [nuevoUsuario.direccion].filter(Boolean),
      password: nuevoUsuario.password,
      rol: "cliente"
    };

    guardarUsuarios([...usuarios, usuarioCreado]);

    return {
      ok: true,
      mensaje: "Cuenta creada correctamente."
    };
  };

  const iniciarSesion = (email, password) => {
    const usuarioEncontrado = usuarios.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!usuarioEncontrado) {
      return {
        ok: false,
        mensaje: "Correo o contraseña incorrectos."
      };
    }

    actualizarUsuarioActual(usuarioEncontrado);
    setAutenticado(true);

    return {
      ok: true,
      mensaje: "Inicio de sesión correcto."
    };
  };

  const agregarDireccion = (nuevaDireccion) => {
    if (!usuario || nuevaDireccion.trim() === "") return;

    const usuariosActualizados = usuarios.map((item) => {
      if (item.id !== usuario.id) return item;

      const direccionesActuales = item.direcciones || [item.direccion].filter(Boolean);
      return {
        ...item,
        direccion: item.direccion || nuevaDireccion,
        direcciones: [...direccionesActuales, nuevaDireccion]
      };
    });

    guardarUsuarios(usuariosActualizados);
    const actualizado = usuariosActualizados.find((item) => item.id === usuario.id);
    actualizarUsuarioActual(actualizado);
  };

  const editarDireccion = (indice, nuevaDireccion) => {
    if (!usuario || nuevaDireccion.trim() === "") return;

    const usuariosActualizados = usuarios.map((item) => {
      if (item.id !== usuario.id) return item;

      const direccionesActualizadas = [...(item.direcciones || [])];
      direccionesActualizadas[indice] = nuevaDireccion;

      return {
        ...item,
        direccion: direccionesActualizadas[0] || "",
        direcciones: direccionesActualizadas
      };
    });

    guardarUsuarios(usuariosActualizados);
    const actualizado = usuariosActualizados.find((item) => item.id === usuario.id);
    actualizarUsuarioActual(actualizado);
  };

  const eliminarDireccion = (indice) => {
    if (!usuario) return;

    const usuariosActualizados = usuarios.map((item) => {
      if (item.id !== usuario.id) return item;

      const direccionesActualizadas = (item.direcciones || []).filter(
        (_, i) => i !== indice
      );

      return {
        ...item,
        direccion: direccionesActualizadas[0] || "",
        direcciones: direccionesActualizadas
      };
    });

    guardarUsuarios(usuariosActualizados);
    const actualizado = usuariosActualizados.find((item) => item.id === usuario.id);
    actualizarUsuarioActual(actualizado);
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setAutenticado(false);
    localStorage.removeItem(STORAGE_SESION);
  };

  return (
    <AuthContext.Provider
      value={{
        usuarios,
        usuario,
        autenticado,
        registrarUsuario,
        iniciarSesion,
        agregarDireccion,
        editarDireccion,
        eliminarDireccion,
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
