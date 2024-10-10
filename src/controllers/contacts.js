import createHttpError from 'http-errors';
import { parseContactsFilterParams } from '../utils/parseContactsFilterParams.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import * as contactServices from '../services/contacts.js';
import { contactList } from '../constants/contacts.js';

export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const { sortBy = 'name', sortOrder = 'asc' } = parseSortParams(req.query);

    const filter = parseContactsFilterParams(req.query);

    const { contacts, totalItems } = await contactServices.getAllContacts({
      filter,
      sortBy,
      sortOrder,
      skip: (page - 1) * perPage,
      perPage,
      userId: req.user._id,
    });

    const pagination = calculatePaginationData({
      totalItems,
      page: Number(page),
      perPage: Number(perPage),
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        contacts,
        ...pagination,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactServices.getContactById(
      contactId,
      req.user._id,
    );

    if (!contact) {
      throw createHttpError(404, `Contact with id ${contactId} not found`);
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = await contactServices.createContact({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contactServices.updateContact(
      contactId,
      req.body,
      req.user._id,
    );

    if (!updatedContact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactServices.deleteContact(
      contactId,
      req.user._id,
    );

    if (!deletedContact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
