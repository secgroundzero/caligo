function logout(){
	var connectService="php/logout.php";
	$.ajax({
		url:connectService,
		type:"POST",
		data:{"session": document.cookie},
		success:function(result){
			var response=result;
			if (response.logout==1){
				document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				window.location.href="login.html";
			}
		},
		error:function(res){
			document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			window.location.href="login.html";
		}
	});

}

function changePassword(){
	var currentPassword=CryptoJS.MD5(document.getElementById("current-password").value).toString();
	var newPassword=CryptoJS.MD5(document.getElementById("new-password").value).toString();
	var confirmPassword=CryptoJS.MD5(document.getElementById("confirm-password").value).toString();
	var connectService="php/changePassword.php";
	$.ajax({
		url:connectService,
		type:"POST",
		data:{"session":document.cookie,"oldPassword":currentPassword, "newPassword":newPassword, "confirmPassword":confirmPassword },
		success:function(result){
			var response=result;
			if (response.change==1){
			var alertbox=document.getElementsByClassName("alert-success")[0];
			alertbox.classList.add("show");
			}
			else{
				var alertbox=document.getElementsByClassName("alert-warning")[0];
				alertbox.classList.add("show");
			}
		},
		error: function(res){
			 $('.alert-warning').alert();
		}
	});
}

function loadDevices(){
	var connectService="php/c2settingsLoad.php";
	$.ajax({
		url: connectService,
		type: "POST",
		data:{"session":document.cookie}, 
		success: function(result){
	   		//On success
		var response = result;
		var onlinecount=response.online;
		if (onlinecount>0){
			//No devices
			document.getElementById("collapse-tabContent").style.display="inline";
		}
		else{
			document.getElementById("infoBox").style.display="inline";
		}
		var navs=document.getElementById("pills-tab-devices");
		var tabs=document.getElementById("collapse-tabContent");
		for (var i=0; i<onlinecount; i++){
			var devID=response.onlineDevices[i].DeviceID;
			var devicePort=response.onlineDevices[i].DevicePort;
			var connectServiceDevice="php/LoadPort.php";
			setTimeout(function(){ 
			$.ajax({
				url: connectServiceDevice,
				type: "GET", 
				data: {"devicePort":devicePort},
				success: function(result){
				},
				error: function (result){
				}
			});
			}, 2000);
			var divItem=document.createElement("div");
			divItem.className="card";
			divItem.setAttribute("style","background-color:#343434;border-color:#343434");
			var divItem1=document.createElement("div");
			divItem1.className="card-header";
			divItem1.setAttribute("style","background-color:#343434;border-color:#343434");
			var div1ID="heading"+devID;
			divItem1.setAttribute("id",div1ID);
			var h5Item=document.createElement("h5");
			h5Item.className="mb-0";
			var buttonItem=document.createElement("button");
			buttonItem.className="btn btn-link collapsed";
			buttonItem.setAttribute("data-toggle", "collapse");
			var targetID="#collapse"+devID;
			buttonItem.setAttribute("data-target", targetID);
			buttonItem.setAttribute("aria-expanded", "true");
			var buttonText=document.createTextNode(response.onlineDevices[i].DeviceName);
			var tarID="collapse"+devID;
			buttonItem.setAttribute("aria-controls",tarID);
			buttonItem.appendChild(buttonText);
			h5Item.appendChild(buttonItem);
			divItem1.appendChild(h5Item);
			divItem.appendChild(divItem1);

			var divItem2=document.createElement("div");
			divItem2.setAttribute("style","background-color:#343434;border-color:#343434");
			divItem2.setAttribute("id",tarID);
			divItem2.className="collapse show";
			divItem2.setAttribute("aria-labelledby", div1ID);
			divItem2.setAttribute("data-parent", "#collapse-tabContent");
			
			var divItem3=document.createElement("div");
			divItem3.className="card-body";
			divItem3.setAttribute("style","background-color:#343434;border-color:#343434");
			var iframeItem=document.createElement("iframe");
			iframeItem.setAttribute("style","width:100%;height:500px")
			var server=response.serverip;
			var port="2222";
			var srcLink="http://" + server+":"+port+"/ssh/host/127.0.0.1";
			iframeItem.setAttribute("src",srcLink);

			divItem3.appendChild(iframeItem);
			divItem2.appendChild(divItem3);
			divItem.appendChild(divItem2);
			tabs.appendChild(divItem);
		
			//Delete Button
			var  devicesList=document.getElementById("connected-devices");

	        //Item Creation
			var  rowItem=document.createElement("div");
			rowItem.className="row";
			rowItem.setAttribute("style","margin-left:1px;margin-top:1px");

	        var paragraphElement=document.createElement("p");
	        paragraphElement.className="bg-gradient-primary text-white";
	        paragraphElement.setAttribute("style", "font-size:12px");

	        var spanElement=document.createElement("span");
		var spanElementID="deviceStatus"+response.onlineDevices[i].DeviceID;
		spanElement.setAttribute("id", spanElementID);
	        spanElement.className="fa fa-random fa-rotate-270";
	        spanElement.setAttribute("style", "color:#86bc25");
	        var paragraphTextNode=document.createTextNode(response.onlineDevices[i].DeviceName);
	        paragraphElement.appendChild(spanElement);
	        paragraphElement.innerHTML+="&emsp;";
			paragraphElement.appendChild(paragraphTextNode);
	        var brList=document.createElement("br");
	        paragraphElement.appendChild(brList);
			var ExternalIP=response.onlineDevices[i].DeviceExternalIP;
			var InternalIP=response.onlineDevices[i].DeviceInternalIP;
	        var ips=ExternalIP + " | " + InternalIP;
	        var IPTextNode=document.createTextNode(ips);
	        paragraphElement.appendChild(IPTextNode);

			var buttonElDel=document.createElement("button");
			buttonElDel.setAttribute("style", "background-color:#3f3f3f;border-color:#3f3f3f;width:30px;margin-left:15px;");
			var delID="delete"+devID;
			buttonElDel.setAttribute("id",delID);
			var functionName="deleteDev('"+devID+"')";
			buttonElDel.setAttribute("onclick", functionName);
			var delSpanEl=document.createElement("span");
			delSpanEl.className="fa fa-trash";
			delSpanEl.setAttribute("style","color:#86bc25");
			buttonElDel.appendChild(delSpanEl);
			rowItem.appendChild(paragraphElement);
			rowItem.appendChild(buttonElDel);
		        devicesList.appendChild(rowItem);
		}
		var devicesList=document.getElementById("connected-devices");
		var offlinecount=response.offline;
		for (var i=0; i<offlinecount; i++){

			var  rowItem=document.createElement("div");
	        rowItem.className="row";
	        rowItem.setAttribute("style","margin-left:1px;margin-top:1px");

			 var paragraphElement=document.createElement("p");
	        paragraphElement.className="bg-gradient-primary text-white";
	        paragraphElement.setAttribute("style", "margin-left:1px;margin-top:1px;font-size:12px");

	        var spanElement=document.createElement("span");
		var spanElementID="deviceStatus"+response.offlineDevices[i].DeviceID;
                spanElement.setAttribute("id", spanElementID);
	        spanElement.className="fa fa-random fa-rotate-90";
	        spanElement.setAttribute("style", "color:grey");
	        var paragraphTextNode=document.createTextNode(response.offlineDevices[i].DeviceName);
	                
	        paragraphElement.appendChild(spanElement);
	        paragraphElement.innerHTML+="&emsp;";
	        paragraphElement.appendChild(paragraphTextNode);
	        var brList=document.createElement("br");
	        paragraphElement.appendChild(brList);
		var buttonElDel=document.createElement("button");
	        buttonElDel.setAttribute("style", "background-color:#3f3f3f;border-color:#3f3f3f;width:30px;margin-left:15px;");
	        var devID=response.offlineDevices[i].DeviceID;
	        var functionName="deleteDev('"+devID+"')";
		var delID="delete"+devID;
		buttonElDel.setAttribute("id", delID);
	        buttonElDel.setAttribute("onclick", functionName);
	        var delSpanEl=document.createElement("span");
	        delSpanEl.className="fa fa-trash";
	        delSpanEl.setAttribute("style","color:#86bc25");
	        buttonElDel.appendChild(delSpanEl);

	        var ips=response.offlineDevices[i].DeviceExternalIP + " | " + response.offlineDevices[i].DeviceInternalIP;
	        var IPTextNode=document.createTextNode(ips);
	        paragraphElement.appendChild(IPTextNode);
			rowItem.appendChild(paragraphElement);
	        rowItem.appendChild(buttonElDel);
	        devicesList.appendChild(rowItem);
		}	
		localStorage.setItem("lineNewConnection", 0);
		},
		error:function(result){
			console.log("Error");
		}
	});
}

function checkforNewConnection(){
	var connectService ="php/connectedDevices.php"
	var latestLine=localStorage.getItem("lineNewConnection");
	$.ajax({
                url: connectService,
                type: "GET", 
		data: {"afterLine":latestLine},
                success: function(result){
			var response=result;
			var count=result.newconnection;
			if (count>0){
				 document.getElementById("collapse-tabContent").style.display="inline";
                        		document.getElementById("infoBox").style.display="none";
					newDeviceConnected(response);
                                	localStorage.setItem("lineNewConnection", response.lastLine);				
			}
		},
		error:function(resutl){
			console.log("Error");
		}
	});
}

function newDeviceConnected(response){
	var  devicesList=document.getElementById("connected-devices");
        var tabs=document.getElementById("collapse-tabContent");

	var  rowItem=document.createElement("div");
        rowItem.className="row";
        rowItem.setAttribute("style","margin-left:1px;margin-top:1px");

	//Item Creation
	var paragraphElement=document.createElement("p");
	paragraphElement.className="bg-gradient-primary text-white";
	paragraphElement.setAttribute("style", "margin-left:1px;margin-top:1px;font-size:12px");

	var spanElement=document.createElement("span");
	var spanElementID="deviceStatus"+response.connection.DeviceID;
        spanElement.setAttribute("id", spanElementID);
	spanElement.className="fa fa-random fa-rotate-270";
	spanElement.setAttribute("style", "color:#86bc25");

	var devName=response.connection.DeviceName;
	var paragraphTextNode=document.createTextNode(devName);
		
	paragraphElement.appendChild(spanElement);
	paragraphElement.innerHTML+="&emsp;";
	paragraphElement.appendChild(paragraphTextNode);
	var br1=document.createElement("br");
	paragraphElement.appendChild(br1);

	var external=response.connection.DeviceExternalIP;
	var internal=response.connection.DeviceInternalIP;
	var port=response.connection.DevicePort;
	var server=response.serverIP;
	var ips=external + " | " + internal;
	var IPTextNode=document.createTextNode(ips);
	paragraphElement.appendChild(IPTextNode);

	 var buttonElDel=document.createElement("button");
        buttonElDel.setAttribute("style", "background-color:#3f3f3f;border-color:#3f3f3f;width:30px;margin-left:15px;");
        var devID=response.connection.DeviceID;
	var deleteButtonID="delete"+devID;
	buttonElDel.setAttribute("id",deleteButtonID);
        var functionName="deleteDev('"+devID+"')";
        buttonElDel.setAttribute("onclick", functionName);
        var delSpanEl=document.createElement("span");
        delSpanEl.className="fa fa-trash";
        delSpanEl.setAttribute("style","color:#86bc25");
        buttonElDel.appendChild(delSpanEl);
        rowItem.appendChild(paragraphElement);
        rowItem.appendChild(buttonElDel);
	devicesList.appendChild(rowItem);

	 //Collapse Creation
	var divItem=document.createElement("div");
         divItem.className="card";
	divItem.setAttribute("style","background-color:#343434;border-color:#343434");
                var divItem1=document.createElement("div");
                divItem1.className="card-header";
		
	var div1ID="heading"+devID;
                divItem1.setAttribute("id",div1ID);
                divItem1.setAttribute("style","background-color:#343434;border-color:#343434");
                var h5Item=document.createElement("h5");
                h5Item.className="mb-0";
                var buttonItem=document.createElement("button");
                buttonItem.className="btn btn-link collapsed";
                buttonItem.setAttribute("data-toggle", "collapse");
                var targetID="#collapse"+devID;
                buttonItem.setAttribute("data-target", targetID);
                buttonItem.setAttribute("aria-expanded", "true");
                var buttonText=document.createTextNode(devName);
                var tarID="collapse"+devID;
                buttonItem.setAttribute("aria-controls",tarID);
                buttonItem.appendChild(buttonText);
                h5Item.appendChild(buttonItem);
                divItem1.appendChild(h5Item);
                divItem.appendChild(divItem1);
                
                var divItem2=document.createElement("div");
		divItem2.setAttribute("style","background-color:#343434;border-color:#343434");
                divItem2.setAttribute("id",tarID);
                divItem2.className="collapse show";
                divItem2.setAttribute("aria-labelledby", div1ID);
                divItem2.setAttribute("data-parent", "#collapse-tabContent");
                
                var divItem3=document.createElement("div");
                divItem3.className="card-body";
                divItem3.setAttribute("style","background-color:#343434;border-color:#343434");
                var iframeItem=document.createElement("iframe");
                iframeItem.setAttribute("style","width:100%;height:500px")
                var server=response.serverIP;

                var port="2222";
                var srcLink="http://" + server+":"+port+"/ssh/host/127.0.0.1";
                iframeItem.setAttribute("src",srcLink);

                divItem3.appendChild(iframeItem);
                divItem2.appendChild(divItem3);
                divItem.appendChild(divItem2);
                tabs.appendChild(divItem);
	
}

function deleteDev(id){
	var devID=id;
	//Disable Delete Button - Connected Devices
	var connectService="php/c2settingsDelete.php";
        $.ajax({
                url: connectService,
                type: "POST", 
		data:{"devID":devID, "session":document.cookie},
                success: function(result){
        		//Disable Delete Button - Connected Devices
        		var deleteButtonID="delete"+devID;
			var spanElementID="deviceStatus"+devID;
        		var btn=document.getElementById(deleteButtonID);
			var spanItem=document.getElementById(spanElementID);
			spanItem.setAttribute("style","color:grey");
			spanItem.className="fa fa-random fa-rotate-90";
       			btn.innerHTML="";
        		var greySpan=document.createElement("span");
        		greySpan.className="fa fa-trash";
        		greySpan.setAttribute("style", "color:grey");
        		btn.appendChild(greySpan);
        		btn.setAttribute("disabled","");
        		var colID="collapse"+devID;
 			var collapseDel=document.getElementById(colID);
        		if (collapseDel!=null){
        			collapseDel.innerHTML="";
        			var headingID="heading"+devID;
        			var buttonLink=document.getElementById(headingID).getElementsByTagName("button")[0];
        			buttonLink.setAttribute("disabled","");
			}
		},
		error: function(result){

		}
		});
	}

