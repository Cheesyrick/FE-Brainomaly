const StoryModel = {
  async fetchAll() {
    const token = localStorage.getItem("user_token");
    if (!token) throw new Error("NOT_LOGGED_IN");

    const res = await fetch("https://story-api.dicoding.dev/v1/stories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.status === 401) throw new Error("TOKEN_EXPIRED");
    if (!res.ok) throw new Error(data.message || "FETCH_FAILED");
    return data.listStory;
  },

  async add({ description, photo, lat, lon }) {
    const token = localStorage.getItem("user_token");
    if (!token) throw new Error("NOT_LOGGED_IN");

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    formData.append("lat", lat);
    formData.append("lon", lon);

    const res = await fetch("https://story-api.dicoding.dev/v1/stories", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    if (res.status === 401) throw new Error("TOKEN_EXPIRED");
    if (!res.ok) throw new Error(data.message || "ADD_FAILED");
    return data;
  },
};

export default StoryModel;
