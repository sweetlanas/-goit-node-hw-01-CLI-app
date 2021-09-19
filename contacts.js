const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === +contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((item) => item.id !== +contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return "Success remove";
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = { name, email, phone, id: shortid.generate() };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
