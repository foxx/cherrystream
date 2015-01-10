var cs = require('./cherrystream.js'),
    chai = require('chai');

describe('CherryStream', function() {
	it("should decode play info data", function() {

		var data = "C04WFQEABQIxARYDVVRMTQkQGwUBV1pcGhcGDQQMQERHHh0LFAMBAQNLFx8MRgdfA" +
							 "VEAXFNQQFdbUUBBQV5AAlELTF8PEEUKTkAMVlBfTVlKF14WXg8WAQRAFFZYVBRCCF" +
							 "USR0hPTB0ATU1OXV1ZVlxERV5FX0lBHBwIDUcrGRoaFCgcCwcUDBsePgAAUlZFQ0E" +
							 "kUVwsMSZZWlYvKllJW0xKVVgyK1BDRSNVMUZcQkdHRlYoMkUY";

		var decoded_data = cs.mixcloud.decode_play_info(data);
		chai.expect(decoded_data).to.have.property('stream_url')
	  //expect(cow.name).to.equal("Anon cow");
	});
});