const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// CORS Issue solve karne ke liye sab cross-origin requests allow kar rahe hain
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API Route
app.all('/api/signup', async (req, res) => {
  try {
    // Number Query parameter (`?msisdn=`) se lega, ya JSON body se, ya default fallback number
    const msisdn = req.query.msisdn || req.body?.msisdn || "923097508053";

    const payload = {
      msisdn: msisdn,
      type: "msisdn",
      device_name: "Netscape",
      app_version: "1.0",
      user_platform: "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36"
    };

    const response = await axios.post('https://prod.fitflexapp.com/api/users/signupV1', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://fitflexapp.com',
        'Referer': 'https://fitflexapp.com/'
      }
    });

    res.status(200).json({
      developer: "developed by Ramzan Ahsan",
      success: true,
      api_response: response.data
    });

  } catch (error) {
    res.status(error.response?.status || 500).json({
      developer: "developed by Ramzan Ahsan",
      success: false,
      error: error.response ? error.response.data : error.message
    });
  }
});

// Root Route (Testing ke liye)
app.get('/', (req, res) => {
  res.json({
    message: "FitFlex API Wrapper Active",
    developer: "developed by Ramzan Ahsan",
    usage: "Use /api/signup?msisdn=923001234567"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
