import fs from "fs/promises";
import { randomUUID } from "crypto";

const contactsPath = "db/contacts.json";

export async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const arr = await listContacts();
  const res = arr.find((el) => el.id === contactId);
  if (!res) {
    return null;
  } else {
    return res;
  }
}

export async function removeContact(contactId) {
  const findContact = await getContactById(contactId);
  if (findContact === null) {
    return findContact;
  } else {
    const newData = await listContacts();
    const filteredData = newData.filter((obj) => obj.id !== findContact.id);
    const json = JSON.stringify(filteredData, null, 2);
    fs.writeFile(contactsPath, json, "utf-8");
    return findContact;
  }
}

export async function addContact(name, email, phone) {
  const getData = await listContacts();
  const newObj = {
    id: randomUUID(),
    name: name,
    email: email,
    phone: phone,
  };
  getData.push(newObj);
  const json = JSON.stringify(getData, null, 2);
  fs.writeFile(contactsPath, json, "utf-8");
  return newObj;
}
