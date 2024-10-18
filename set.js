const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0ErNDE2Z2ZkdEcxY3ZKOG16Zk9GTVdnQUNiejBmVzNMQnQ2VFZ4S2tIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidFJNWkQvWnlHS0dTNlZ2QWRNZ0kvcWo4Vkd6T0xONkl5U3ViOSswc3BsMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZSkNqYW1OU2piZnFvanNicnV4TUtiZnE5cVMvNWVFQzI0elR6N1lxZG1nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjWDZ3SHJlZmkrcmtrSjAyVDhyZm5PQ09KNk16UFVBOERyM0N0VFM1N2xFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNPa0ZhWlFJaDJnWUFyanpaUjdlNVlrdVY0NFF2VkVwTDdwNVBQb3ZnbW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhaazhFNzhoMS9HMzErWmJ0VkZOY3Y1cG16TXNtaXV5OVA0ZnBiaG50aE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkllaWFZcll6Sk95T0FQY3p2MkpQQ1crQjh6UjBFY0NmcnB0MHpSblRWbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoianhYeE9KNytmUzdua3J6YzVUS21ENUxBVXJTR280Y2xpa25lM0xEZDdHWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im83Uk1GWG1JQlVpYTdtM0JPMzlDa0hJQVlTbnVOU0Jnc3QwbXRUeUhtTzQ1dE1GVkFTSGxCakJuUjh3MGszc21McjIyL1JtTnZDQU15ODFodXdXMWhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEzLCJhZHZTZWNyZXRLZXkiOiJ3Vm9pdUNERW0za0szTjRKTE1VMDlFYnVxWWJlWGVYMjZEM2ZJc0luL2dRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYb1JRRllKUFJaeXB3eW02elY4bk1nIiwicGhvbmVJZCI6ImEzYzczNTVlLTllNzEtNDFlYi1hYzlkLTQ5YjY4ZjczMjFmYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSeGUva1A5WEFCREE1L2xkUmFwMGFlL0FUMWs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHMvbjlRWFErdTBOdGlxeTZMQ3V3ZmxJUC9BPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlA4QTNOWkI2IiwibWUiOnsiaWQiOiIxODA5NDI0ODIzNDo0NUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGlYN29NREVQMjN5N2dHR0JJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiT3N6L1hSajIvNFpjKzFLWEZZQ2xsOXZCMzBTNWM3T0JkQnBaK2gxa2p6Zz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMDNOU3h2eE94YXhVYXpvNzMwTEZqamw2VGZmTWtWRlE2QzNZUmhiQmZNU1dxcmFrS3IrNXlqVjNFcll2VmdhdC9ZVjVGMkdBT0xvOVBzdkw3L0xKQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6ImpzWGEvcEI2NlkzUkVmUC9NNHlINHVKL2lGbUxzQWhBMlN1NUJ2VFlHNTQzUEVrSVJrTkljZVc0cGdZZTFoYVRnQ3dTMmIxOG5KemdSbnRXVW4xZ2d3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTgwOTQyNDgyMzQ6NDVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVHJNLzEwWTl2K0dYUHRTbHhXQXBaZmJ3ZDlFdVhPemdYUWFXZm9kWkk4NCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTI4OTIyNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHdmIifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𓄂⍣⃝𝐆𝚯𝐃𝄟✮͢≛ 𝐒𝚫𝐒𝐔𝐊𝚵⃝𝄟✮⃝😈",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "18094248234",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
