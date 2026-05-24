const express = require('express');
const cors    = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://disboycodesalone.github.io' }));

async function sendMail(subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Hell\'s Gym <onboarding@resend.dev>',
      to:   [process.env.TO_EMAIL],
      subject,
      html
    })
  });
  if (!res.ok) throw new Error(await res.text());
}

app.post('/trial', async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    await sendMail(
      `🔥 New Free Trial Booking — ${name}`,
      `<h2 style="color:#C0152A;">New Free Trial Booking</h2>
       <p><b>Name:</b> ${name}</p>
       <p><b>Phone:</b> ${phone}</p>
       <p><b>Email:</b> ${email || 'Not provided'}</p>`
    );
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Mail failed' });
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    await sendMail(
      `📩 ${subject || 'General Enquiry'} — ${name}`,
      `<h2 style="color:#C0152A;">New Enquiry</h2>
       <p><b>Name:</b> ${name}</p>
       <p><b>Email:</b> ${email}</p>
       <p><b>Subject:</b> ${subject || 'General Enquiry'}</p>
       <p><b>Message:</b><br>${message || 'No message'}</p>`
    );
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Mail failed' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Hell's Gym server running"));
