import api from "./api";


export const loginUser = async (credentials) => {
    try {
      const response = await api.post("/users/login/", credentials);
      localStorage.setItem("access_token", response.data.access); // Save JWT
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      throw error;
    }
  };

export const logoutUser = () => {
    localStorage.removeItem("access_token"); // Remove JWT
  };