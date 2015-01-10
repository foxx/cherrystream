(function(exports) {
  "use strict";

  var atob = require('atob'),
      btoa = require('btoa'),
      Stapes = require('stapes'),
      chai = require('chai');

  /*
   * Error classes
   */
  function DecodeError(message) {
    this.name = "DecodeError";
    this.message = (message || "");
  }
  DecodeError.prototype = Error.prototype;

  /*
   * MixCloud interface for Cherry Stream
   *
   * After an amusing email exchange with mixcloud
   * founder Sam Cooke, they ignored my advise of
   * making a player that doesn't leak memory and
   * eat my CPU. So I decided to make one and release
   * as open source, because seriously, MixCloud
   * need to hire some better developers.
   */
  var MixCloud = Stapes.subclass({
    /*
     * PlayInfo stores the direct stream URL with
     * some piss poor and unnecessary obfuscation,
     * total waste of CPU cycles tbh but w/e.
     *
     * NOTE: This will probably break quite often
     * depending on how much MixCloud change their
     * undocumented APIs. Like with all client side
     * obfuscation, it's just a retarded game of tig/tag.
     *
     * NOTE: To avoid potential copyright issues, we have
     * to re-implement the deobfuscation as we do not have
     * permission to copy their client side source (lol),
     * look for "pleasedont" in their minified prod JS
     * for the original routine.
     */
    decode_play_info : function(value) {
      var pos;
      var key = atob("cGxlYXNlZG9udGRvd25sb2Fkb3VybXVzaWN0aGVhcnRpc3Rzd29udGdldHBhaWQ="),
          key_len = key.length,
          nvalue = [],
          dvalue = atob(value),
          i = 0;

      for (pos = dvalue.length; pos > i; i++) {
        nvalue[i] = dvalue.charCodeAt(i) ^ key.charCodeAt(i % key_len);
      }

      try {
        return JSON.parse(
          String.fromCharCode.apply(String, nvalue));
      } catch (e) {
        throw new DecodeError("Unable to decode play info");
      }
    }
  });

  exports.mixcloud = new MixCloud();
  exports.DecodeError = DecodeError;

})(this);



/*

v
    // Taken from prod JS 
    function v(e) {
      var t, n, r = "pleasedontdownloadourmusictheartistswontgetpaid",
          o = r.length,
          i = 0,
          a = [];
      for (n = atob(e), t = n.length; t > i; i++) a[i] = n.charCodeAt(i) ^ r.charCodeAt(i % o);
      return JSON.parse(String.fromCharCode.apply(String, a))
    }

  var lol = "C04WFQEABQIxARYDVVRMTQkQGwUBV1pcGhcGDQQMQERHHh0LFAMBAQNLFx8MRgdfAVEAXFNQQFdbUUBBQV5AAlELTF8PEEUKTkAMVlBfTVlKF14WXg8WAQRAFFZYVBRCCFUSR0hPTB0ATU1OXV1ZVlxERV5FX0lBHBwIDUcrGRoaFCgcCwcUDBsePgAAUlZFQ0EkUVwsMSZZWlYvKllJW0xKVVgyK1BDRSNVMUZcQkdHRlYoMkUY";

  function v(e) {
    var t, n, r = "pleasedontdownloadourmusictheartistswontgetpaid",
        o = r.length,
        i = 0,
        a = [];
    for (n = atob(e), t = n.length; t > i; i++) a[i] = n.charCodeAt(i) ^ r.charCodeAt(i % o);
    return JSON.parse(String.fromCharCode.apply(String, a))
  }

  console.log(v(lol))
  */