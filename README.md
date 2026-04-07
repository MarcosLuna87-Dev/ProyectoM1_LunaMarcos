# Generador de Paletas Interactivo

## Descripción

Aplicación web interactiva desarrollada para que el equipo de diseñadores de **Colorfly Studio** pueda generar, explorar y exportar paletas de colores de forma rápida e intuitiva. 

Este proyecto fue construido para dar cumpliento al PI del M1 del plan de estudios de Henry.

## Características Principales

* **Generación Dinámica**: Crea paletas de 6, 8 o 9 colores aleatorios al instante.
* **Cambio de Formato**: Alterna entre formatos **HEX** y **HSL** sin perder los colores actuales de tu paleta.
* **Sistema de Bloqueo Inteligente**: Bloquea colores específicos para mantenerlos fijos mientras regeneras el resto de la paleta.
* **Copiado con un Clic**: Al hacer clic en cualquier color, el código se copia al portapapeles con un aviso visual (*Tooltip*) de "¡copiado!".
* **Exportación de Datos**: Descarga tu paleta final en un archivo `.txt` para usarla en tus proyectos.
* **Estado Inicial**: La aplicación genera automáticamente una paleta al cargar la página.

## Instrucciones de Uso

1. Selecciona la cantidad de colores (tamaño de la paleta) de la lista desplegable (Puedes elegir entre 6, 8 o 9 colores).

2. Selecciona el formato de color de salida que prefieras (HEX o HSL).

3. Haz clic en el botón "Generar Paleta". Se creará una nueva paleta de colores con las especificaciones de los puntos 1 y 2.

4. Puedes cambiar el formato del color mantenindo la misma paleta, solo modificando su valor en la lista desplegable.  

5. Si quieres bloquear algún color, desliza el mouse sobre el mismo y aparecerá la imagen de un candado abierto, hazle clic y este se cerrará indicando que el color se ha bloqueado. Vuelve a hacerle clic para desbloquearlo si decides cambiarlo.

6. Haz clic en cualquier color para copiar su código al portapapeles. Aparecerá un mensaje indicando que ha sido "copiado!"

7. Haz clic en el botón "Descargar Paleta", ubicado debajo de la paleta, para descargar un archivo `.txt` con la paleta elegida.

### Nota
* Cuando ingreses a la página tendrá una paleta generada automáticamente, que puedes usar si lo deseas.

## Decisiones Técnicas

Este proyecto fue construido respetando buenas prácticas, su estructura se creó con HTML Semántico, su diseño con CSS (aplicando un reset básico) y su lógica exclusivamente con **JavaScript Vanilla**, enfocándose en la manipulación del DOM, el manejo de estados y la conversión matemática entre formatos de color.

* **Gestión de Estado**: En lugar de depender solo del HTML para guardar los datos, la app utiliza un array de objetos (`currentPalette`). Esto permitió implementar el sistema de bloqueo y la conversión de formatos de manera eficiente.
* **Lógica de Conversión**: Se desarrollaron funciones para descomponer strings HEX en valores RGB y transformarlos a coordenadas HSL mediante fórmulas matemáticas.
* **Experiencia de Usuario (UX)**:
    * Uso de **CSS Transitions** para animaciones suaves en los tooltips.
    * **Interactividad Condicional**: El botón de bloqueo solo aparece al pasar el mouse (*hover*) para mantener una interfaz limpia, pero permanece visible si el color está bloqueado.
    * Uso de `stopPropagation()` para evitar conflictos entre la acción de copiar y la de bloquear.

## Pasos para Ejecutar la Aplicación en local

### Opción 1 — Descarga manual
1. Descargar el repositorio como ZIP desde GitHub.
2. Extraer la carpeta.
3. Abrir `index.html` en el navegador.

### Opción 2 — Clonar con Git
```bash
git clone https://github.com/MarcosLuna87-Dev/ProyectoM1_LunaMarcos.git
cd ProyectoM1_LunaMarcos
``` 
Luego:
- Abrir el archivo index.html en el navegador
---

## Deploy

Puedes acceder a la aplicacción haciendo clic en el siguiente enlace:

🔗 [Ir a la aplicación](https://marcosluna87-dev.github.io/ProyectoM1_LunaMarcos/)

---

## 📂 Estructura del Proyecto

```
ProyectoM1_LunaMarcos/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
└── README.md
```

---
## Autor
**Marcos Luna**

GitHub: [Ir a mi GitHub](https://github.com/MarcosLuna87-Dev)