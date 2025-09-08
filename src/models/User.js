/**
 * User Model
 * Represents a user in the health tracking application.
 * @param {string} id - Unique identifier for the user.
 * @param {string} name - Name of the user.
 * @param {string} email - Email address of the user.
 * @param {string} passwordHash - Hashed password for authentication.
 * @param {string} role - Role of the user (e.g., "user", "admin").
 */
class User {
  constructor(id, name, email, passwordHash, role = "user") {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.profile = null;
    this.healthStats = [];
    this.notifications = [];
  }
}

module.exports = User;