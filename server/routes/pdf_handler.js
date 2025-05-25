// routes/pdf_handler.js
const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL ERROR: GEMINI_API_KEY environment variable is not set.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function analyzeResume(resumeText) {
    try {
        const prompt = `You are an expert resume analyst. Analyze the following resume and provide a detailed, constructive critique.
        Focus on:
        - Overall structure and readability
        - Experience descriptions and achievements
        - Skills and education presentation
        - Potential improvements and gaps
        - Keyword optimization suggestions

        Format your response as a JSON object with these keys:
        {
            "overall_summary": "Brief assessment",
            "strengths": ["List of key strengths"],
            "areas_for_improvement": ["List of areas to improve"],
            "specific_suggestions": ["Actionable improvement suggestions"],
            "keyword_suggestions": ["Relevant keywords to add"]
        }

        Resume to analyze:
        ${resumeText}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("Gemini Raw Response Text:", text);

        const jsonMatch = text.match(/```json\n([\s\S]*?)```/);
        let jsonString = text;
        if (jsonMatch && jsonMatch[1]) {
            jsonString = jsonMatch[1].trim();
        } else {
            console.warn("No JSON markdown block found in Gemini's response. Attempting direct parse.");
            jsonString = text.trim();
        }
        console.log(JSON.parse(jsonString));

        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error analyzing resume with Gemini:", error);
        if (error instanceof SyntaxError) {
            throw new Error(`Failed to parse Gemini's response as JSON. Raw output: ${text}`);
        }
        throw error;
    }
}

router.post("/upload", upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const pdfPath = req.file.path;
        const pdfData = await pdf(fs.readFileSync(pdfPath));
        const text = pdfData.text;

        fs.unlinkSync(pdfPath);

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ error: 'Extracted PDF text is empty or invalid.' });
        }

        console.log("Extracted Resume Text (first 200 chars):", text.substring(0, 200) + '...');

        const analysis = await analyzeResume(text);

        res.json({
            extracted_text_preview: text.substring(0, 200) + '...',
            analysis: analysis
        });
        console.log("Analysis sent to frontend:", analysis);
        console.log("Keyword Suggestions:", analysis['keyword_suggestions']);

    } catch (error) {
        console.error("Error processing resume in /upload route:", error);
        res.status(500).json({
            error: "Failed to process resume on the server.",
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

module.exports = router;