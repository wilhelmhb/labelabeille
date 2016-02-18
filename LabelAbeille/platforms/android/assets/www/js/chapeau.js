$(function() {
		console.log("test");
        function onDeviceReady() {
        	console.log("Device ready");
        	$("#prompt").on("click",function() {console.log('ok');promptNotification()});
        	$("#alert").on("click",alertNotification);
        	$("#confirm").on("click",confirmNotification);
        	$("#push").on("click",pushNotification);
        	$("#beep").on("click",beepNotification);
        	$("#vibrate").on("click",vibrateNotification);
        	//$("prompt").on("click",promptNotification);
        }
        document.addEventListener("deviceready", onDeviceReady, false);
});