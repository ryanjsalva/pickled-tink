import { error } from "console";
import * as http from "http";
import OpenAI from "openai";

const openai = new OpenAI();
const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {

    // if the URL is /api and the method is GET
    // you may want to change this to a POST rather than a GET
    if (req.url === "/api" && req.method === "GET") {

        // call the OpenAI API
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "Replace me with the work plan prompt." }],
            model: "gpt-3.5-turbo"
        })

        // log the response
        console.log(completion.choices[0]);
        
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });

        // send the data back to the client
        res.end(JSON.stringify(completion.choices[0]));
    }

    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

// start the server
server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
