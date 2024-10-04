import ContactCollection from '../db/models/contact.js'; // Correct import for default export

export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
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
