# CV Builder App 🧾

Una aplicación web construida con **React** que permite a los usuarios crear, editar, previsualizar y exportar su currículum vitae (CV) de manera sencilla y rápida.

## 🛠️ Tecnologías utilizadas

- React 18+
- Vite o Create React App
- Tailwind CSS o Styled Components
- React Router (opcional, para navegación)
- React Hook Form / Formik (para manejo de formularios)
- html2pdf.js o jsPDF (para exportar a PDF)
- Zustand o Context API (para manejo de estado global, opcional)

## 🚀 Características

- Formulario paso a paso o en una sola vista para ingresar información del CV.
- Vista previa del CV en tiempo real.
- Descarga del CV en formato PDF.
- Diseño responsive.
- Múltiples plantillas de diseño (opcional).

## 📦 Instalación

```bash
git clone https://github.com/tuusuario/cv-builder.git
cd cv-builder
npm install
npm run dev

O si usas yarn:
yarn install
yarn dev

## Estructura del proyecto
src/
├── components/       # Componentes reutilizables como formularios y secciones del CV
├── pages/            # Vistas principales como Home, Editor, Preview
├── styles/           # Archivos de estilos
├── utils/            # Funciones auxiliares
├── App.jsx
└── main.jsx
