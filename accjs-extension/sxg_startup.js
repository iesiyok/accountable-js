  
if (!WebAssembly.instantiateStreaming) { 
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
        const source = await (await resp).arrayBuffer();
        return await WebAssembly.instantiate(source, importObject);
    };
}

const go = new Go();
let mod, inst;

WebAssembly.instantiateStreaming(fetch("background/sxg/lib.wasm"), go.importObject).then((result) => {
    mod = result.module;
    inst = result.instance;
    
});

async function run() {
    await go.run(inst);
    inst = await WebAssembly.instantiate(mod, go.importObject); // reset instance
    return;
}

async function sxgFunctionsStartup(){
    
    setTimeout(async function (){
        
        try {
          
            await run();
            
            
        } catch (error) {
            await sxgFunctionsStartup();
            console.log("SXG library retried");


        } 
      }, 50);


}

sxgFunctionsStartup();