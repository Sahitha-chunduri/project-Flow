const asyncHandler = require("express-async-handler");
const contact = require("../models/models").Contact;

// POST /api/contacts - add a new team member
const addContact = asyncHandler(async (req, res) => {
    const { name, email, phone, company, position, notes, tags } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please provide all required fields: name, email, and phone");
    }

    const existingContact = await contact.findOne({
        user_id: req.user.id,
        email: email.toLowerCase()
    });

    if (existingContact) {
        res.status(400);
        throw new Error("Contact with this email already exists");
    }

    const newContact = await contact.create({
        user_id: req.user.id,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        company: company ? company.trim() : "",
        position: position ? position.trim() : "",
        notes: notes ? notes.trim() : "",
        tags: tags || [],
        isActive: true
    });

    if (newContact) {
        const populatedContact = await contact.findById(newContact._id).populate({
            path: 'user_id',
            select: 'username email firstName lastName'
        });

        res.status(201).json({
            success: true,
            message: "Team member added successfully",
            data: {
                id: populatedContact._id,
                name: populatedContact.name,
                email: populatedContact.email,
                phone: populatedContact.phone,
                company: populatedContact.company,
                position: populatedContact.position,
                notes: populatedContact.notes,
                tags: populatedContact.tags,
                isActive: populatedContact.isActive,
                createdAt: populatedContact.createdAt,
                updatedAt: populatedContact.updatedAt
            }
        });
    } else {
        res.status(400);
        throw new Error("Failed to create contact");
    }
});

//  GET /api/contacts - all team members for a user
const getContacts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search = "", tag = "" } = req.query;
    let query = { user_id: req.user.id, isActive: true };

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
            { position: { $regex: search, $options: 'i' } }
        ];
    }

    if (tag) {
        query.tags = { $in: [tag] };
    }

    const contacts = await contact.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate({
            path: 'user_id',
            select: 'username email firstName lastName'
        });

    const totalContacts = await contact.countDocuments(query);

    res.status(200).json({
        success: true,
        data: contacts.map(contactItem => ({
            id: contactItem._id,
            name: contactItem.name,
            email: contactItem.email,
            phone: contactItem.phone,
            company: contactItem.company,
            position: contactItem.position,
            notes: contactItem.notes,
            tags: contactItem.tags,
            isActive: contactItem.isActive,
            createdAt: contactItem.createdAt,
            updatedAt: contactItem.updatedAt
        })),
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalContacts / limit),
            totalContacts,
            hasNext: page < Math.ceil(totalContacts / limit),
            hasPrev: page > 1
        }
    });
});

//  GET /api/contacts/:id - get a single contact by id
const getContact = asyncHandler(async (req, res) => {
    const contactItem = await contact.findOne({
        _id: req.params.id,
        user_id: req.user.id
    }).populate({
        path: 'user_id',
        select: 'username email firstName lastName'
    });

    if (!contactItem) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json({
        success: true,
        data: {
            id: contactItem._id,
            name: contactItem.name,
            email: contactItem.email,
            phone: contactItem.phone,
            company: contactItem.company,
            position: contactItem.position,
            notes: contactItem.notes,
            tags: contactItem.tags,
            isActive: contactItem.isActive,
            createdAt: contactItem.createdAt,
            updatedAt: contactItem.updatedAt
        }
    });
});

// PUT /api/contacts/:id - update a contact
const updateContact = asyncHandler(async (req, res) => {
    const { name, email, phone, company, position, notes, tags } = req.body;
    
    const contactItem = await contact.findOne({
        _id: req.params.id,
        user_id: req.user.id
    });

    if (!contactItem) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (email && email.toLowerCase() !== contactItem.email) {
        const existingContact = await contact.findOne({
            user_id: req.user.id,
            email: email.toLowerCase(),
            _id: { $ne: req.params.id }
        });

        if (existingContact) {
            res.status(400);
            throw new Error("Contact with this email already exists");
        }
    }

    const updatedContact = await contact.findByIdAndUpdate(
        req.params.id,
        {
            name: name ? name.trim() : contactItem.name,
            email: email ? email.toLowerCase().trim() : contactItem.email,
            phone: phone ? phone.trim() : contactItem.phone,
            company: company !== undefined ? company.trim() : contactItem.company,
            position: position !== undefined ? position.trim() : contactItem.position,
            notes: notes !== undefined ? notes.trim() : contactItem.notes,
            tags: tags !== undefined ? tags : contactItem.tags
        },
        { new: true }
    ).populate({
        path: 'user_id',
        select: 'username email firstName lastName'
    });

    res.status(200).json({
        success: true,
        message: "Contact updated successfully",
        data: {
            id: updatedContact._id,
            name: updatedContact.name,
            email: updatedContact.email,
            phone: updatedContact.phone,
            company: updatedContact.company,
            position: updatedContact.position,
            notes: updatedContact.notes,
            tags: updatedContact.tags,
            isActive: updatedContact.isActive,
            createdAt: updatedContact.createdAt,
            updatedAt: updatedContact.updatedAt
        }
    });
});

// DELETE /api/contacts/:id - delete a contact (soft delete)
const deleteContact = asyncHandler(async (req, res) => {
    const contactItem = await contact.findOne({
        _id: req.params.id,
        user_id: req.user.id
    });

    if (!contactItem) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await contact.findByIdAndUpdate(req.params.id, { isActive: false });

    res.status(200).json({
        success: true,
        message: "Contact deleted successfully"
    });
});

module.exports = {
    addContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact
};