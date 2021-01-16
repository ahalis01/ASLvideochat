//var apiKey = "47084334";
//var sessionId = "2_MX40NzA4NDMzNH5-MTYxMDgxMTc1ODc4Mn5wS1JVNE01eFdpZ0VtYVhnM0FVN29JVXV-fg";
// publisher token, expires in 30 days
//var token = "T1==cGFydG5lcl9pZD00NzA4NDMzNCZzaWc9NjNlMTdmZDc0MWM3MzFiNzNkZDBlNTMzZTZmZjJlNGU3N2Y0NTczMzpzZXNzaW9uX2lkPTJfTVg0ME56QTRORE16Tkg1LU1UWXhNRGd4TVRjMU9EYzRNbjV3UzFKVk5FMDFlRmRwWjBWdFlWaG5NMEZWTjI5SlZYVi1mZyZjcmVhdGVfdGltZT0xNjEwODExODIxJm5vbmNlPTAuODk1MTMxNDk3NTQxODczNCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjEzNDAzODIxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
        alert(error.message);
    }
  }

// (optional) add server code here
//initializeSession();

// (optional) add server code here
var SERVER_BASE_URL = 'https://asl-video-chat.herokuapp.com';
fetch(SERVER_BASE_URL + '/session').then(function(res) {
  return res.json()
}).then(function(res) {
  apiKey = res.apiKey;
  sessionId = res.sessionId;
  token = res.token;
  initializeSession();
}).catch(handleError);


console.log(apiKey);
function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
  
    // Subscribe to a newly created stream
  
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        }, handleError);
      });
      

    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
        if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }
  
