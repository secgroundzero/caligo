function login(){
	document.getElementById("error-message").style.display="none";
	var username=document.getElementById("username").value;
	var passwordHash = CryptoJS.MD5(document.getElementById("password").value).toString();
	document.getElementById("username").value="";
	document.getElementById("password").value="";
	var username="root";
	var passwordHash="63a9f0ea7bb98050796b649e85481845";
	var data={"username":username, "passwordHash":passwordHash};
	var connectService="Functions/php/login.php";
	$.ajax({
		url:connectService,
		data:data,
		method:"POST",
		success: function(result){
			var response=result;
			if (response.count>0){
				//Provide access
				document.cookie=response.session;
				window.location.href="index.html"
			}
			else{
				//Restrict access
				document.getElementById("error-message").style.display="inline";
			}
		},
		error:function(result){
		}
	});
}

