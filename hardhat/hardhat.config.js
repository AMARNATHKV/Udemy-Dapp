require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const privatekey=process.env.privatekey;
const infuraurl=process.env.infuraurl;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "infurasep",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    infurasep: {
      url:infuraurl,
      accounts:[privatekey]
    }
  },
  solidity: "0.8.20",
};
