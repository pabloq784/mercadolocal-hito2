Marketplace desarrollado con *React + Vite* como parte del *Hito 2 - Desarrollo Frontend*.

El proyecto simula una plataforma de compra y venta de productos utilizando datos mock, quedando preparado para integrarse posteriormente con una API REST desarrollada en el Hito 3.

---

## Dependencias utilizadas:

- React
- Vite
- JavaScript
- React Router DOM
- Context API
- Axios
- Bootstrap
- React-Bootstrap
- React Icons

---

## Estructura del proyecto


src/
│
├── assets/         # Imágenes y estilos
├── components/     # Componentes reutilizables
├── context/        # Estado global (Context API)
├── hooks/          # Hooks personalizados
├── mock/           # Datos simulados (JSON)
├── pages/          # Vistas principales
├── router/         # Configuración de rutas
├── services/       # Servicios para consumo de datos
├── utils/          # Funciones auxiliares
│
├── App.jsx
└── main.jsx


---

## Funcionalidades

- Inicio de sesión (simulado).
- Registro de usuarios utilizando LocalStorage.
- Cierre de sesión.
- Visualización de productos.
- Búsqueda de productos.
- Paginación.
- Carrito de compras.
- Perfil de usuario.
- Publicación de productos.
- Edición y eliminación de publicaciones.
- Gestión de direcciones.
- Banner con slider automático.
- Diseño responsive.

---

## Usuario Demo

Correo:


demo@mercadolocal.cl


Contraseña:


12345678


También es posible crear nuevas cuentas desde la pantalla de registro.

---

## Datos Mock

Durante el Hito 2 la aplicación utiliza datos simulados ubicados en:


src/mock/


- productos.json
- categorias.json
- usuarios.json

Estos archivos podrán ser reemplazados por una API REST en el Hito 3 sin modificar los componentes principales.

---

## Integrantes

- Tere Carmona
- Pablo Quincha
- David Gili
