import StoryModel from "../model/addStory-model";
import NotificationHelper from "../utils/notification-helper";

const AddStoryPresenter = {
  view: null,
  init(view) {
    this.view = view;
    this._setupMap();
    this.view.bindCameraHandlers(
      this._startCamera.bind(this),
      this._capturePhoto.bind(this),
      this._cancelCamera.bind(this)
    );
    this.view.bindFormSubmit(this._handleSubmit.bind(this));
  },

  _setupMap() {
    const { map, marker } = this.view.initMap();
    this._map = map;
    this._marker = marker;
  },

  async _startCamera() {
    try {
      this._stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.view.showCamera(this._stream);
    } catch {
      this.view.showAlert("Gagal mengakses kamera");
    }
  },

  _capturePhoto() {
    const file = this.view.captureOnCanvas();
    this.view.stopCamera(this._stream);
    return file;
  },

  _cancelCamera() {
    if (this._stream) this.view.stopCamera(this._stream);
  },

  async _handleSubmit(formValues) {
    try {
      const { description, photo } = formValues;
      const { lat, lng } = this._marker.getLatLng();

      if (!description || !photo)
        return this.view.showAlert("Deskripsi & foto wajib");

      await StoryModel.add({ description, photo, lat, lon: lng });
      this.view.showAlert("Cerita berhasil dikirim!", "success");

      if (NotificationHelper.isEnabled()) {
        NotificationHelper.showNotification("Cerita berhasil dikirim!", {
          body: "Terima kasih sudah berbagi cerita 😊",
          icon: "/dist/favicon.png",
        });
      }

      window.location.hash = "/";
    } catch (err) {
      if (err.message === "NOT_LOGGED_IN") {
        window.location.hash = "/login";
      } else if (err.message === "TOKEN_EXPIRED") {
        localStorage.removeItem("user_token");
        window.location.hash = "/login";
      } else {
        this.view.showAlert(err.message);
      }
    }
  },
};

export default AddStoryPresenter;
