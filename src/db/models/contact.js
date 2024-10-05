// db/models/contact.js

import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String, // Email is optional, but ensure it's properly defined
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      enum: ['personal', 'home'],
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const ContactCollection = model('Contact', contactSchema); // Ensure the model name is correct

export default ContactCollection;
