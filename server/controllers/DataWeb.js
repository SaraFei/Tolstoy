import axios from 'axios';
import * as cheerio from 'cheerio'; 
import validator from 'validator';
import sanitizeHtml from 'sanitize-html';

const fetchMetadata = async (req, res) => {
    const { urls } = req.body; // Expecting an array of URLs

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return res.status(400).send("A list of URLs is required");
    }

    try {
        const results = [];

        for (const url of urls) {
            // Validate the URL format
            if (!validator.isURL(url)) {
                results.push({ url, error: "Invalid URL" });
                continue;
            }

            try {
                // Fetch the HTML data from the URL
                const { data } = await axios.get(url);
                const $ = cheerio.load(data);

                // Extract and sanitize the title, description, and image
                const title = sanitizeHtml($('title').text()); 
                const description = sanitizeHtml($('meta[name="description"]').attr('content')); 
                const image = $('meta[property="og:image"]').attr('content'); 

                results.push({ url, title, description, image });
            } catch (err) {
                results.push({ url, error: "Error fetching metadata" });
            }
        }

        res.json(results); // Send the sanitized metadata results
    } catch (err) {
        res.status(500).json({
            type: "error fetching metadata",
            message: "An error occurred while processing the URLs",
            err
        });
    }
};

export { fetchMetadata };
