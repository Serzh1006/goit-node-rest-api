import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.status(200).json({
    status: 200,
    data: result,
    count: result.length,
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (result === null) {
    return res.status(404).json({
      status: 404,
      message: "Not Found",
    });
  }
  res.status(200).json({
    status: 200,
    data: result,
  });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await removeContact(id);

  if (deletedUser === null) {
    return res.status(404).json({
      message: "Not Found",
    });
  }
  res.status(200).json({
    status: 200,
    message: "User was deleted",
    data: deletedUser,
  });
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newUser = await addContact(name, email, phone);
  res.status(201).json({
    status: 201,
    message: "User was add successfully",
    data: newUser,
  });
};

export const updateContact = (req, res) => {};
