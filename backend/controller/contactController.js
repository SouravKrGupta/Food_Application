import contactModel from "../models/contactModel.js";

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = new contactModel({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();

    res.json({
      success: true,
      message: "Contact form submitted successfully"
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error submitting contact form"
    });
  }
};

// Get all contact messages (for admin)
const getContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find({});
    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching contacts"
    });
  }
};

export { submitContact, getContacts };