import Contact from "../db/models/Contacts.js";

export async function listContacts(user_id, page, limit, favorite) {
  try {
    const contacts = await Contact.findAll({
      where: {
        owner: user_id,
        ...(favorite !== undefined && { favorite: favorite }),
      },
      offset: (page - 1) * limit,
      limit: limit,
    });
    return contacts;
  } catch (error) {
    console.error("Error reading contacts:", error);
    throw error;
  }
}

export async function getContactById(contactId, user_id) {
  try {
    const contact = await Contact.findOne({
      where: { id: contactId, owner: user_id },
    });
    return contact || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    throw error;
  }
}

export async function removeContact(contactId, user_id) {
  try {
    const contact = await getContactById(contactId, user_id);
    if (!contact) {
      return null;
    }
    await contact.destroy();
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

export async function updateContact(contactId, updatedInfo, user_id) {
  try {
    const contact = await getContactById(contactId, user_id);
    if (!contact) {
      return null;
    }
    await contact.update(updatedInfo);
    const updatedContact = await getContactById(contactId, user_id);

    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
}

export async function updateContactStatus(contactId, favorite, user_id) {
  try {
    const contact = await getContactById(contactId, user_id);
    if (!contact) {
      return null;
    }
    await contact.update({ favorite });
    const updatedContact = await getContactById(contactId, user_id);

    return updatedContact;
  } catch (error) {
    console.error("Error updating contact status:", error);
    throw error;
  }
}
