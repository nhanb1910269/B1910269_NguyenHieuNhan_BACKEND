const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = (req, res) => {
    res.send({ messeage: "create handler" });
};

exports.findAll = (req, res) => {
    res.send({ messeage: "findAll handler" });
};

exports.findOne = (req, res) => {
    res.send({ messeage: "fineOne handler" });
};

exports.update = (req, res) => {
    res.send({ messeage: "update handler" });
};

exports.delete = (req, res) => {
    res.send({ messeage: "delete handler" });
};

exports.deleteAll = (req, res) => {
    res.send({ messeage: "deleteAll handler" });
};

exports.findAllFavorite = (req, res) => {
    res.send({ messeage: "findAllFavorite handler" });
};

// Tạo và lưu kết nối mới
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty!"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while creating the new contact")
        );
    }
};


exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else documents = await contactService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts!")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Contact not found!"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving contact with id = ${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(erq.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty!"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found!"));
        }
        return res.send({ messeage: "Contact was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating contact with id = ${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found!"));
        }
        return res.send({ messeage: "Contact was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete contact with id = ${req.params.id}`));
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findAllFavorite();
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "An error occured while retrieving favarite contacts"));
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCounts = await contactService.deleteAll();
        return res.send({messeage: `${deleteCounts} contacts were deleted successfully`});
    } catch (error) {
        return next(new ApiError(500, "An error occured while remove all contacts"));
    }
};