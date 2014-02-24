function parseSearch() {
  if (document.location.search[0] != "?")
    return {};

  var s = document.location.search.substr(1).split("&");
  var opts = {};
  for (var i = 0; i < s.length; ++i) {
    var f = s[i].split("=");
    opts[f[0]] = f[1];
  }
  return opts;
}
