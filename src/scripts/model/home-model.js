// home-model.js
// Mengganti nama StoryModel menjadi UserHistoryModel untuk lebih merefleksikan fungsinya
const UserHistoryModel = {
  async fetchAll() {
    const token = localStorage.getItem("user_token"); // Pastikan key token ini konsisten
    if (!token) {
      console.warn("User token not found in localStorage.");
      throw new Error("NOT_LOGGED_IN");
    }

    const response = await fetch(
      "https://brainomaly-be-production.up.railway.app/user/history", // Endpoint baru
      {
        method: "GET", // Method GET sesuai permintaan
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response Status (User History):", response.status);
    const result = await response.json();
    console.log("API Response JSON (User History):", result);

    if (response.status === 401) {
      throw new Error("TOKEN_EXPIRED");
    }
    if (!response.ok) {
      const errorMessage =
        result.message ||
        `Gagal mengambil riwayat pengguna. Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    // Asumsi API mengembalikan array history.
    // Sesuaikan bagian ini jika struktur data dari API berbeda.
    // Contoh: jika data ada di dalam properti 'data' -> return result.data;
    // Jika API mengembalikan array langsung:
    if (Array.isArray(result)) {
      return result;
    }
    // Jika data ada di dalam properti 'data'
    if (result.data && Array.isArray(result.data)) {
      return result.data;
    }
    // Jika data ada di dalam properti 'history'
    if (result.history && Array.isArray(result.history)) {
      return result.history;
    }
    // Jika data ada di dalam properti 'listHistory' (seperti pada contoh StoryModel lama)
    if (result.listStory && Array.isArray(result.listStory)) {
      // Menggunakan listStory sebagai contoh dari kode lama
      return result.listStory;
    }

    // Fallback jika struktur tidak diketahui dan ada 'message', mungkin tidak ada data list
    if (
      result.message &&
      !Array.isArray(result.data) &&
      !Array.isArray(result) &&
      !Array.isArray(result.history) &&
      !Array.isArray(result.listStory)
    ) {
      console.warn(
        "API response for history might not contain an array of items as expected, or data is empty:",
        result
      );
      return []; // Kembalikan array kosong jika data tidak sesuai format yang diharapkan
    }

    console.warn(
      "Unexpected API response structure for user history, returning empty array:",
      result
    );
    return []; // Kembalikan array kosong sebagai default aman
  },
};

export default UserHistoryModel;
