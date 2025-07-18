const url = "https://backend-turnero97i.onrender.com/api/login"; 

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
          return {
            token: data.token,
            user: data.user,  
          };
        } else {
          return { msg: data.msg };
        }
      } catch (error) {
        return { msg: "Error en el servidor" };
      }
};

