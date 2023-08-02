import { elements } from "./helpers.js";

export class UI {
  //todo içerisine HTML göndereceğimiz elemanları çağırma
  constructor() {
    this.profile = elements.profile;
    this.repoArea = elements.repos;
    this.button = elements.btnClear;
    this.input = elements.searchInput;
    this.btndark = elements.btn;

    //olay izleyicisi
    this.button.addEventListener("click", this.clearProfile.bind(this));
    this.btndark.addEventListener("click", this.darkMode.bind(this));
  }

  //* profil arayüzünü ekrana basma
  renderProfile(data) {
    const created_at = new Date(data.created_at).toLocaleDateString();
    this.profile.innerHTML = `
    <div class="row border p-4 m-y4 rounded-3">
        <div class="col-md-3 col-sm gap-3">
        <img src=${data.avatar_url} class="img-fluid rounded shadow" />
        <a href=${data.html_url} class="btn btn-primary mt-4 w-100" target="_blank" id="profileShow">Profili Göster</a>
        </div>
        <div class="col-md-9 col-sm gap-3" id="profileButton">
        <span class="badge bg-primary fs-6">Açık Repolar:${data.public_repos}</span>
        <span class="badge bg-secondary fs-6">Açık Gistler:${data.public_gists}</span>
        <span class="badge bg-success fs-6">Takipçiler:${data.followers}</span>
        <span class="badge bg-info fs-6 ">Takip Edilenler:${data.following}</span>

        <ul class="list-group mt-3 ">
            <li class="list-group-item">
            Hakkında: ${data.bio}
            </li>
            <li class="list-group-item">Şirket: ${data.company}</li>
            <li class="list-group-item">Website: ${data.blog}</li>
            <li class="list-group-item">Konum:${data.location}</li>
            <li class="list-group-item">Hesap Oluşturma:${created_at}</li>
        </ul>
        </div>
  </div>
    
    `;
  }

  //* projeleri ekrana basma
  renderProjects(data) {
    // repo alanını temizle
    this.repoArea.innerHTML = "";
    // projeler dizisindeki her bir eleman için kart oluştur ve ekrana bas
    data.forEach((repo) => {
      console.log(repo);
      this.repoArea.innerHTML += `
        <div class="border row p-3 mb-4 align-items-center">
            <div class="col-6 col-sm">
            <a target="_blank" href=${repo.html_url}>${repo.name}</a>
            </div>
            <div class="col-6 col-sm">
            <span class="badge bg-primary">Yıldız:${repo.stargazers_count}</span>
            <span class="badge bg-secondary">Fork:${repo.forks_count}</span>
            <span class="badge bg-success">İzleyenler:${repo.watchers}</span>
            </div>
        </div>

        `;
    });
  }

  //* uyarı mesajı oluşturma
  showAlert(message, classname) {
    const div = document.createElement("div");
    div.className = classname;
    div.textContent = message;
    elements.warning.appendChild(div);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // uyarıyı ekrandan silme
  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  //ekranı temizleme
  clearProfile() {
    this.profile.innerHTML = "";
    this.repoArea.innerHTML = "";
    this.input.value = "";
  }

  // darkMode
  darkMode() {
    if (elements.body.classList.contains("bg-dark")) {
      elements.body.className = "bg-light text-bg-light";
      elements.btn.className = "btn btn-dark";
      elements.btn.textContent = "Dark Mode";
    } else if (elements.body.classList.contains("bg-light")) {
      elements.body.className = "bg-dark text-bg-dark";
      elements.btn.className = "btn btn-light";
      elements.btn.textContent = "Light Mode";
    }
    // elements.body.classList.toggle("bg-dark");
    elements.title.classList.toggle("text-dark");
    elements.title.classList.toggle("text-light");
    // elements.body.classList.toggle("text-bg-dark");
  }
}
