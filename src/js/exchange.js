export default class Exchange {
  static async genApi() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
      const json = await response.json();
      if (!response.result === 'success') {
        const errorMessage = `${response.result} ${response['error-type']}`;
        throw new Error(errorMessage);
      }
      return json;
    } catch (error) {
      return error;
    }
  }
  static async newAmount(currency1, currency2, amount) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}/${amount}`);
      const json2 = await response.json();
      if (!response.ok) {
        let errorMessage = `${response.status}. Reason:${response.statusText} ${json2['error-type']}.`;
        if (jsonifiedResponse['extra-info']) {
          errorMessage = errorMessage.concat(` ${jsonifiedResponse['extra-info']}`);
        }
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch (error) {
      return error;
    }
  }
}