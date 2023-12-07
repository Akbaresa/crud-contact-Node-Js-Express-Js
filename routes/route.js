const express = require("express")
const Contact = require("../model/contact")
const router = express.Router()
const mongoose = require("mongoose");

router.get("/", (req , res) => {
    res.render("index" , { tittle : "Home Page Content"})
})

// Display all contacts
router.get("/contact", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.render("contacts", { contacts });
    } catch (err) {
        res.status(500).json({ message: err.message, type: 'danger' });
    }
});

router.post("/tambah"  , async (req , res) => {
    try {
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });

        await newContact.save();
        
        req.session.message = {
            type: 'success',
            message: 'Contact added successfully'
        };
        res.redirect("/");
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
})

// Handle POST request to update a contact
router.post("/:id", async (req, res) => {

    try {
        const contactId = req.params.id;
        // Find the contact by ID
        const contact = await Contact.findById(contactId);
        // Check if the contact exists
        if (!contact) {
            return res.status(404).json({ message: "Contact not found", type: "danger" });

        }

        // Update the contact with the new data
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;

        // Save the updated contact
        await contact.save();

        // Respond with a success message
        res.json({ message: "Contact updated successfully", type: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", type: "danger" });
    }
});

// Handle POST request to update a contact
router.delete("/:id", async (req, res) => {

    try {
        const contactId = req.params.id;
        // Find the contact by ID
        const contact = await Contact.findById(contactId);
        // Check if the contact exists
        if (!contact) {
            return res.status(404).json({ message: "Contact not found", type: "danger" });

        }

        // Save the updated contact
        await contact.deleteOne();

        // Respond with a success message
        res.json({ message: "Contact deleted successfully", type: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", type: "danger" });
    }
});


module.exports = router