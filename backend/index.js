const express = require('express')
const cors = require('cors')
const { connectToMongoDB } = require("./connect")
const urlRoute = require("./routes/url");
const URL = require('./models/url')
const app = express()
const PORT = 8001;

connectToMongoDB("mongodb+srv://shubhanshi1105:sahilashi9112@cluster0.9fvnjlm.mongodb.net/url-shortener")
.then(() => console.log("Mongodb connected"))

app.use(cors())
app.use(express.json())

app.use("/url", urlRoute)

app.get('/:shortId', async (req,res) =>{
  const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }, 
        }
    }
  );
  res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))