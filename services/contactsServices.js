import Contact from "../db/models/Contacts.js";

export async function listContacts() {
  try {
    const contacts = await Contact.findAll();
    return contacts;
  } catch (error) {
    console.error("Error reading contacts:", error);
    throw error;
  }
}

export async function getContactById(contactId) {
  try {
    const contact = await Contact.findByPk(contactId);
    return contact || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    throw error;
  }
}

export async function removeContact(contactId) {
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.error("Error removing contact:", error);
    throw error;
  }
}

export async function addContact(contact, user_id) {
  try {
    const { name, email, phone } = contact;
    const newContact = {
      name,
      email,
      phone,
      owner: user_id,
    };
    const createdContact = await Contact.create(newContact);

    return createdContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
}

export async function updateContact(contactId, updatedInfo) {
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return null;
    }
    await contact.update(updatedInfo);
    const updatedContact = await getContactById(contactId);

    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
}
