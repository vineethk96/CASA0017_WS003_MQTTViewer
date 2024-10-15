
// Server Endpoint
var mqtt_server = "mqtt://mqtt.cetools.org";

// Specify the Port
var client = mqtt.connect(mqtt_server + ":8080");

// Specify the Topic
var topic_str = "student/CASA0017"

// Send a message to the Console Log that you have connected to the server
client.on("connect", function() {
    console.log("Connected to Server!");

    // Check if we have subscribed to the Topic
    client.subscribe(topic_str, function(err){
        if(!err){
            console.log("Subscribed to: " + topic_str);

            $(".server").append(mqtt_server);
            $(".topic").append(topic_str);
        }
    })
});

// Send a message to the Console Log the current message
client.on("message", function(topic, message){
    // Print to Console Log the message
    console.log(message.toString());

    var currentdate = new Date();

    var messageTopic = "<p><strong>Topic: </strong>" + topic_str + "</p>";
    var messageLead = "<p><strong>Message: </strong>" + message.toString() + "</p>";
    var messageTime = "<p><strong>Time of Post: </strong>" + currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();

    messageTopic = messageTopic + messageLead + messageTime + "<br>";

    $(".messageContainer").prepend(messageTopic);
});