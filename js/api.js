export class Github {
  //* istek atmak için gerekli olan bilgiler
  constructor() {
    this.client_id = "8387ed2d930f4ef3f3f8";
    this.client_secret = "0052db3e63660c39ae30783c458c59d2d8f17268";
    this.per_page = 10;
    this.sort = "asc";
  }
  //* api'dan kullanıcı bilgilerini alma
  async fetchUserData(username) {
    // parametre olarak gelen kullanıcı adına göre istek attık
    const profileRes = await fetch(
      `https://api.github.com/users/${username}?client_id_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    // kullanıcı projelerini alma

    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?client_id_id=${this.client_id}&client_secret=${this.client_secret}&sort=${this.sort}&per_page=${this.per_page}`
    );

    // api'dan aldığımız cevabı json yapısına çevirdik
    const data = await profileRes.json();
    const repos = await repoRes.json();
    // fonksiyonun çağrıldığı yere bilgileri gönderme
    return { data, repos };
  }
}
