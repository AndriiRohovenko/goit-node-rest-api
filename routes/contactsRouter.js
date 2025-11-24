import { Router } from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  changeContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

import validateBody from "../helpers/validateBody.js";

const contactsRouter = Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), changeContact);

contactsRouter.patch("/:id/favorite", updateStatusContact);

export default contactsRouter;
