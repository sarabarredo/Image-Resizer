const uploadBox = document.querySelector('.upload-box');
previewImage = uploadBox.querySelector('img');
fileInput = uploadBox.querySelector('input');
widthInput = document.querySelector('.width input');
heightInput = document.querySelector('.height input');
ratioInput = document.querySelector('.ratio input');
qualityInput = document.querySelector('.quality input');
downloadBtn = document.querySelector('.download-btn');

let originalImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0]; // Getting first user selected file
    if(!file) return; // Return if user hasn't selected any file
    previewImage.src = URL.createObjectURL(file); // Pasa la URL del archivo seleccionado al src de la preview image
    previewImage.addEventListener('load', () => {
        widthInput.value = previewImage.naturalWidth; // Devuelve el ancho original de la imagen
        heightInput.value = previewImage.naturalHeight; // Devuelve el alto original de la imagen
        originalImageRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        document.querySelector('.wrapper').classList.add('active'); // Una vez cargada la imagen se le añade la clase 'active' al wrapper
    });
}

// Obtener la altura de acuerdo a la relacion de aspecto
widthInput.addEventListener('keyup', () => {
    const height = ratioInput.checked ? widthInput.value / originalImageRatio : heightInput.value; 
    heightInput.value = Math.floor(height);
});

 // Obtener la anchura de acuerdo a la relacion de aspecto
heightInput.addEventListener('keyup', () => {
    const width = ratioInput.checked ? heightInput.value * originalImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    const context = canvas.getContext('2d');

    // Si la casilla de reducir calidad esta marcada, se reduce al 70% de calidad (0.7). Si no, se mantiene al 100% (1.0).
    const imageQuality = qualityInput.checked ? 0.7 : 1.0;

    // Establecer el lienzo segun el ancho y alto escogidos
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // Dibujar la imagen seleccionada en el canvas
    context.drawImage(previewImage, 0, 0, canvas.width, canvas.height);  // Imagen, coordenada-X, coordenada-Y, ancho, alto
    a.href = canvas.toDataURL('image/jpeg', imageQuality);
    a.download = new Date().getTime(); // Pasa el valor de la hora actual como nombre del archivo
    a.click();
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());




