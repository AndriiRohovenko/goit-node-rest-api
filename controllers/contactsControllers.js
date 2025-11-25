import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
} from "../services/contactsServices.js";

const not_found_msg = "Not found";

export const getAllContacts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const favorite = req.query.favorite;

  const contacts = await listContacts(req.user_id, page, limit, favorite);
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id, req.user_id);
  if (!contact || contact === null) {
    return res.status(404).json({
      message: not_found_msg,
    });
  }
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id, req.user_id);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({
      message: not_found_msg,
    });
  }
};

export const createContact = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }
  const newContact = await addContact(req.body, req.user_id);
  res.status(201).json(newContact);
};

export const changeContact = async (req, res) => {
  const { id } = req.params;
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Body must have at least one field",
    });
  }
  const updatedContact = await updateContact(id, req.body, req.user_id);
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({
      message: not_found_msg,
    });
  }
};

export const updateContactIsFavorite = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Missing contact ID",
    });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Body must have at least one field",
    });
  }
  const updatedContact = await updateContactStatus(
    id,
    req.body.favorite,
    req.user_id
  );
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({
      message: not_found_msg,
    });
  }
};
