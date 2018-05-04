var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var util = require('./../lib/util.js');

describe('buildPath_string', function() {
  it('buildPath() for no type', function() {
    var params = {}
    var path = util.buildPath(params);

    expect(path).to.equal("https://www.discogs.com/sell/list?");
  });
});

describe('buildPath_string', function() {
  it('buildPath() for a string type', function() {
    var params = {
      type:"string",
      id:"testString"
    }
    var path = util.buildPath(params);

    expect(path).to.equal("https://www.discogs.com/sell/list?q=testString");
  });
});

describe('buildPath_master', function() {
  it('buildPath() for a master type', function() {
    var params = {
      type:"master",
      id:123
    }
    var path = util.buildPath(params);

    expect(path).to.equal("https://www.discogs.com/sell/list?master_id=123");
  });
});

describe('buildPath_release', function() {
  it('buildPath() for a release type', function() {
    var params = {
      type:"release",
      id:123
    }
    var path = util.buildPath(params);

    expect(path).to.equal("https://www.discogs.com/sell/list?release_id=123");
  });
});

describe('buildPath_label', function() {
  it('buildPath() for a label type', function() {
    var params = {
      type:"label",
      id:123
    }
    var path = util.buildPath(params);

    expect(path).to.equal("https://www.discogs.com/sell/list?label_id=123");
  });
});

describe('buildPath_seller', function() {
  it('buildPath() for no type with a seller', function() {
    var params = {
      seller:"testSeller"
    }
    var path = util.buildPath(params);

    expect(path).to.equal("https://www.discogs.com/seller/testSeller/profile?");
  });
});

describe('buildPath_seller-string', function() {
  it('buildPath() for a string type with a seller', function() {
    var params = {
      seller:"testSeller",
      type:"string",
      id:"testString"
    }
    var path = util.buildPath(params);

    expect(path).to.equal("https://www.discogs.com/seller/testSeller/profile?q=testString");
  });
});
