const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');



const app = express();
const PORT = 3001;

app.use(cors());

app.use(express.json());



app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Validate form data (add more validation if needed)
  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ code: 400, message: 'Please fill in all fields.' });
  }

  try {
    // Replace with your email and SMTP server configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nuelay99@gmail.com',
        pass: 'pwxa pefl ixqy qidh',
      },
    });

    const mailOptions = {
      to: 'nuelay99@gmail.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };
 
    await transporter.sendMail(mailOptions);

    return res.json({ code: 200, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});