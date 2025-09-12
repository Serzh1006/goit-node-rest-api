import createError from "http-errors";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactService,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  try {
    const { id: owner } = req.user;
    const result = await listContacts({ owner });
    res.status(200).json({
      status: 200,
      data: result,
      count: result.length,
    });
  } catch (error) {
    throw error;
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: owner } = req.user;
    const result = await getContactById({ id, owner });
    if (result === null) {
      throw new createError.NotFound("Contact not found");
    }
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: owner } = req.user;
    const deletedUser = await removeContact({ id, owner });

    if (deletedUser === null) {
      throw new createError.NotFound("Contact not found");
    }
    res.status(200).json({
      status: 200,
      message: "User was deleted",
      data: deletedUser,
    });
  } catch (error) {
    throw error;
  }
};

export const createContact = async (req, res) => {
  try {
    const { id: owner } = req.user;
    const newUser = await addContact(req.body, owner);
    res.status(201).json({
      status: 201,
      message: "Contact was add successfully",
      data: newUser,
    });
  } catch (error) {
    throw error;
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id: owner } = req.user;
    const { id } = req.params;
    const updatedUser = await updateContactService({ id, owner }, req.body);
    if (updatedUser === null) {
      throw new createError.NotFound("Contact not found");
    }
    res.status(200).json({
      status: 200,
      message: "Contact was update successfully",
      data: updatedUser,
    });
  } catch (error) {
    throw error;
  }
};

export const updateStatusContact = async (req, res) => {
  try {
    const { id: owner } = req.user;
    const { id } = req.params;
    const updatedStatus = await updateContactService({ id, owner }, req.body);
    if (updatedStatus === null) {
      throw new createError.NotFound("Contact not found");
    }
    res.status(200).json({
      status: 200,
      message: "Status was update successfully",
      data: updatedStatus,
    });
  } catch (error) {
    throw error;
  }
};
