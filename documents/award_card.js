const axios = require("axios");

module.exports = (data) => {
  return `
  <html>
  <head>
    <meta charset="utf8">
    <title>SuitArt Business Card</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        font-family: 'Sackers Gothic Std';
        font-weight: 500;
        font-size: 7px;
        -webkit-print-color-adjust: exact;
        box-sizing: border-box;
      }
      .page {
        position: relative;
        height: 10mm;
        width: 90mm;
        display: block;
        background: black;
        page-break-after: auto;
        margin: 50px;
        overflow: hidden;
      }

      @media print {
        body {
          height:50%;
        }

        .page {
          margin: 0;
          height: 50%;
          width: 100%;
        }
      }

      .page.first {
        border-left: 5px solid green;
      }

      .bottom {
        position: absolute;
        left: 5mm;
        right: 5mm;
        bottom: 5mm;
      }

      .group {
        margin-top: 3mm;
      }

      .line {
        color: white;
        position: relative;
      }

      .center {
        text-align: center;
      }

      .logo {
        position: relative;
        width: 80%;
        left: 10%;
        top: 15%;
      }

    </style>
  </head>
  <body>
    <div class="page">
      <h1>sdhuihfiushdjkhkjfhdkj sfhsdhf</h1>
    </div>
  </body>
</html>
    `;
};
