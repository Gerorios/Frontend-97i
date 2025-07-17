const url = "http://localhost:3000/api/register"; 

export const authRegistro = async (datos) => {
    try {
        const resp = await fetch(url, {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const data = await resp.json();

        return data;
    } catch (error) {
        return { msg: "No se conectó con backend" };
    }
}
