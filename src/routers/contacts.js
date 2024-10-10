// import express from 'express';
// import {
//   getContacts,
//   getContactById,
//   createContact,
//   updateContact,
//   deleteContact,
// } from '../controllers/contacts.js';
// import ctrlWrapper from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';
// import { contactSchema } from '../validation/contactValidation.js';
// import isValidId from '../middlewares/isValidId.js';
// import authenticate from '../middlewares/authenticate.js'; // Default import for authenticate

// const router = express.Router();

// router.get('/', authenticate, ctrlWrapper(getContacts));
// router.get('/:contactId', isValidId, authenticate, ctrlWrapper(getContactById));
// router.post(
//   '/',
//   authenticate,
//   validateBody(contactSchema),
//   ctrlWrapper(createContact),
// );
// router.patch(
//   '/:contactId',
//   isValidId,
//   authenticate,
//   validateBody(contactSchema),
//   ctrlWrapper(updateContact),
// );
// router.delete(
//   '/:contactId',
//   isValidId,
//   authenticate,
//   ctrlWrapper(deleteContact),
// );

// export default router;

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
import {
  contactSchema,
  patchContactSchema,
} from '../validation/contactValidation.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js'; // Default import for authenticate

const router = express.Router();

// Get all contacts for the authenticated user
router.get('/', authenticate, ctrlWrapper(getContacts));

// Get a specific contact by ID
router.get('/:contactId', isValidId, authenticate, ctrlWrapper(getContactById));

// Create a new contact (requires full validation)
router.post(
  '/',
  authenticate,
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);

// Update a contact (partial updates allowed)
router.patch(
  '/:contactId',
  isValidId,
  authenticate,
  validateBody(patchContactSchema), // Use patchContactSchema for partial updates
  ctrlWrapper(updateContact),
);

// Delete a contact
router.delete(
  '/:contactId',
  isValidId,
  authenticate,
  ctrlWrapper(deleteContact),
);

export default router;
