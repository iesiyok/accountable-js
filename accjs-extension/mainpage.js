const getRandomArray = async () =>{

    var s = '';
    var typedArray = new Uint8Array(3);
    window.crypto.getRandomValues(typedArray);

    for (var i = 0; i < typedArray.length; i++) {
      s += typedArray[i].toString();
    }
    return s;
}

chrome.runtime.onConnect.addListener( port => {
  



  if (port.name === 'windowEvents') {

  
      port.onMessage.addListener(async (msg)=> {

         if (msg.action === 'sxgRequest' ){

            console.log("SXG REQUEST == ", msg.link);
               var message = {
                  link: msg.link,
                  rnd: msg.rnd
                };
                document.getElementById('theFrame').contentWindow.postMessage(message, '*');
         }else if (msg.action === 'randomArray'){
            let rnd = await getRandomArray();
            port.postMessage({action: 'randomArray', rnd: rnd, link: msg.link});
         } 

           window.addEventListener('message', function(event) {
                
                port.postMessage({action: 'sxgResult', rnd: event.data.rnd, manifest: event.data.result} ); 

              });


      });
  } 
});

