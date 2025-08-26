import createError from "http-errors";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactService,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json({
      status: 200,
      data: result,
      count: result.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (result === null) {
      throw new createError.NotFound("User not found");
    }
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await removeContact(id);

    if (deletedUser === null) {
      throw new createError.NotFound("Not found");
    }
    res.status(200).json({
      status: 200,
      message: "User was deleted",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newUser = await addContact(name, email, phone);
    res.status(201).json({
      status: 201,
      message: "User was add successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userObj = await getContactById(id);

    if (userObj === null) {
      throw new createError.NotFound("User not found");
    }

    const updatedUser = await updateContactService(userObj, req.body);
    res.status(200).json({
      status: 200,
      message: "User was update successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
