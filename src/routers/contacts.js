import express from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema } from '../validation/contactValidation.js';
import isValidId from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactById));
router.post(
  '/contacts',
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(contactSchema),
  ctrlWrapper(updateContact),
);
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
