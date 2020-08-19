export {};

const PRODUCTION = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
    prod: () => {
      return PRODUCTION;
    }
  }