function formatMessage(username, text) {
    let timestamp = new Date().getTime() 
    let date= new Date(timestamp)
    let suffix = date.getHours() >= 12 ? "PM" : "AM"
    let formatedTime =  date.getHours() + ":" + date.getMinutes() + " " +  suffix


    return {
        username,
        text,
        time: formatedTime,
    }
}

module.exports = formatMessage;