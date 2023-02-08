import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apikey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeStar',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,    // Passing the prompt from the frontend
            temperature: 0,         // Higher temperature means model will take more risks, lower means it answers with what it knows
            max_tokens: 3000,       // Length of response generated
            top_p: 1,
            frequency_penalty: 0.5, // Probability of not repeating similar sentences often
            presence_penalty: 0,
    });

        // Send response back to frontend
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        res.status(500).send({ error })
    }
})

// Make sure server always listen for requests

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));
