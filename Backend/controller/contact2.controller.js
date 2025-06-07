const Contact = require("../model/Contact2");

exports.createContact = async (req, res) => {
  try {
    const pictureUrl = req.file?.path || "";

    const { name, designation, mobile, email } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newContact = new Contact({
      name,
      designation,
      mobile,
      email,
      picture: pictureUrl,
    });

    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create contact" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};
exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete contact" });
  }
};
exports.updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const { name, designation, mobile, email } = req.body;
    const pictureUrl = req.file?.path; // Optional new image

    const existingContact = await Contact.findById(contactId);
    if (!existingContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    existingContact.name = name || existingContact.name;
    existingContact.designation = designation || existingContact.designation;
    existingContact.mobile = mobile || existingContact.mobile;
    existingContact.email = email || existingContact.email;
    if (pictureUrl) {
      existingContact.picture = pictureUrl;
    }

    await existingContact.save();
    res.json({ message: "Contact updated", contact: existingContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update contact" });
  }
};
