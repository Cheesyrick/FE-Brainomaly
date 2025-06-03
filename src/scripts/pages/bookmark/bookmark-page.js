import BookmarkPresenter from "../../presenter/boookmark-presenter";

const BookmarkPage = {
  async render() {
    return `
      <section class="bookmark-page container">
        <h1>Bookmark Cerita</h1>
        <div id="bookmark-list" class="story-list"></div>
        <div id="message" class="message"></div>

        <div id="image-modal" class="image-modal-overlay">
          <img id="image-modal-img" class="image-modal-content" />
        </div>
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

    BookmarkPresenter.init(this);
    await BookmarkPresenter.loadBookmarks();
  },

  showBookmarks(bookmarks) {
    const container = document.getElementById("bookmark-list");
    const message = document.getElementById("message");

    container.innerHTML = "";
    message.innerText = "";

    if (bookmarks.length === 0) {
      message.innerText = "Belum ada cerita yang dibookmark.";
      return;
    }

    container.innerHTML = bookmarks
      .map((story) => {
        let dateString = "";
        try {
          const date = new Date(story.createdAt);
          if (!isNaN(date)) {
            dateString = date.toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short",
            });
          } else {
            dateString = "-";
          }
        } catch {
          dateString = "-";
        }

        return `
        <article class="story-item">
          <img src="${story.photoUrl}" alt="Foto ${story.name}" />
          <div class="story-content">
            <h2>${story.name}</h2>
            <p>${story.description}</p>
            <small>${dateString}</small>
            <button class="delete-bookmark-btn" data-id="${story.id}" aria-label="hapus bookmark">Hapus</button>
          </div>
        </article>
      `;
      })
      .join("");

    this._attachDeleteHandlers();
    this._setupLightbox();
  },

  _attachDeleteHandlers() {
    document.querySelectorAll(".delete-bookmark-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const id = event.target.dataset.id;
        BookmarkPresenter.deleteBookmark(id);
      });
    });
  },

  _setupLightbox() {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("image-modal-img");

    document.querySelectorAll(".story-item img").forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        modalImg.src = img.src;
        modal.classList.add("open");
      });
    });

    modal.addEventListener("click", () => modal.classList.remove("open"));
  },

  showMessage(msg) {
    document.getElementById("message").innerText = msg;
  },
};

export default BookmarkPage;
