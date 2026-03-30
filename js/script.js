const btnGenerator = document.getElementById("btn-generator");

const paletteContainer = document.querySelector(".palette-container");

let currentPalette = []; // Aquí guardaremos los colores actuales



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

function getPalette() {
    paletteContainer.innerHTML = ""; // Limpiamos el contenedor
    currentPalette = []; // Vaciamos la paleta anterior
    
    const paletteSize = document.getElementById("palette-size").value;
    const paletteFormat = document.getElementById("palette-format").value;

    for (let i = 0; i < paletteSize; i++) {
        // Generamos un color base (siempre HEX para facilitar la conversión luego)
        const color = getRandomHexColor(); 
        currentPalette.push(color); // Lo guardamos
    }
    
    renderPalette(paletteFormat); // Llamamos a una función que solo se encargue de dibujar
}

btnGenerator.addEventListener("click", getPalette);

function renderPalette(format) {
    paletteContainer.innerHTML = "";

    currentPalette.forEach(colorHex => {
        const boxContainer = document.createElement("div");
        boxContainer.className = "box-container";
        boxContainer.style.cursor = "pointer";

        // Determinamos el texto según el formato
        let displayText;
        if (format === "hsl") {
            const rgb = hexToRgbValues(colorHex);
            displayText = rgbToHsl(rgb.r, rgb.g, rgb.b);
        } else {
            displayText = colorHex;
        }

        boxContainer.innerText = displayText;

        // Evento de clic para copiar usando el nuevo tooltip
        boxContainer.addEventListener("click", () => {
            copyToClipboard(displayText, boxContainer);
        });

        const boxColor = document.createElement("div");
        boxColor.className = "box-color";            
        boxColor.style.backgroundColor = colorHex;
        
        boxContainer.appendChild(boxColor);
        paletteContainer.appendChild(boxContainer);
    });
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

const formatSelect = document.getElementById("palette-format");

formatSelect.addEventListener("change", () => {
    // Si ya hay una paleta generada, simplemente la volvemos a dibujar en el nuevo formato
    if (currentPalette.length > 0) {
        renderPalette(formatSelect.value);
    }
});

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

function copyToClipboard(text, container) {
    navigator.clipboard.writeText(text).then(() => {
        // 1. Crear el elemento tooltip
        const tooltip = document.createElement("span");
        tooltip.className = "copy-tooltip";
        tooltip.innerText = "Código copiado!";
        
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



