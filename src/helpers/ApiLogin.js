const url = "http://localhost:3000/api/login"; 

export const authLogin = async (datos) => {
    try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Devolver el token y el usuario al componente
          return {
            token: data.token,
            user: data.user,  // Esto debe incluir el role del usuario
          };
        } else {
          return { msg: data.msg };
        }
      } catch (error) {
        return { msg: "Error en el servidor" };
      }
};

