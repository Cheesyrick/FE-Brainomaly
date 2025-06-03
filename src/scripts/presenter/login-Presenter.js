// login-presenter.js
import Auth from "../model/login-model"; // Pastikan path ini benar

const LoginPresenter = {
  async handleLogin({ email, password, onSuccess, onError }) {
    console.log("[LoginPresenter] handleLogin dipanggil dengan email:", email);
    try {
      const token = await Auth.login(email, password);
      console.log("[LoginPresenter] Token diterima dari Auth.login:", token);

      if (token) {
        // Pastikan token memiliki nilai sebelum disimpan
        localStorage.setItem("user_token", token);
        console.log(
          "[LoginPresenter] user_token berhasil disimpan ke localStorage:",
          localStorage.getItem("user_token")
        );
        onSuccess();
      } else {
        // Ini seharusnya tidak terjadi jika Auth.login melempar error saat token tidak ada,
        // tapi sebagai pengaman tambahan.
        console.error(
          "[LoginPresenter] Token dari Auth.login adalah null atau undefined, tidak disimpan."
        );
        onError("Gagal mendapatkan token dari server (token kosong).");
      }
    } catch (error) {
      console.error("[LoginPresenter] Error saat proses login:", error.message);
      console.error("[LoginPresenter] Detail Error:", error); // Untuk melihat stack trace jika ada
      onError(error.message);
    }
  },
};

export default LoginPresenter;
