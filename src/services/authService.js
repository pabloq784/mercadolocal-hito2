import usuarios from "../mock/usuarios.json";

// Servicio simulado para Hito 2.
// En Hito 3 se reemplaza por login real con JWT.

export const obtenerUsuarioDemo = async () => {
  return usuarios[0];
};
