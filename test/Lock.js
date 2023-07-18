const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { config, ethers } = require("hardhat");

describe("Lock", async function () {
  [deployer, jane] = await ethers.getSigners();
  console.log(deployer.address);
});
