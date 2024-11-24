const PUERTO = '3000';
const HOST = `http://localhost:${PUERTO}/`;
const URL = 'color'; //url del controlador de la api
const BULK = 'bulk'; //url del controlador de la api
const NAME = 'color'; //nombre de la api

// Obtener todos los colores
export const getAllColors = async () => {
    try {
        const resp = await fetch(`${HOST}${URL}`);
        return await resp.json();
    } catch (error) {
        console.error(`Error at getAll of ${NAME}: ${error}`);
        return error;
    }
}

// Obtener un color por ID
export const getColorById = async (id) => {
    try {
        const resp = await fetch(`${HOST}${URL}/${id}`);
        return await resp.json();
    } catch (error) {
        console.error(`Error at getById of ${NAME}: ${error}`);
        return error;
    }
};

// Crear un nuevo color (POST)
export const createColor = async (colorData) => {
    try {
        const resp = await fetch(`${HOST}${URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(colorData),
        });
        return await resp.json();
    } catch (error) {
        console.error(`Error at create of ${NAME}: ${error}`);
        return error;
    }
};

// Crear muchos colores (POST)
export const createColors = async (colorsData) => {
    try {
        const resp = await fetch(`${HOST}${URL}${BULK}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(colorData),
        });
        return await resp.json();
    } catch (error) {
        console.error(`Error at massive create of ${NAME}: ${error}`);
        return error;
    }
};


// Actualizar un color (PUT)
export const updateColor = async (id, colorData) => {
    try {
        const resp = await fetch(`${HOST}${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(colorData),
        });
        return await resp.json();
    } catch (error) {
        console.error(`Error at update of ${NAME}: ${error}`);
        return error;
    }
};

// Eliminar un color por ID (DELETE)
export const deleteColorById = async (id) => {
    try {
        const resp = await fetch(`${HOST}${URL}/${id}`, {
            method: 'DELETE',
        });
        return await resp.json(); // Asume que la API devuelve una respuesta en JSON
    } catch (error) {
        console.error(`Error at delete of ${NAME}: ${error}`);
        return error;
    }
};


// Eliminar todos los colores (DELETE)
export const deleteColors = async () => {
    try {
        const resp = await fetch(`${HOST}${URL}`, {
            method: 'DELETE',
        });
        return await resp.json(); // Asume que la API devuelve una respuesta en JSON
    } catch (error) {
        console.error(`Error at massive delete of ${NAME}: ${error}`);
        return error;
    }
};