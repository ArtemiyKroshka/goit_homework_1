import fs from "fs/promises";
import { nanoid } from "nanoid";
import * as url from "url";

const __dirname = url.fileURLToPath(`${new URL(".", import.meta.url)}db`);

const contactsPath = `${__dirname}/contacts.json`;

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

// получить данные
async function listContacts() {
  const result = await fs.readFile(contactsPath);
  console.log(result);
  return JSON.parse(result);
}

// получить один контакт по id
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

// удалить контакт
async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return result;
}

// добавить контакт
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  console.log(contacts);
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
