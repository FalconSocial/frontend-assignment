/// <reference types="sinon" />
declare module NodeJS {
  interface Global {
    sinon: sinon.SinonStatic;
    expect: Chai.ChaiStatic;
  }
}

const glob = require('glob');
const chaiLib = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chaiLib.use(sinonChai);

const { expect }: Chai.ChaiStatic = chaiLib;
global.sinon = sinon;
global.expect = chaiLib.expect;

glob.sync(`${process.cwd()}/**/*.spec.ts`).forEach(require);
