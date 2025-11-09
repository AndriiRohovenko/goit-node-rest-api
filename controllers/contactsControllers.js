import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  console.log(contact);
  if (!contact || contact === null) {
    return res.status(404).json({
      message: "Contact not found",
    });
  }
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({
      message: "Contact not found",
    });
  }
};

export const createContact = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

export const changeContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await updateContact(id, req.body);
  if (updatedContact) {
    res.json({
      contact: updatedContact,
    });
  } else {
    res.status(404).json({
      message: "Contact not found",
    });
  }
};
