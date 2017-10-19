var str = '{    \
	"access_token": "KCg098lSQF-dgWwg4hBf-oCsz7hQImT8ILSXBjObPYVfKvPfOSxBF2o0lMZoleXAzyVbc_XuKCNZy-KsftM4QrqObmQNxQAfgziQRDGtTiA",  \
	"expires_in": 7200,  \
	"refresh_token": "88HeqXjnT-m3Elz7HAbvOGETDg7LoAS2mhZ7pW8XFfziQ9aTJ7_nDPahtN1_1AYaWXZMwWC3IwyU4AHPU0gCBoysjNBqrBYVLyhk3HPZzm0", \
	"openid": "oeYOBuKASLyudgyVwjLovK39FI2A",    \
	"scope": "snsapi_userinfo"   \
}';
var obj = JSON.parse(str);

if (obj.access_token) {
    console.log(obj.access_token);
}
