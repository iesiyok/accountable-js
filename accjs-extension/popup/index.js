



chrome.runtime.onMessage.addListener(function (e){

	if(e.action == "generated_manifest_content"){
		chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
	      
	      	const url = tabs[0].url;
	      	var man = JSON.stringify({"url": url.split("?")[0], "name": "", "manifest_version": "??", "description": "??", "contents": e.data},null,2);

	      	var blob = new Blob([man], {type: "application/json"});
			var downloadUrl = URL.createObjectURL(blob);
			chrome.downloads.download({
			  url: downloadUrl 
			});
	    });
		
	}


});

function generate_manifest(){

	chrome.runtime.sendMessage({action: 'generateManifest'});

}


function download_manifest(){
	chrome.runtime.sendMessage({action: 'downloadManifest'}, response => {
		    if(chrome.runtime.lastError) {
		    	console.log('Download manifest error.');
		    }else{

		    	var blob = new Blob([JSON.stringify(response, null, 2)], {type: "application/json"}); 
				var downloadUrl = URL.createObjectURL(blob);
				chrome.downloads.download({
					  url: downloadUrl 
				});
		    }
		    
	});
}

function  recursive_str(msg, seq){

	let measurementRes = '';

	if (msg != '-1'){

		console.log(`${msg} ${$.isArray(msg)} ${$.isArray(msg[0])} `)

		if ($.isArray(msg[0]) ){

			let res = "<li>" + `AC-${seq}. Iframe result::` + "</li><ul>";
			measurementRes += res;
			let delg_msg = msg;

				for(let j = 0; j < delg_msg.length; j++){

					res = recursive_str(delg_msg[j], j);
					if (res != '-1'){
						measurementRes += res;
					}
				}
				measurementRes += "</ul></li>";
			
		}else{
			if (msg[0].substring(0,2) == '-2'){
				let res = "<li>" + `AC-${seq}. Iframe evaluation is in progress..` + "</li>";
				measurementRes += res;
			}else{
				let res = "<li>" + msg + "</li>";
				measurementRes += res;
			}
			
		}
	}else{

			return '-1';

		
	}

	return measurementRes;

	
}

function ping() {
  chrome.runtime.sendMessage({action: 'setExtensionResponse'}, response => {
    if(chrome.runtime.lastError) {
    	
      		setTimeout(ping, 200);
    } else {
      		var status = response.status;
            var msg = response.msg;
            var warnings = response.warnings;

            
			$('#status_div').text(status);

			if( $.isArray(msg)){
				var measurementRes = "<p><b>Mismatches:</b></p><ul>";


				for (var i=0; i < msg.length; i++){
					let res = recursive_str(msg[i], i);
					if (res != '-1'){
						measurementRes += res;
					}
					
				}
				measurementRes += "</ul>";
				
				$('#measurement_div').append(measurementRes);
			}else{
				$('#measurement_div').text(msg).wrap('<pre />');
			}
			if (warnings != undefined){
				//TODO warnings might be a list
				let w = "<p>Warnings:</p> <ul><li>" + warnings + "</li></ul>" ;
				$('#warnings_div').append(w).wrap('<pre />');
			}
			setTimeout(function(){

				if (status == 'Uncomplying' || status == 'N/A' ){
					$('#man_gen_btn').prop('disabled', false);
					$('#man_down_btn').prop('disabled', false);
				}else{
					$('#man_gen_btn').prop('disabled', false);
					$('#man_down_btn').prop('disabled', false);
				}

			}, 100)
			

    }
  });
}



function onWindowLoad() {

  		ping();
  		$("#man_gen_btn").click( generate_manifest);
  		$("#man_down_btn").click( download_manifest);

}


window.onload = onWindowLoad;
