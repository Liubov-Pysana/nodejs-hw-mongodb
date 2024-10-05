import createError from 'http-errors';
import createHttpError from 'http-errors';
import {
  getAllContacts as getAllContactsService,
  getContactById as getContactByIdService,
  createContact as createContactService,
  updateContact as updateContactService,
  deleteContact as deleteContactService,
} from '../services/contacts.js';

export const getContacts = async (req, res) => {
  const contacts = await getAllContactsService();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.status(200).json(contact);
};

export const createContact = async (req, res) => {
  const {
    name,
    phoneNumber,
    email,
    isFavourite = false,
    contactType,
  } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createError(
      400,
      'Missing required fields: name, phoneNumber, or contactType',
    );
  }

  const newContact = await createContactService({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const updatedContact = await updateContactService(contactId, {
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json(updatedContact);
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContactService(contactId);

  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};
