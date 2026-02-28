/**
 * Class representing an AI Recommendation Service.
 * @param {string} apiKey - The API key for authentication.
 * @param {string} baseUrl - The base URL of the AI service.
 */
class AiRecommendationService {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
}
module.exports = AiRecommendationService;