import HomePresenter from "../../presenter/home-Presenter.js";

const HomePage = {
  async render() {
    return `
      <section class="home-page container mx-auto p-4">
        <h1 class="text-2xl font-bold text-center mb-6">Riwayat Pemeriksaan Anda</h1>
        
        <div id="message-container" class="message text-center mb-4"></div>
        <div id="loading-indicator" class="text-center mb-4" style="display: none;">Memuat riwayat...</div>
        
        <div id="history-list" class="history-list space-y-4">
          </div>
      </section>
    `;
  },

  async afterRender() {
    HomePresenter.init(this);
    await HomePresenter.loadUserHistory();
  },

  showMessage(messageText) {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.innerHTML = `<p class="text-red-500">${messageText}</p>`; // Contoh styling error
    } else {
      console.error("Message container not found");
    }
  },

  showLoading() {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "block";
    }
    // Kosongkan pesan error/info sebelumnya saat loading
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.innerHTML = "";
    }
  },

  hideLoading() {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }
  },

  showUserHistory(historyItems) {
    const container = document.getElementById("history-list");
    if (!container) {
      console.error("History list container not found");
      return;
    }

    if (!historyItems || historyItems.length === 0) {
      this.showEmptyHistory();
      return;
    }

    const historyHtml = historyItems
      .map((item) => {
        // Validasi dasar untuk item
        if (
          !item ||
          typeof item.result === "undefined" ||
          typeof item.score === "undefined" ||
          !item.date
        ) {
          console.warn("Invalid history item structure:", item);
          return `<div class="history-item p-4 border rounded-lg shadow bg-red-100 text-red-700">Data riwayat tidak lengkap.</div>`;
        }

        let formattedDate = "Tanggal tidak valid";
        try {
          formattedDate = new Date(item.date).toLocaleString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        } catch (e) {
          console.error("Error formatting date:", item.date, e);
        }

        // Menentukan warna berdasarkan hasil (contoh sederhana)
        let resultColorClass = "text-gray-700"; // Default
        let resultBadgeClass = "bg-gray-200 text-gray-800";
        if (item.result && item.result.toLowerCase() === "normal") {
          resultColorClass = "text-green-700";
          resultBadgeClass = "bg-green-200 text-green-800";
        } else if (
          item.result &&
          item.result.toLowerCase().includes("abnormal")
        ) {
          // Bisa "Abnormal", "Slightly Abnormal", dll.
          resultColorClass = "text-red-700";
          resultBadgeClass = "bg-red-200 text-red-800";
        }

        return `
        <article class="history-item p-4 border rounded-lg shadow bg-white hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold ${resultColorClass}">Hasil: <span class="px-2 py-1 text-sm rounded-full ${resultBadgeClass}">${item.result}</span></h3>
            <p class="text-md font-medium text-blue-600">Skor: ${item.score}</p>
          </div>
          <small class="text-gray-500">Tanggal: ${formattedDate}</small>
        </article>
      `;
      })
      .join("");

    container.innerHTML = historyHtml;
  },

  showEmptyHistory() {
    const container = document.getElementById("history-list");
    if (container) {
      container.innerHTML = `<p class="text-center text-gray-500">Belum ada riwayat pemeriksaan.</p>`;
    }
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.innerHTML = ""; // Hapus pesan error jika ada, karena ini bukan error
    }
  },
};

export default HomePage;
