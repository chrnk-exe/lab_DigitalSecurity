const onEnterPress = async (e, callback) => {
    if(e.code === 'Enter'){
        callback(e)
        // setComment('')
    }
}

export default onEnterPress;