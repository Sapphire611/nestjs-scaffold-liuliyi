import axios from 'axios';

export class Request {
  async get(url: string, headers = {}) {
    const response = await axios.get(url, this.authHeader(headers));
    return response.data;
  }

  async post(url: string, requestBody = {}, headers = {}) {
    const response = await axios.post(url, requestBody, this.authHeader(headers));

    const result = response.data;
    return result;
  }

  async patch(url: string, requestBody = {}) {
    const response = await axios.patch(url, requestBody, this.authHeader());
    return response.data;
  }

  async delete(url: string) {
    const response = await axios.delete(url, this.authHeader());
    return response.data;
  }

  authHeader(customHeaders = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
    };
  }
}
