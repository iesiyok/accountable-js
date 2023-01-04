const manLTester = require('./manl-tester.js');
const acLTester = require('./acl-tester.js');

const evalTester = require('./eval');


let acList = [
    {'seq': 0, 'type' : 'inline', 'dynamic' : false},
    {'seq': 1, 'type' : 'inline', 'dynamic' : true},
    {'seq': 2, 'type' : 'external', 'url' : 'localhost:8085/b.js', 'dynamic' : true},
    {'seq': 3, 'type' : 'external', 'url' : 'localhost:8085/a.js', 'dynamic' : false},
    {'seq': 4, 'type' : 'iframe', 'url' : 'localhost:8085/a.html', 
        'sandbox' : 'allow-scripts', 'frontend_id' : '001', 'dynamic' : true, 
        'acL' : [
            {'seq': 0, 'type' : 'inline', 'dynamic' : false},
            {'seq': 1, 'type' : 'inline', 'dynamic' : false},
            {'seq': 2, 'type' : 'iframe', 'url' : 'localhost:8085/b.html', 
                'sandbox' : '', 'frontend_id' : '002', 'dynamic' : false,
                'acL' : [
                    {'seq': 0, 'type' : 'inline', 'dynamic' : false},
                    {'seq': 1, 'type' : 'external', 'url' : 'localhost:8085/c.js', 'dynamic' : false},
                    {'seq': 2, 'type' : 'inline', 'dynamic' : false},
                    {'seq': 4, 'type' : 'iframe', 'url' : 'about:blank', 
                        'sandbox' : 'allow-scripts', 'frontend_id' : '003', 'dynamic' : true, 
                        'acL' : [

                        ]
                    }
                ]
            }

        ]
    },
    {'seq': 5, 'type' : 'external', 'url' : 'localhost:8085/e.js', 'dynamic' : false}

];

let manList = [
    {'seq': 0, 'type' : 'inline', 'dynamic' : false},
    {'seq': 1, 'type' : 'inline', 'dynamic' : true},
    {'seq': 2, 'type' : 'external', 'url' : 'localhost:8085/b.js', 'dynamic' : true},
    {'seq': 3, 'type' : 'external', 'url' : 'localhost:8085/a.js', 'dynamic' : false},
    {'seq': 4, 'type' : 'iframe', 'url' : 'localhost:8085/a.html', 
        'sandbox' : 'allow-scripts', 'dynamic' : true, 
        'acL' : [
            {'seq': 0, 'type' : 'inline', 'dynamic' : false},
            {'seq': 1, 'type' : 'inline', 'dynamic' : false},
            {'seq': 2, 'type' : 'iframe', 'url' : 'localhost:8085/b.html', 
                'sandbox' : '',  'dynamic' : false,
                'acL' : [
                    {'seq': 0, 'type' : 'inline', 'dynamic' : false},
                    {'seq': 1, 'type' : 'external', 'url' : 'localhost:8085/c.js', 'dynamic' : false},

                ]
            }

        ]
    },
    {'seq': 5, 'type' : 'external', 'url' : 'localhost:8085/e.js', 'dynamic' : false}

];

// let x = [{'seq': 0, 'type' : 'inline', 'dynamic' : false}];


// let x = [
//     // {'seq': 0, 'type' : 'inline', 'dynamic' : false},
//     // {'seq': 1, 'type' : 'inline', 'dynamic' : true},
//     {'seq': 0, 'type' : 'external', 'url' : 'localhost:8085/a.js', 'dynamic' : false},
//     {'seq': 1, 'type' : 'external', 'url' : 'localhost:8085/b.js', 'dynamic' : true},
//     {'seq': 2, 'type' : 'iframe', 'url' : 'localhost:8085/a.html', 
//         'sandbox' : 'allow-scripts', 'frontend_id' : '001', 'dynamic' : true, 
//         'acL' : [
//             {'seq': 0, 'type' : 'inline', 'dynamic' : false},
//             {'seq': 1, 'type' : 'inline', 'dynamic' : false}
//         ]
//     }

// ];

// const print = (manL) => {
//     for (let i = 0; i < manL.length; i++){
//         let man = manL[i];
//         if (man.manifest && Array.isArray(man.manifest)){
//             console.log("i::", i);
//             print(man.manifest);
//         }else{
//             console.log(man);
//         }
//     }
// }


test('test measurement', async () => {

	let listOfAc = acList;
	let framesInfo = [];
	let acL = [];

	let resp = {'framesInfo' : framesInfo, 'acL' : acL };

	resp = acLTester.createACL(listOfAc, resp);

	let manL = manLTester.createManL(manList);

	// console.log("ACL::", resp.acL);
	// console.log("ManL::", manL);
    // print(manL);
    // console.log("framesInfo::", resp.framesInfo);
    // console.log(manL[0].dynamic);

	evalTester.setACLManL(resp.acL, manL, resp.framesInfo);

    let ePr = await evalTester.measurement('123', resp.acL, manL, '0', resp.framesInfo, true );

    // ePr.then(e => {

    return expect(evalTester.returnResult()).resolves.toEqual([['-1'], ['-1'], ['-1'], ['-1'], ['-1'], ['-1']]);
        
    // setTimeout(()=> {

    //     let tabInfo = evalTester.tabMap.get('123');
    //     let res = tabInfo.results;
    //     return expect(res).toBe([['-1'], ['-1'], ['-1'], ['-1'], ['-1'], ['-1']]);

    // }, 200);
        
    // });


    

});