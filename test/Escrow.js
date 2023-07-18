const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { config, ethers } = require("hardhat");

describe("Escrow", async function () {
  let escrowContract, exampleToken;

  let deployer, jane, bob, tom;

  beforeEach(async () => {
    [deployer, jane, bob, tom] = await ethers.getSigners();
    const MyERC20 = await ethers.getContractFactory("Token");

    exampleToken = await MyERC20.deploy("Gold", "GLD");
    await exampleToken.waitForDeployment();

    const MyEscrow = await ethers.getContractFactory("Escrow");

    escrowContract = await MyEscrow.deploy(deployer.address);
    await escrowContract.waitForDeployment();
  });

  it("Mints into Escrow", async function () {
    await exampleToken.mint(escrowContract.target, 10);
    expect(await exampleToken.balanceOf(escrowContract.target)).to.equal(10);
  });

  it("Sends the erc20 token in batches", async function () {
    await exampleToken.mint(escrowContract.target, 10);
    await escrowContract.multisendToken(
      exampleToken.target,
      [bob.address, tom.address],
      [1, 2]
    );
    expect(await exampleToken.balanceOf(bob.address)).to.equal(1);
    expect(await exampleToken.balanceOf(tom.address)).to.equal(2);
  });
});
