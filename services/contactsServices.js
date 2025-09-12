import Contact from "../db/Contact.js";

export async function listContacts(owner) {
  return Contact.findAll({
    where: owner,
  });
}

export async function getContactById(query) {
  return Contact.findOne({
    where: query,
  });
}

export async function removeContact(query) {
  const contact = await getContactById(query);
  if (!contact) {
    return null;
  }
  await contact.destroy();
  return contact;
}

export async function addContact(payload, owner) {
  return Contact.create({ ...payload, owner });
}

export async function updateContactService(query, payload) {
  const contact = await getContactById(query);
  if (!contact) {
    return null;
  }
  await contact.update(payload);
  return contact;
}
