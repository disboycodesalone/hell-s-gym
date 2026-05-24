const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://disboycodesalone.github.io' }));

const mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  }
});

app.post('/trial', async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    await mail.sendMail({
      from: process.env.GMAIL_USER,
      to:   process.env.GMAIL_USER,
      subject: `🔥 New Free Trial Booking — ${name}`,
      html: `<h2 style="color:#C0152A;">New Free Trial Booking</h2>
             <p><b>Name:</b> ${name}</p>
             <p><b>Phone:</b> ${phone}</p>
             <p><b>Email:</b> ${email || 'Not provided'}</p>`
    });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Mail failed' });
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    await mail.sendMail({
      from:    process.env.GMAIL_USER,
      to:      process.env.GMAIL_USER,
      replyTo: email,
      subject: `📩 ${subject || 'General Enquiry'} — ${name}`,
      html: `<h2 style="color:#C0152A;">New Enquiry</h2>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Subject:</b> ${subject || 'General Enquiry'}</p>
             <p><b>Message:</b><br>${message || 'No message'}</p>`
    });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Mail failed' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Hell's Gym server running"));
// Keep alive — pings itself every 14 minutes
const https = require('https');
setInterval(() => {
  https.get('https://hellsgym-backend.onrender.com');
}, 14 * 60 * 1000);
