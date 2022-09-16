
const host = "localhost:5000"
if(process.env.NODE_ENV === 'production'){
    host = '62.84.113.204'
}
// const host = 'localhost'
export default host