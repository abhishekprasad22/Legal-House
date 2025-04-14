require("dotenv").config();
const pdf = require('pdf-parse');
const axios = require('axios');
const {pool}=require('../db.js')
// const fetch = require('node-fetch');

const summarize = async (req, res) => {
    const { pdfUrl,caseId } = req.body;

    try {
        // Step 1: Fetch PDF content
        const pdfResponse = await axios.get(`http://localhost:8000` + pdfUrl, { responseType: 'arraybuffer' });
        const pdfBuffer = Buffer.from(pdfResponse.data);

        // Step 2: Extract text from PDF
        const pdfData = await pdf(pdfBuffer);
        const extractedText = pdfData.text;

        if (!extractedText) {
            return res.status(400).json({ error: "Failed to extract text from PDF" });
        }

        // Step 3: Send extracted text to Ollama for summarization
        const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: process.env.MODEL_NAME, prompt: `You are an advanced AI model specialized in summarizing long texts. Your task is to generate a structured, point-wise summary of the given text, capturing key details concisely. Follow these guidelines:

1. Extract the most important points from the text in a clear and concise manner.
2. Present the summary in bullet points, avoiding unnecessary details.
3. Maintain clarity and coherence while ensuring completeness.
4. After listing the key points, provide a short conclusion summarizing the overall essence of the text.
5. Keep the response brief, to the point, and easy to read.

Here is the text to summarize:\n\n${extractedText}`
            }),
        });

        if (!ollamaResponse.body) {
            return res.status(500).json({ error: "No response from model" });
        }

        let fullResponse = "";
        const reader = ollamaResponse.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter(line => line.trim() !== "");

            for (const line of lines) {
                try {
                    const jsonChunk = JSON.parse(line);
                    if (jsonChunk.response) {
                        fullResponse += jsonChunk.response + " ";
                    }
                } catch (err) {
                    console.error("Error parsing chunk:", err, "Chunk:", line);
                }
            }
        }

        const summarizedText = fullResponse.trim();
        const resolveTimestamp = new Date();
        console.log(caseId);
        await pool.query(
            `UPDATE cases SET case_resolve_file_link = $1, resolved_timestamp = $2, resolve_status = TRUE WHERE id = $3`,
            [summarizedText, resolveTimestamp, caseId]
        );


        res.json({ success: true, output: fullResponse.trim() });

    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { summarize };
