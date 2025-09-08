/**
 * UserProfile model to store user preferences and dietary restrictions.
 * @param {string} userid - Unique identifier for the user.
 * @param {object} preferences - List of user preferences (e.g., favorite cuisines, disliked foods).
 * @param {string[]} dietaryRestrictions - List of dietary restrictions (e.g., vegetarian, vegan, gluten-free).
 * @param {string[]} allergies - List of food allergies (e.g., nuts, dairy, shellfish).
 * @param {string} fitnessLevel - User's fitness level (e.g., beginner, intermediate, advanced).
 * @param {number} targetWeight - User's target weight in kilograms.
 */
class UserProfile {
    constructor(userid, preferences, dietaryRestrictions, allergies, fitnessLevel, targetWeight) {
        this.userid = userid;
        this.preferences = preferences;
        this.dietaryRestrictions = dietaryRestrictions;
        this.allergies = allergies;
        this.fitnessLevel = fitnessLevel;
        this.targetWeight = targetWeight;
    }
}

module.exports = UserProfile;