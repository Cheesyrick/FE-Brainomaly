// login-model.js
const Auth = {
  async login(email, password) {
    const response = await fetch(
      "https://brainomaly-be-production.up.railway.app/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const result = await response.json();
    // Log ini sangat penting untuk debugging, biarkan aktif selama pengembangan
    console.log(
      "API Login Response (login-model.js):",
      JSON.stringify(result, null, 2)
    );

    if (!response.ok) {
      // Jika respons tidak ok, coba ambil pesan error dari API
      const errorMessage =
        result && result.message
          ? result.message
          : "Login gagal. Silakan coba lagi.";
      throw new Error(errorMessage);
    }

    // Ambil token dari result.token sesuai struktur API baru
    if (result && typeof result.token !== "undefined") {
      console.log("[login-model.js] Token ditemukan:", result.token);
      return result.token; // Kembalikan tokennya
    } else {
      // Jika token tidak ditemukan di struktur yang diharapkan
      console.error(
        "[login-model.js] Token tidak ditemukan dalam respons API. Respons aktual:",
        result
      );
      throw new Error(
        "Format respons login dari server tidak sesuai atau token tidak ditemukan."
      );
    }
  },
};

export default Auth;
