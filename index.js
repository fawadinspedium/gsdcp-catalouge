const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const axios = require('axios');
const fs = require("fs");

const pdfTemplate = require('./documents/index');
const pdfData = require('./documents/index-2');
const pdfTemplateAward = require('./documents/award_card');
const app = express();
const port = process.env.PORT ||5000;
app.use(cors());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));


config = {
  "height": "10.5in",        // allowed units: mm, cm, in, px
  "width": "8in",            // allowed units: mm, cm, in, px
  "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
  "orientation": "portrait", // portrait or landscape
}

app.get('/fetch-pdf/:id', (req, res) => {
  axios.get(`https://gsdcp.org/api/send-catalog?id=${req.params.id}`)
  .then(response => {
    const path = __dirname+`/${response.data.title}-${response.data.dates}.pdf`;
    if (fs.existsSync(path)) {
      res.status(200).sendFile(`${__dirname}/${response.data.title}-${response.data.dates}.pdf`)
      console.log("exists:", path);
    } 
    else {
      console.log("DOES NOT exist:", path);
      pdf.create(pdfTemplate(response.data,config)).toFile(`${response.data.title}-${response.data.dates}.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.status(200).sendFile(`${__dirname}/${response.data.title}-${response.data.dates}.pdf`)
        }
      );
    }
  })
  .catch(error => {
    console.log(error);
  });
})

app.get('/fetch-award', (req, res) => {
  pdf.create(pdfTemplateAward("a",{ format: "A5",
  
  orientation: "landscape",}
  )).toFile(`a.pdf`, (err) => {
    if(err) {
        res.send(Promise.reject());
    }
    res.status(200).sendFile(`${__dirname}/a.pdf`)
    });
})

app.get('/update-pdf/:id', (req, res) => {
  const data=axios.get(`https://gsdcp.org/api/send-catalog?id=${req.params.id}`)
  .then(response => {
    const path = __dirname+`/${response.data.title}-${response.data.dates}.pdf`;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      pdf.create(pdfTemplate(response.data,config))
      .toFile(`/${response.data.title}-${response.data.dates}.pdf`, 
      (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.status(200)
        .sendFile(`${__dirname}/${response.data.title}-${response.data.dates}.pdf`)
        });
    } 
    else {
      console.log("DOES NOT exist:", path);
      pdf.create(pdfTemplate(response.data,config))
      .toFile(`/${response.data.title}-${response.data.dates}.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.status(200)
        .sendFile(`${__dirname}/${response.data.title}-${response.data.dates}.pdf`)
        }
      );
    }
  })
  .catch(error => {
    console.log(error);
  });
})

app.get('/fetch-pdf-html/:id', (req, res) => {
  const data=axios.get(`https://gsdcp.org/api/send-catalog?id=${req.params.id}`)
  .then(response => {
        res.status(200).send(pdfTemplate(response.data))
  })
  .catch(error => {
    console.log(error);
  });
})
app.get('/fetch-pdf-data/:id', (req, res) => {
  const data=axios.get(`https://gsdcp.org/api/send-catalog?id=${req.params.id}`)
  .then(response => {
        res.status(200).send(pdfData(response.data))
  })
  .catch(error => {
    console.log(error);
  });
})
app.listen(port, () => console.log(`Listening on port ${port}`));