const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("udemycontract", (m) => {
    const udem = m.contract("CoursePlatform");
    return { udem };
});