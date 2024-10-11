import ContactCollection from '../db/models/contact.js';

export const getAllContacts = async ({
  filter,
  sortBy,
  sortOrder,
  skip,
  perPage,
  userId,
}) => {
  const totalItems = await ContactCollection.countDocuments({
    ...filter,
    userId,
  });
  const contacts = await ContactCollection.find({ ...filter, userId })
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(Number(perPage));

  return { contacts, totalItems };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactCollection.findOne({
    _id: contactId,
    userId,
  });
  return contact;
};

export const createContact = async (contactData) => {
  const newContact = await ContactCollection.create(contactData);
  return newContact;
};

export const updateContact = async (contactId, updateData, userId) => {
  const updatedContact = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return updatedContact;
};

export const deleteContact = async (contactId, userId) => {
  const deletedContact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return deletedContact;
};
