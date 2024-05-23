const apiURL = "http://localhost:3000/books";
class Request {
  static async request(method, endpoint, data = null) {
    const url = `${apiURL}${endpoint ? `/${endpoint}` : ""}`;
    const options = {
      method: method,
      headers: { "Content-type": "application/json" },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`${response.status} error occurred!`);
    }
    return method === "DELETE" ? true : await response.json();
  }
  static getData() {
    return this.request();
  }
  static postData(data) {
    return this.request("POST", "", data);
  }
  static updateData(id, data) {
    return this.request("PUT", id, data);
  }
  static deleteData(id) {
    return this.request("DELETE", id);
  }
}
