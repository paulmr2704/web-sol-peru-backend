# ⚙️ Financiera Sol Perú - Backend API

Bienvenido al repositorio oficial del backend de **Financiera Sol Perú**. Esta API proporciona los servicios y la lógica de negocio detrás del portal institucional y la plataforma de simulación/evaluación de créditos para los clientes de Ciudad Constitución, Pasco.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.x-black?style=flat&logo=express)

---

## 🎯 Características Principales

*   **API RESTful:** Gestión de solicitudes de crédito y prospectos comerciales.
*   **Gestión de Evaluaciones:** Lógica de validación de los datos enviados desde el formulario web (Cloudflare Turnstile verificado).
*   **Base de Datos (Futura Implementación):** Preparado para integración con PostgreSQL.
*   **Seguridad:** Endpoints protegidos y estructura modular.

## 🛠️ Tecnologías Utilizadas

*   **Entorno:** Node.js.
*   **Framework:** Express.js (o similar).
*   **Despliegue:** Preparado para servicios en la nube (Render, Railway, o AWS).

## 🚀 Instalación y Ejecución Local

1.  **Clonar el repositorio:**
    \\\ash
    git clone https://github.com/tu-usuario/web-sol-peru.git
    cd web-sol-peru
    \\\

2.  **Instalar las dependencias:**
    \\\ash
    npm install
    \\\

3.  **Configurar Variables de Entorno:**
    Crea un archivo \.env\ basado en \.env.example\ con tus credenciales de base de datos y Cloudflare Secret Key.

4.  **Iniciar el servidor:**
    \\\ash
    npm run dev
    \\\
    La API estará corriendo habitualmente en el puerto \4000\ o el definido en el \.env\.

---
*Diseñado y desarrollado para el crecimiento de Ciudad Constitución.* 📈
