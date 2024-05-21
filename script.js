function llamarGratis() {
    console.log("presiones llamar gratis");
    var initialized = false,
        loggedIn = false,
        connected = false,
        voxImplant = VoxImplant.getInstance(),
        call = null;

    // Add event listeners
    voxImplant.addEventListener(VoxImplant.Events.SDKReady, handleSDKReady);
    voxImplant.addEventListener(VoxImplant.Events.ConnectionEstablished, handleConnectionEstablished);
    voxImplant.addEventListener(VoxImplant.Events.AuthResult, handleAuthResult);

    function handleSDKReady() {
        initialized = true;
        logMessage("VoxImplant SDK ready");
        // Connection with VoxImplant Cloud can be established now
        voxImplant.connect();
    }

    function handleConnectionEstablished() {
        connected = true;
        logMessage("Connection established");
        login();
    }

    function handleAuthResult(e) {
        logMessage("AuthResult: " + e.result);
        if (e.result) {
            // Logged in successfully
            loggedIn = true;
        } else {
            logMessage("Authorization failed. Please specify correct username and password");
        }
    }

    function login() {
        // Authorization required before we can use other functions
        voxImplant.login('c2c-grupoauge@grupoauge-c2c.desarrolladorauge.n9.voximplant.com', 'Sofia@peru2023');
    }

    function logMessage(msg) {
        console.log(msg);
    }

    function makeCall() {
        // Specify your number here - Application Rule Pattern describes which VoxEngine scenario should be launched
        console.log("making call");
        call = voxImplant.call("888");

        // Add event listeners for call events
        call.addEventListener(VoxImplant.CallEvents.Connected, handleCallConnected);
        call.addEventListener(VoxImplant.CallEvents.Failed, handleCallFailed);
        call.addEventListener(VoxImplant.CallEvents.Disconnected, handleCallDisconnected);
    }

    function handleCallConnected(e) {
        logMessage("Call Connected");
        // if (linAction) call.hangup(); // Unclear usage, commented out
        document.getElementById("hangup_btn").disabled = !document.getElementById("hangup_btn").disabled;
        document.getElementById("hangup_btn").onclick = function (e) {
            logMessage("Hangup pressed");
            call.hangup();
        }
    }

    // Write here functions for handleCallFailed and handleCallDisconnected
    function handleCallFailed(e) {
        logMessage("Call Failed: " + e.reason);
    }

    function handleCallDisconnected(e) {
        logMessage("Call Disconnected");
    }
}
