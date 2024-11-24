import { 
    getAllColors,
    createColor,
    createColors,
    deleteColorById,
    deleteColors,
    getColorById,
    updateColor
} from "./apiColor.js";

document.addEventListener("DOMContentLoaded", () => {

    /**
     * Referencias HTML
     */

    // Formulario
    const colorForm = document.querySelector('#colorForm');
    const nameInput = document.querySelector('#nameInput');
    const hexaRgbInput = document.querySelector('#hexaRgbInput');

    // Lista de registros
    const colorList = document.querySelector('.color-list');

    /**
     * FUNCIONES DE COMPONENTES
     */

    /**
     * Genera el listado de elementos de la entidad color.
     * @param {Color[]} colors arreglo de registros de la entidad color
     */
    const showColors = (colors) => {
        colorList.innerHTML = '';
        if(!colors) {
            console.log('colors empty at showColors');
            return;
        }
        colors.forEach((color) => {
            const colorItem = document.createElement('div');
            colorItem.className = 'color-item';
            const colorCircle = document.createElement('div');
            colorCircle.className = 'color-circle';
            colorCircle.style.backgroundColor = color.hexa_rgb;
            
            const colorDetails = document.createElement('div');
            colorDetails.className = 'color-details';
            colorDetails.innerHTML =`
                <span><strong>Nombre:</strong> ${color.name}</span>
                <span><strong>Codigo Hexadecimal:</strong> ${color.hexa_rgb}</span>
            `;
            colorItem.appendChild(colorCircle);
            colorItem.appendChild(colorDetails);
            colorList.appendChild(colorItem);
        });
    }

    const inicializacion = async () => {
        showColors(await getAllColors());
    };

    /**
     * EVENTOS
     */
    colorForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto (enviar por GET)
        const selectedColor = hexaRgbInput.value;
        const colorName = nameInput.value.trim();
        if(!colorName){
            alert('Por favor, ingrese un nombre para el color');
            return;
        }
        const newColor = {
            name: colorName,
            hexa_rgb: selectedColor
        }
        const result = await createColor(newColor);
        console.log(result);
        showColors(await getAllColors());
    });

    inicializacion();
});