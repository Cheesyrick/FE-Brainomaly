import BookmarkModel from "../model/bookmark-model";

const BookmarkPresenter = {
  view: null,

  init(view) {
    this.view = view;
  },

  async loadBookmarks() {
    const bookmarks = await BookmarkModel.getAll();
    this.view.showBookmarks(bookmarks);
  },

  async deleteBookmark(id) {
    await BookmarkModel.delete(id);
    this.loadBookmarks();
  },
};

export default BookmarkPresenter;
