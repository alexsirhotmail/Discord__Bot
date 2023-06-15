require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || "", // token do bot
  prefix: process.env.PREFIX || '!', // bot prefix
  ownerID: process.env.OWNERID || ['341355633943248899'], //seu id do discord
  SpotifyID: process.env.SPOTIFYID || 'cb41529dc3bd4d8f8a240dbee0fff4e8', // spotify client id
  SpotifySecret: process.env.SPOTIFYSECRET || 'bcca82f42930498aa385a8289fdf276b', // spotify client secret
  mongourl: process.env.MONGO_URI || 'mongodb+srv://aromaxdev:diwasatreya@youtube.rn0v74r.mongodb.net/?retryWrites=true&w=majority', // MongoDb URL
  embedColor: process.env.COlOR || '#3150EC', // embed cor
  logs: process.env.LOGS || '1117238120052699147', // Discord canal id 
  links: {
    support: process.env.SUPPORT || '',
    invite: process.env.INVITE || 'https://discord.gg/vghQ5Hzr',
    vote: process.env.VOTE || '',
    bg: process.env.BG || 'https://media.discordapp.net/attachments/1028936089555193887/1029023341312487505/musicplayer-home.png'
  },

  nodes: [
    {
      url: process.env.NODE_URL || 'lavalink.lexnet.cc:443',
      name: process.env.NODE_NAME || 'ssl.freelavalink.ga',
      auth: process.env.NODE_AUTH || 'lexn3tl@val!nk',
      secure: parseBoolean(process.env.NODE_SECURE || 'true'),
    },
  ],
};

function parseBoolean(value) {
  if (typeof (value) === 'string') {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case true:
    case "true":
      return true;
    default:
      return false;
  }
}
