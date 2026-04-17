import API from "./app";

export const loginUser = async (data) => {
  const response = await API.post("/auth/login/", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await API.post("/auth/register/", data);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

export const updateUserProfile = async (data) => {
  const response = await API.put("/auth/profile", data);
  return response.data;
};
