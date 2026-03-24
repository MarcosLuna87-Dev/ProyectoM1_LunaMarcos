const btnGenerator = document.getElementById("btn-generator");

const paletteContainer = document.querySelector(".palette-container");

const charactersHex = "ABCDEF0123456789"
let hexColor = "#";

for (let i = 0; i < 6; i++) {
    let randomIndex = getRandomNumber(0, charactersHex.length-1);

    hexColor+= charactersHex[randomIndex];    
}


const boxColor = document.createElement("div");
boxColor.className = "box-color";
boxColor.innerText = hexColor;
boxColor.style.backgroundColor = hexColor;
paletteContainer.appendChild(boxColor);




function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min +1) + min)
}

