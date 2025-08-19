import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { OpenAI } from 'openai';
import 'dotenv/config';


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store your key in a .env file
});

app.post('/api/symptom-checker', async (req, res) => {
  const { symptom } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
      messages: [
        {
          role: 'system',
          content: 'You are a helpful, kind virtual assistant for medical symptom care. Avoid diagnosis. Suggest reaching out to a professional if needed. Keep it concise and friendly. Suggest a list of medical supplies that might help with the symptom. Visualize the care plan in a simple, easy-to-follow format. Use bullet points for clarity. render bullets in a column. suggested medical supplies should be at the bottom',
        },
        {
          role: 'user',
          content: `A patient has reported this symptom: "${symptom}".`,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const carePlan = completion.choices[0].message.content;
    res.json({ carePlan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});