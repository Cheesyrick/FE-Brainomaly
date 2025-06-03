// view-regist.js
import RegisterPresenter from "../../presenter/regist-Presenter";

const RegisterPage = {
  async render() {
    return `
      <section class="register-page">
        <h1>Daftar Akun Baru</h1>
        <div id="message-container" style="margin-bottom: 1em;"></div>

        <form id="register-form">
          {/* Role disembunyikan, default "user" untuk menyederhanakan form */}
          <input type="hidden" id="role" name="role" value="user" />

          <p>
            <label for="name">Nama Lengkap:</label><br />
            <input type="text" id="name" name="name" required />
          </p>

          <p>
            <label for="email">Email:</label><br />
            <input type="email" id="email" name="email" required />
          </p>

          <p>
            <label for="password">Password:</label><br />
            <input type="password" id="password" name="password" required minlength="6" />
            <small>Minimal 6 karakter.</small>
          </p>

          <p>
            <label for="birthPlace">Tempat Lahir:</label><br />
            <input type="text" id="birthPlace" name="birthPlace" required />
          </p>

          <p>
            <label for="birthDate">Tanggal Lahir:</label><br />
            <input type="date" id="birthDate" name="birthDate" required />
          </p>

          <p>
            <label for="gender">Jenis Kelamin:</label><br />
            <select id="gender" name="gender" required>
              <option value="">Pilih Jenis Kelamin</option>
              <option value="male">Male</option> 
              <option value="female">Female</option>
              <option value="other">Other</option>
              {/* Sesuaikan value jika backend mengharapkan format lain, misal "Laki-laki" */}
            </select>
          </p>

          <button type="submit" id="register-button">Daftar</button>
        </form>
        <p>
          Sudah punya akun? <a href="#/login">Masuk di sini</a>
        </p>
      </section>
    `;
  },

  async afterRender() {
    const form = document.getElementById("register-form");
    const messageContainer = document.getElementById("message-container");
    const registerButton = document.getElementById("register-button");

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        messageContainer.textContent = "";
        registerButton.disabled = true;
        registerButton.textContent = "Mendaftar...";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;
        const birthPlace = document.getElementById("birthPlace").value.trim();
        const birthDate = document.getElementById("birthDate").value;
        const gender = document.getElementById("gender").value;

        if (
          !name ||
          !email ||
          !password ||
          !role ||
          !birthPlace ||
          !birthDate ||
          !gender
        ) {
          messageContainer.textContent =
            "Semua field yang terlihat dan role (tersembunyi) harus diisi.";
          messageContainer.style.color = "red";
          registerButton.disabled = false;
          registerButton.textContent = "Daftar";
          return;
        }

        const result = await RegisterPresenter.register({
          name,
          email,
          password,
          role,
          birthPlace,
          birthDate,
          gender,
        });

        if (result.success) {
          messageContainer.textContent = result.message;
          messageContainer.style.color = "green";
          form.reset();
          if (document.getElementById("role")) {
            document.getElementById("role").value = "user";
          }
          setTimeout(() => {
            window.location.hash = "/login";
          }, 1500);
        } else {
          messageContainer.textContent = result.message;
          messageContainer.style.color = "red";
          registerButton.disabled = false;
          registerButton.textContent = "Daftar";
        }
      });
    }
  },
};

export default RegisterPage;
