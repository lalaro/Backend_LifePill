class User {
  constructor(id, name, email, passwordHash, role = "user") {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.profile = null; // UserProfile
    this.healthStats = []; // Array<HealthStats>
    this.notifications = []; // Array<Notification>
  }
}