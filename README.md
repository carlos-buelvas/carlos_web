# Hoja de vida y portafolio de Carlos

Sitio web multipágina que presenta el perfil académico, habilidades, formación, experiencia y proyectos de Carlos, estudiante de Ingeniería de Software.

## Características

- Diseño responsive para dispositivos móviles y escritorio.
- Navegación entre las páginas de inicio, educación, experiencia, proyectos y contacto.
- Tema claro y oscuro con preferencia guardada en el navegador.
- Formulario de contacto con validación en el cliente.
- Opción `CV PDF` para imprimir o guardar la hoja de vida como PDF.
- Información de contacto incluida en la versión impresa del CV.

## Tecnologías

- HTML5 semántico.
- CSS3 con variables personalizadas, diseño responsive y estilos de impresión.
- JavaScript para la interacción, el tema, la navegación móvil y la validación del formulario.

## Estructura del proyecto

```text
.
├── index.html
├── educacion.html
├── experiencia.html
├── proyectos.html
├── contacto.html
├── script.js
├── styles.css
├── img/
│   ├── foto-perfil.jpg
│   └── foto-perfil.png
└── .gitignore
```

## Uso local

Este proyecto es estático y no requiere instalación de dependencias. Para ejecutarlo:

1. Descarga o clona el repositorio.
2. Abre `index.html` en un navegador web.

También puedes utilizar la extensión **Live Server** de Visual Studio Code para disponer de recarga automática durante el desarrollo.

## Generar el CV en PDF

1. Abre `index.html`.
2. Selecciona `CV PDF`.
3. En el diálogo de impresión del navegador, elige **Guardar como PDF**.

La versión impresa oculta la navegación y los controles, y muestra el correo electrónico, la ubicación y el perfil de GitHub.

## Publicar en GitHub

Desde la carpeta del proyecto, ejecuta:

```bash
git init
git add .
git commit -m "Publicar hoja de vida y portafolio"
git branch -M main
git remote add origin https://github.com/USUARIO/NOMBRE-DEL-REPOSITORIO.git
git push -u origin main
```

Sustituye `USUARIO/NOMBRE-DEL-REPOSITORIO` por la dirección real de tu repositorio.

