import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/matches', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${today}&dateTo=${nextWeek}`,
      {
        headers: {
          'X-Auth-Token': 'c49d732920c64d59abcfc884eb2a9869'
        }
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
