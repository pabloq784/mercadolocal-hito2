export const formatearCLP = (valor) => {
  const numero = Number(valor) || 0;

  return numero.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });
};

export const limpiarPrecioCLP = (valor) => {
  return String(valor).replace(/[^0-9]/g, "");
};
