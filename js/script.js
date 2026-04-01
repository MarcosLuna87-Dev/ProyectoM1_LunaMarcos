// 1. Variables globales======================================================
let currentPalette = []; // Aquí guardaremos los colores actuales
const btnGenerator = document.getElementById("btn-generator");
const btnDownload = document.getElementById("btn-download");
const paletteContainer = document.querySelector(".palette-container");
const formatSelect = document.getElementById("palette-format");

//2. Funciones de ayuda========================================================

function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min +1) + min)
}

function getRandomHexColor() {
    const charactersHex = "0123456789ABCDEF"
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
        let randomIndex = getRandomNumber(0, charactersHex.length-1);

        hexColor+= charactersHex[randomIndex];    
    }

    return hexColor;
}

// Función auxiliar para obtener solo los números de hexToRgb
function hexToRgbValues(hex) {
    hex = hex.replace(/^#/, '');
    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Acromático (gris)
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Convertimos a los formatos estándar: H(0-360), S(%), L(%)
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

// 3. Funciones Principales=====================================================

function getPalette() {
    const paletteSize = document.getElementById("palette-size").value;
    const paletteFormat = document.getElementById("palette-format").value;
    
    paletteContainer.innerHTML = "";

    // Si la paleta está vacía, la inicializamos
    if (currentPalette.length === 0) {
        for (let i = 0; i < paletteSize; i++) {
            currentPalette.push({ color: getRandomHexColor(), isLocked: false });
        }
    } else {
        // Si ya existe, solo actualizamos los que NO están bloqueados
        for (let i = 0; i < paletteSize; i++) {
            if (currentPalette[i] && !currentPalette[i].isLocked) {
                currentPalette[i].color = getRandomHexColor();
            } else if (!currentPalette[i]) {
                // Si el usuario aumentó el tamaño de la paleta (ej. de 6 a 8)
                currentPalette.push({ color: getRandomHexColor(), isLocked: false });
            }
        }
        // Si el usuario disminuyó el tamaño, recortamos el array
        currentPalette = currentPalette.slice(0, paletteSize);
    }
    
    renderPalette(paletteFormat);
}

function renderPalette(format) {
    paletteContainer.innerHTML = "";

    currentPalette.forEach((item) => {
        const boxContainer = document.createElement("div");
        boxContainer.className = "box-container";
        
        // Si el item ya viene bloqueado de antes, le ponemos la clase
        if (item.isLocked) {
            boxContainer.classList.add("locked");
        }

        const lockBtn = document.createElement("button");
        lockBtn.className = "lock-btn";
        lockBtn.innerText = item.isLocked ? "🔒" : "🔓";
        
        lockBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Importante: evita que se active el copiado al hacer clic en el candado
            
            item.isLocked = !item.isLocked; // Invertimos el estado lógico
            
            // Actualizamos la interfaz visualmente
            lockBtn.innerText = item.isLocked ? "🔒" : "🔓";
            boxContainer.classList.toggle("locked", item.isLocked);
        });

        // Lógica de texto (HEX o HSL)
        let displayText;
        if (format === "hsl") {
            const rgb = hexToRgbValues(item.color);
            displayText = rgbToHsl(rgb.r, rgb.g, rgb.b);
        } else {
            displayText = item.color;
        }

        // Estructura del contenedor
        boxContainer.innerText = displayText;
        boxContainer.appendChild(lockBtn);

        // Evento para copiar el código
        boxContainer.addEventListener("click", () => {
            copyToClipboard(displayText, boxContainer);
        });

        const boxColor = document.createElement("div");
        boxColor.className = "box-color";            
        boxColor.style.backgroundColor = item.color;
        
        boxContainer.appendChild(boxColor);
        paletteContainer.appendChild(boxContainer);
    });
}

function copyToClipboard(text, container) {
    navigator.clipboard.writeText(text).then(() => {
        // 1. Crear el elemento tooltip
        const tooltip = document.createElement("span");
        tooltip.className = "copy-tooltip";
        tooltip.innerText = "Copiado!";
        
        // 2. Agregarlo al contenedor del color
        container.appendChild(tooltip);

        // 3. Forzar un pequeño delay para que la transición de CSS funcione
        setTimeout(() => {
            tooltip.classList.add("show");
        }, 10);

        // 4. Quitarlo después de 1.5 segundos
        setTimeout(() => {
            tooltip.classList.remove("show");
            // Esperamos a que termine la animación de salida para borrarlo del DOM
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }, 1500);
        
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

function downloadPalette() {
    if (currentPalette.length === 0) {
        alert("Primero genera una paleta para poder descargarla");
        return;
    }

    const format = document.getElementById("palette-format").value;
    let content = "Colorfly Studio - Tu Paleta de Colores\n";
    content += "====================================\n\n";

    currentPalette.forEach((item, index) => {
        let colorText;
        if (format === "hsl") {
            const rgb = hexToRgbValues(item.color);
            colorText = rgbToHsl(rgb.r, rgb.g, rgb.b);
        } else {
            colorText = item.color;
        }
        content += `Color ${index + 1}: ${colorText}\n`;
    });

    // Creamos un "Blob" (Binary Large Object) con el contenido de texto
    const blob = new Blob([content], { type: "text/plain" });
    
    // Creamos un enlace temporal para forzar la descarga
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mi-paleta-colorfly.txt";
    
    // Simulamos el clic y removemos el enlace
    link.click();
    URL.revokeObjectURL(link.href);
}

// 4. Event Listeners===========================================================

btnGenerator.addEventListener("click", getPalette);
btnDownload.addEventListener("click", downloadPalette);
formatSelect.addEventListener("change", () => {
    // Si ya hay una paleta generada, simplemente la volvemos a dibujar en el nuevo formato
    if (currentPalette.length > 0) {
        renderPalette(formatSelect.value);
    }
});

// 5. Inicialización===========================================================

document.addEventListener("DOMContentLoaded", () => {
    getPalette();
});


