import { templateId as sendgridTemplateId } from '../../sendgrid.json';

const SENDGRID_MAIL_API = 'https://api.sendgrid.com/v3/mail/send';

export default async (req, res) => {
  const { email, editLink } = req.body;
  console.log({ email, editLink });

  const emailBody = {
    personalizations: [
      {
        to: [
          {
            email
          }
        ],
        dynamic_template_data: {
          editLink
        },
        subject: 'Your Secret Edit Link!'
      }
    ],
    from: {
      email: 'noreply@static.fun',
      name: 'Static Fun'
    },
    template_id: sendgridTemplateId
  };

  try {
    console.log('sending email');
    let response = await fetch(SENDGRID_MAIL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_STATIC_FUN_KEY}`
      },
      body: JSON.stringify(emailBody)
    });
    if (response.status !== 202) {
      console.log(response);
      throw new Error(response.statusText);
    }
    res.status(200).end();
    return;
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ message: e.message });
    return;
  }
};
