// login-page.js
import LoginPresenter from "../../presenter/login-Presenter";

const LoginPage = {
  async render() {
    return `
      <section class="login-page container mx-auto p-4 max-w-md">
        <h1 class="text-2xl font-bold text-center mb-6">Masuk ke Akun Anda</h1>
        <div id="message-container" class="mb-4 text-center"></div>

        <form id="login-form" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" required 
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" required 
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <button type="submit" id="login-button"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Masuk
          </button>
        </form>
        <p class="mt-6 text-center text-sm text-gray-600">
          Belum punya akun? 
          <a href="#/regist" class="font-medium text-indigo-600 hover:text-indigo-500">Daftar di sini</a>
        </p>
      </section>
    `;
  },

  async afterRender() {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const messageContainer = document.getElementById("message-container");
    const loginButton = document.getElementById("login-button");

    if (loginForm) {
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        messageContainer.innerHTML = ""; // Bersihkan pesan sebelumnya
        loginButton.disabled = true;
        loginButton.textContent = "Memproses...";

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
          messageContainer.innerHTML = `<p class="text-red-500">Email dan password harus diisi.</p>`;
          loginButton.disabled = false;
          loginButton.textContent = "Masuk";
          return;
        }

        await LoginPresenter.handleLogin({
          email,
          password,
          onSuccess: () => {
            // Tidak perlu menampilkan pesan sukses spesifik di sini jika langsung redirect
            // messageContainer.innerHTML = `<p class="text-green-500">Login berhasil! Mengarahkan...</p>`;
            loginButton.textContent = "Masuk";
            loginButton.disabled = false;
            // Arahkan ke halaman utama atau dashboard setelah login berhasil
            window.location.hash = "/home"; // Ganti "/home" dengan path halaman utama Anda
          },
          onError: (errorMessage) => {
            messageContainer.innerHTML = `<p class="text-red-500">${errorMessage}</p>`;
            loginButton.disabled = false;
            loginButton.textContent = "Masuk";
          },
        });
      });
    } else {
      console.error("Login form not found");
    }
  },
};

export default LoginPage;
