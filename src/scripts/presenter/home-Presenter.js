// home-presenter.js
import UserHistoryModel from "../model/home-model.js"; // Menggunakan UserHistoryModel yang baru

const HomePresenter = {
  view: null,

  init(view) {
    this.view = view;
    if (!this.view) {
      console.error("View not initialized for HomePresenter");
    }
  },

  async loadUserHistory() {
    if (!this.view) {
      console.error(
        "HomePresenter: View is not initialized. Cannot load user history."
      );
      // Coba panggil showMessage jika view mungkin sudah ada tapi belum di-set di presenter
      if (typeof this.view.showMessage === "function") {
        this.view.showMessage(
          "Terjadi kesalahan pada aplikasi (view tidak siap)."
        );
      }
      return;
    }
    try {
      this.view.showLoading();
      const historyItems = await UserHistoryModel.fetchAll();

      if (historyItems && historyItems.length > 0) {
        this.view.showUserHistory(historyItems);
      } else {
        this.view.showEmptyHistory();
      }
    } catch (error) {
      console.error("Error loading user history:", error);
      if (error.message === "NOT_LOGGED_IN") {
        this.view.showMessage(
          "Sesi Anda tidak ditemukan. Silakan login terlebih dahulu untuk melihat riwayat."
        );
        // Pertimbangkan untuk mengarahkan ke halaman login:
        // window.location.hash = "/login";
      } else if (
        error.message === "TOKEN_EXPIRED" ||
        error.message === "UNAUTHORIZED"
      ) {
        localStorage.removeItem("user_token");
        this.view.showMessage(
          "Sesi Anda telah berakhir. Silakan login ulang untuk melihat riwayat."
        );
        // Pertimbangkan untuk mengarahkan ke halaman login:
        // window.location.hash = "/login";
      } else {
        this.view.showMessage(
          `Gagal memuat riwayat: ${error.message}. Coba lagi nanti.`
        );
      }
    } finally {
      this.view.hideLoading();
    }
  },
};

export default HomePresenter;
