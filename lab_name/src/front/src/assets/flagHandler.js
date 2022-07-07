let flagNotRecieved = true

export default function flagHandler(str) {
    if((str.indexOf('<script>alert') !== -1 || str.indexOf('<script type="text/javascript">alert') !== -1) && flagNotRecieved){
        alert('XSS! admin password: 1234567qwe')
        flagNotRecieved = false
    }
}