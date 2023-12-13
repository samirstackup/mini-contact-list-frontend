import axios from "axios";

export class contactServices {
  static serverURL = `http://localhost:4000`;

  static getAllContacts() {
    let dataURL = `${this.serverURL}/contacts`;
    return axios.get(dataURL);
  }
  static getContact(id) {
    let dataURL = `${this.serverURL}/contacts/${id}`;
    return axios.get(dataURL);
  }

  static createContact(name, email, number) {
    let dataURL = `${this.serverURL}/contacts`;
    const contact = { name, email, number }; // Create an object with the provided arguments

    return axios.post(dataURL, contact);
  }

  static updateContact(id, contactData) {
    let dataURL = `${this.serverURL}/contacts/${id}`;

    return axios.put(dataURL, contactData);
  }
  static deleteContact(id) {
    let dataURL = `${this.serverURL}/contacts/${id}`;
    return axios.delete(dataURL);
  }
}
