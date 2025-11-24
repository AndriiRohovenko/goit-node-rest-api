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
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, getOneContact);

contactsRouter.delete("/:id", authenticate, deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  createContact
);
contactsRouter.put(
  "/:id",
  authenticate,
  validateBody(updateContactSchema),
  changeContact
);

contactsRouter.patch("/:id/favorite", authenticate, updateStatusContact);

export default contactsRouter;
