import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();
const middlewareJson = express.json();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post(
  "/",
  middlewareJson,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.patch(
  "/:id/favorite",
  middlewareJson,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

contactsRouter.put(
  "/:id",
  middlewareJson,
  validateBody(updateContactSchema),
  updateContact
);

export default contactsRouter;
