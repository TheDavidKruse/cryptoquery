( function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB8LzluEwtj_dRn8eCLMceCFQZkNTEv8fY",
    authDomain: "cryptoquery-13c6d.firebaseapp.com",
    databaseURL: "https://cryptoquery-13c6d.firebaseio.com",
    projectId: "cryptoquery-13c6d",
    storageBucket: "cryptoquery-13c6d.appspot.com",
    messagingSenderId: "872882130310"
  };
  firebase.initializeApp( config );

  const preVal = document.getElementById( "chatInput" ).value();
  var chat = document.getElementById( "chatBox" );
  var button = document.getElementById( "chatBtn" );

  const DbRefObj = firebase.database().ref().child( "object" );

  button.addEventListener( "click", function() {
    var newLine = document.createElement( "p" );
    newLine.innerText = preVal;
    chat.appendChild( newLine );
  } );

} );
