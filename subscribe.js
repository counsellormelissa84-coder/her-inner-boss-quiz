// netlify/functions/subscribe.js
//
// This function runs on Netlify's server, not in the browser — so your
// MailerLite API key stays hidden. Your React app calls this function
// instead of calling MailerLite directly.
//
// One API call does everything: creates/updates the subscriber, saves
// which archetype they got into a custom field, and adds them to the
// "Quiz Takers" group — which is what triggers your MailerLite
// automation to actually send the result email.

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const ML_API_KEY = process.env.MAILERLITE_API_KEY;
  const ML_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

  if (!ML_API_KEY || !ML_GROUP_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server is missing MAILERLITE_API_KEY or MAILERLITE_GROUP_ID." }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body." }) };
  }

  const { email, archetypeLabel } = body;

  if (!email || !archetypeLabel) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing email or archetypeLabel." }),
    };
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${ML_API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        fields: {
          archetype: archetypeLabel, // e.g. "Inner Critic"
        },
        groups: [ML_GROUP_ID],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "MailerLite request failed.", detail: errText }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unexpected server error.", detail: err.message }),
    };
  }
};


