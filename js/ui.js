import { elements } from "./helpers.js";

export class UI {
  //todo içerisine HTML göndereceğimiz elemanları çağırma
  constructor() {
    this.profile = elements.profile;
    this.repoArea = elements.repos;
  }

  //* profil arayüzünü ekrana basma
  renderProfile(data) {
    console.log(data);
    this.profile.innerHTML = `
    <div class="row border p-4 m-y4 rounded-3">
        <div class="col-md-3">
        <img src=${data.avatar_url} class="img-fluid rounded shadow" />
        <a href=${data.html_url} class="btn btn-primary mt-4 w-100" target="_blank">Profili Göster</a>
        </div>
        <div class="col-md-9">
        <span class="badge bg-primary fs-6">Açık Repolar:${data.public_repos}</span>
        <span class="badge bg-secondary fs-6">Açık Gistler:${data.public_gists}</span>
        <span class="badge bg-success fs-6">Takipçiler:${data.followers}</span>
        <span class="badge bg-info fs-6">Takip Edilenler:${data.following}</span>

        <ul class="list-group mt-3 ">
            <li class="list-group-item">
            Hakkında: ${data.bio}
            </li>
            <li class="list-group-item">Şirket: ${data.company}</li>
            <li class="list-group-item">Website: ${data.blog}</li>
            <li class="list-group-item">Konum:${data.location}</li>
            <li class="list-group-item">Hesap Oluşturma:${data.created_at}</li>
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
            <div class="col-6">
            <a target="_blank" href=${repo.html_url}>${repo.name}</a>
            </div>
            <div class="col-6">
            <span class="badge bg-primary">Yıldız:${repo.stargazers_count}</span>
            <span class="badge bg-secondary">Fork:${repo.forks_count}</span>
            <span class="badge bg-success">İzleyenler:${repo.watchers}</span>
            </div>
        </div>

        `;
    });
  }
}
