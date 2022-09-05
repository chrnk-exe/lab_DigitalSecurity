const formatDate = (date) => {
    let ldate = new Date(date)
    return [ldate.getFullYear(), ldate.getMonth()+1, ldate.getDate()].join('-')
}

export default formatDate;