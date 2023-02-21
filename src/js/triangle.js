export default class Exchange {
  static async genApi() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
      const jsonApi = await response.json();
      if (!response.result === 'success') {
        const errorMessage = `${response.result} ${response['error-type']}`;
        throw new Error(errorMessage);
      }
      return jsonApi;
    } catch (error) {
      return error;
    }
  }
}