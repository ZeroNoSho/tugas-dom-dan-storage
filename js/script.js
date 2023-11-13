const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const MOVED_EVENT = "moved-book";
const DELETED_EVENT = "deleted-book";
const STORAGE_KEY = "data_storage_buku";
const books = [];

const toat = (e) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: e,
  });
};

document.addEventListener(RENDER_EVENT, () => {
  const unfinishedBook = document.getElementById("belum");
  const finishedBook = document.getElementById("sudah");

  unfinishedBook.innerHTML = "";
  finishedBook.innerHTML = "";

  books.forEach((bookItem) => {
    const bookElement = makeBookElement(bookItem);
    bookItem.isComplete
      ? finishedBook.append(bookElement)
      : unfinishedBook.append(bookElement);
  });
});

document.addEventListener(SAVED_EVENT, () => {
  toat("Berhasil Disimpan!");
});

document.addEventListener(MOVED_EVENT, () => {
  toat("Berhasil Dipindahkan!");
});

document.addEventListener(DELETED_EVENT, () => {
  toat("Berhasil Hapus!");
});

document.addEventListener("DOMContentLoaded", () => {
  if (isStorageExist()) {
    loadDataFromStorage();
  }

  const simpanForm = document.getElementById("databuku");
  simpanForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });
});
