// 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
const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
dotenv.config();
const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())




const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-wcNrDYSJdwu2dRLoZgkx6rzx",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


 
 const port = 3080
 app.post('/',async(req,res)=>{
    const {message,currentModel} = req.body;
    console.log(message)
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 1000,
        temperature: 0,
      });
      console.log()
      res.json({
        message:response.data.choices[0].text,
      })
 })

 app.get('/models',async(req,res)=>{
    const response = await openai.listEngines();
    console.log(response);
    res.json({
        models:response.data.data,
    })
 })

 app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`)
 })