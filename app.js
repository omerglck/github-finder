import { elements } from "./js/helpers.js";
import { Github } from "./js/api.js";
import { UI } from "./js/ui.js";

//Github class'ın örneğini oluşturma (miras alma)
const github = new Github();
// UI class'ın örneği
const ui = new UI();

//! Olay İzleyicileri
elements.searchBtn.addEventListener("click", getInput);

//* Metotlar

//todo Inputun içindeki dataya erişme
function getInput() {
  // inputta bir değer varsa çalışır
  if (elements.searchInput.value) {
    // api isteği atar
    github
      .fetchUserData(elements.searchInput.value)
      .then((res) => {
        // eğer kullanıcı bulunamadıysa
        if (res.data.message === "Not Found") {
          ui.showAlert("Aradığınız kullanıcı bulunamadı", "alert alert-danger");
        } else {
          //kullanıcı bulunduysa
          ui.showAlert("Kullanıcı bulundu", "alert alert-success");
          ui.renderProfile(res.data);
          ui.renderProjects(res.repos);
        }
      })
      .catch((err) => console.log(err));
    return;
  }
  ui.showAlert(
    "Form alanını doldurunuz!",
    "alert bg-warning fw-bold text-dark"
  );
}
//todo Enter tuşu ile arama
document.addEventListener("keydown", (e) => {
  //   console.log("Tuş:", e.key);
  if (e.key === "Enter") {
    getInput();
  }
});
