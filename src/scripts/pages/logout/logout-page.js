import LogoutPresenter from "../../presenter/logout-Presenter";

const LogoutPage = {
  async render() {
    return `
      <section class="logout-page container">
        <button id="logout-btn">Logout</button>
      </section>
    `;
  },

  async afterRender() {
    const token = localStorage.getItem("user_token");

    if (!token) {
      alert("Anda belum login. Silakan login terlebih dahulu.");
      window.location.hash = "/login";
      return;
    }

    document
      .getElementById("logout-btn")
      .addEventListener("click", () => LogoutPresenter.logout());
  },
};

export default LogoutPage;
