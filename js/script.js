const btnGenerator = document.getElementById("btn-generator");

const paletteContainer = document.querySelector(".palette-container");



function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min +1) + min)
}

function getRandomColor() {
    const charactersHex = "ABCDEF0123456789"
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
        let randomIndex = getRandomNumber(0, charactersHex.length-1);

        hexColor+= charactersHex[randomIndex];    
    }

    return hexColor;
}

function getPalette() {
    console.log("El botón funciona bien");
    paletteContainer.innerText = " ";
    const paletteSize = document.getElementById("palette-size").value;
    console.log(`cantidad de colores: ${paletteSize}`);

    for (let i = 0; i < paletteSize; i++) {
        const boxColor = document.createElement("div");
        boxColor.className = "box-color";
        boxColor.innerText = getRandomColor();
        boxColor.style.backgroundColor = boxColor.innerText;
        paletteContainer.appendChild(boxColor);    
    
    }
    
}

btnGenerator.addEventListener("click", getPalette);




