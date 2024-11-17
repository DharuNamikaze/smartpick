const express = require('express');
const { SessionsClient } = require('dialogflow');
const app = express();
const PORT = 5000;

// Load your Dialogflow JSON key file
const projectId = 'your-dialogflow-project-id';  // Replace with your Dialogflow project ID
const sessionClient = new SessionsClient({ keyFilename: 'path/to/your-keyfile.json' });

app.use(express.json());

app.post('/api/dialogflow', async (req, res) => {
  const { query, sessionId } = req.body;
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: 'en',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({ response: result.fulfillmentText });
  } catch (error) {
    console.error(error);
    res.status(500).send('Dialogflow request error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
