const LogoutPresenter = {
  async logout() {
    try {
      localStorage.removeItem("user_token");

      window.location.hash = "/login";

      alert("Anda telah berhasil logout.");
    } catch (error) {
      alert("Terjadi kesalahan saat logout.");
    }
  },
};

export default LogoutPresenter;
