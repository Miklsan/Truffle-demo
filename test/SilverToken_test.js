/* eslint-disable no-unused-expressions */
const { contract, accounts } = require('@openzeppelin/test-environment');
const { BN } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const SilverToken = contract.fromArtifact('SilverToken');

describe('SilverToken', async function () {
  const NAME = 'SilverToken';
  const SYMBOL = 'SLV';
  const INITIAL_SUPPLY = new BN('1000000' + '0'.repeat(18));
  const [owner, dev] = accounts;

  beforeEach(async function () {
    this.silver = await SilverToken.new(INITIAL_SUPPLY, { from: dev });
  });

  it('has name', async function () {
    expect(await this.silver.name()).to.equal(NAME);
  });

  it('has symbol', async function () {
    expect(await this.silver.symbol()).to.equal(SYMBOL);
  });

  it('mints initial supply to owner', async function () {
    expect(await this.silver.balanceOf(owner)).to.be.a.bignumber.equal(INITIAL_SUPPLY);
  });
  it('set msg.sender as owner', async function () {
    expect(await this.silver.owner()).to.equal(owner);
  });
});
