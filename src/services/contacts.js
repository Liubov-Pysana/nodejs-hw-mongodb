// src/services/contacts.js

import ContactCollection from '../db/models/contact.js';

export const getAllContacts = async ({
  filter,
  sortBy,
  sortOrder,
  skip,
  perPage,
}) => {
  const totalItems = await ContactCollection.countDocuments(filter);
  const contacts = await ContactCollection.find(filter)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(Number(perPage));

  return { contacts, totalItems };
};

export const getContactById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};

export const createContact = async ({
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
}) => {
  const newContact = new ContactCollection({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });
  const savedContact = await newContact.save();
  return savedContact;
};

export const updateContact = async (contactId, updateData) => {
  const updatedContact = await ContactCollection.findByIdAndUpdate(
    contactId,
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await ContactCollection.findByIdAndDelete(contactId);
  return deletedContact;
};
