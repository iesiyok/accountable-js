
const isValidUrl =  (s) => {
    if(s == "" || s == "about:blank") {
        return true;
    }else {
        var regexp = /((ftp|http|https):\/\/)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(s);
    }
   
}

const compareTwoURLS =  (u1, u2) => {

    var regexp = /((ftp|http|https)?:?\/\/)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

    var s1 = u1.match(regexp)[4];
    var s2 = u2.match(regexp)[4];
    if (s1 == s2){
        return true;
    }else{
        return false;
    }


}

const iframeSrcListIncludes = (list, e1) => {
    if (list.length > 0){

        for(let i = 0; i < list.length; i++ ){
            let e2 = list[i];
            if (compareTwoURLS(e1, e2)){
                return true;
            }else{
                if (i == list.length -1){
                    return false;
                }
            }
        }
    }else{
        return false;
    }
}

const javascriptUrl =  (s) => {
   var regexp = /(javascript):(.)?/
   return regexp.test(s);
}


const validityCheck =  (elem) => {
    if (elem != null && elem != undefined && elem != ""){
        return true;
    }else{
        false;
    }
}


const loadCheck =  (elem) => {
    if (elem.async){
        return 'async';
    }else if (elem.defer){
        return 'defer';
    }else{
        return 'sync';
    }   
}

const find_prev =  (content) => {
    var target = [];
    var ps = content.previousElementSibling;
    while (ps != null){
        target.push('0');
        ps = ps.previousElementSibling;
    }
    return target;
}

const find_target = async (content) => {

    var target = [];

    let t = await find_prev(content);
    target = target.concat(t);
    var pe = content.parentElement;
    while (pe != null){
        target.push('1');
        let t = await find_prev(pe);
        target = target.concat(t);
        pe = pe.parentElement;
    }
    
    return target;
}

const deleteFirstElementFromTarget = async (target) => {

    let tar = target.shift();
    return target;
}

const reverse_target =  (lst) => {
    let lst2 = [];
    if (lst.length > 0){
        for (let i = 0; i < lst.length; i++){
            if (lst[i] == '0' ) lst2.push('1');
            if (lst[i] == '1' ) lst2.push('0');
            if (i == lst.length -1 ){
                return lst2;
            }
        }
    }else{
        return lst2;
    }

}

const compare_targets =  (t1, t2) => {
    
    let t3 = [];
    
    let swap = false;
    if (t1.length < t2.length){//we will swap the arrays to be able to loop through the shortest one

        t3 = t2;
        t2 = t1; 
        t1 = t3; 
        swap = true;
    }
    for(let i = 0; i < t1.length; i++ ){//loop through the shortest one
        let x = t1[i];
        let y = t2[i];
        if (y == undefined){
            if (!swap) {//if we swapped the arrays, the result will be vice versa
                return 1;
            }else{
                return 0;
            }

        }else{

            if (x == y){
                continue;
            }else{
                if (!swap) {
                    if(x>y){
                        return 0;//means x is earlier than y
                    }else{
                        return 1;//
                    }
                }else{//if we swapped the arrays, the result will be vice versa
                    if(x>y){
                        return 1;//means x is later than y
                    }else{
                        return 0;//
                    }
                }
                
            }

        }
    }
}




const find_location = async (target, list) => {

    if (list == undefined || list.length == 0){
        return 0;
    }

    for (let i = 0; i < list.length; i++){
        let t = list[i].target;
        
        let com = await compare_targets(target, t);
        //console.log("t1::", target, "   t2::", t, " com::", com);
        
        if (com == 0){
            //target is earlier
            return i;
        }else{
            if (i == list.length - 1){
                return i+1;
            }else{
                continue;
            }
        }
    }
}


const add_2_acc_list = async (loc, res, list) => {
    // let loc = await find_location(res.target, list);
    list.splice(loc, 0, res );
    let list2 = [];
    for (let i = 0; i < list.length; i++){
        let t = list[i];
        t.seq = i+1;
        list2.push(t);
        if ( i == list.length - 1){
            return list2;
        }
    }
    // return list2;
}



const serialise_list = async (list, custom) => {
    let a = [];
    if(list.length == 0) return a;
    for (let i = 0; i < list.length; i++){
        let t = list[i];
        // console.log(t);
        t.seq = i;
        let j = "";
        if (t.type == 'iframe'){

            t = await t.iframe_serial(t);

        }
        if (custom){
            j = await t.serialise_custom(t);
        }else{
            j = await t.serialise(t);
        }
        
        a.push(j);
        if(i == list.length - 1){
            return a;
        }
    }
    
}

function t_compare( a, b ) {
  if ( a.target < b.target ){
    return -1;
  }
  if ( a.target > b.target ){
    return 1;
  }
  return 0;
}

const refresh_list = async (list) => {

    if (list.length > 0 ){
        list = list.sort(t_compare);
        for (let i = 0; i < list.length; i++){
            list[i].seq = i;
            if (i == list.length-1){
                return list;
            }
        }
    }else{
        return list;
    }

}

const find_common_points_in_targets = (t1, t2) => {

     let counter = 0;

    for (let i = 0 ; i < t1.length; i++){
        // console.log('i: ', i, ' el1: ', t1[i], ' el2 : ', t2[i], ' counter : ', counter  );
        if (t1[i] == t2[i]){
            counter++;
            
        }else{
            return counter;
        }
        if (i == t1.length - 1){
            return counter;
        }
    }
    return 0;
}

const compare_element_attributes = (el1, el2) => {

    if (el1.type == 'iframe'){

        if (el1.src_type == el2.src_type && el1.src == el2.src){
            return true;
        }else{
            return false;
        }

    }else if (el1.type == 'external' || el1.type == 'local'  ){
        
        if (el1.link == el2.link /*&& el1.hash == el2.hash*/){
            return true;
        }else{
            return false;
        }

    }else if (el1.type == 'inline'){
        if (el1.script == el2.script ){
            return true;
        }else{
            return false;
        }
    }else if (el1.type == 'event_handler'){

        if (el1.hash == el2.hash){
            return true;

        }else{
            return false;
        }
    }else{
        return false;
    }


}


const find_content_by_target = async (list, el, tar) => {

    let ms = 0;//most similar
    // let ms_index = '-1';
    let last_tar = '';
    let indexs = [ACTIVE_ELEMENT_NOT_FOUND];

    if (list.length > 0 && tar != undefined ){


        for (let i=0; i < list.length; i++){

            let x  = list[i];

            if (x.type == el.type){
                

                let ctrl = await compare_element_attributes(el, x);

                if (ctrl){

                    let c;
                    if (x.target.length > tar.length){
                        c = await find_common_points_in_targets(tar, x.target);
                    }else{
                        c = await find_common_points_in_targets(x.target, tar);

                    }
                    
                    //TODO this needs to be tested better, c > ms should be more correct here 
                    if (c >= ms){
                        ms = c;
                        // last_tar = x.target;
                        // ms_index = i;
                        indexs.push(i);

                        let y = list[i+1];
                            if (y && y.type == 'event_handler'){
                                if (y.target.length > tar.length){
                                    c = await find_common_points_in_targets(tar, y.length);
                                }else{
                                    c = await find_common_points_in_targets(y.target, tar);
                                }

                                if (ms == c){
                                    indexs.push(i+1);i++;
                                }
                                
                            }
                        
                    }

                }
            }


            if (i == list.length-1){
                return indexs;
            }

        }

    }else{
        return indexs;//the element couldn't be found in the list
    }
    return indexs;

}

const find_item_in_manifest_by_type = async (manL, el) => {

    if (manL != undefined && manL.length > 0){

        for (let i = 0; i < manL.length; i++){
            let man = manL[i];

            if (man.dynamic ){
                if (man.type == el.type){
                    let attr = await compare_element_attributes(man, el);
                    if (attr){
                        return i;
                    }
                }

            }

            if (i == manL.length -1 ){
                return ACTIVE_ELEMENT_NOT_FOUND;
            }

        }

    }else{
        return ACTIVE_ELEMENT_NOT_FOUND;
    }


}




var sendMetaLinkFrame = (frontend_id, sxgLink) => {

    if(!linkSend2Extension){
        chrome.runtime.sendMessage({
              action: evLabels.FRAME_ACCJS_LINK_META,
              frontend_id: frontend_id,
              data: sxgLink
        });
        linkSend2Extension = true;
    }
}

var sendMetaLinkMain = ( frontend_id, sxgLink) => {

    if(!linkSend2Extension){
        chrome.runtime.sendMessage({
              action: evLabels.ACCJS_LINK_META,
              frontend_id: frontend_id,
              data: sxgLink
        });
        linkSend2Extension = true;
    }
}


var sendMetaLink = (frontend_id, sxgLink) => {
        if (sxgLink != undefined){

            if (window != top ){

                if ( frontend_id == DEFAULT_FRONTEND_ID){



                      let sendMetaLinkEventHandler = (e) => {

                            setTimeout(function(){
                                self.removeEventListener(evLabels.FRONT_END_ID_ASSIGNED, sendMetaLinkEventHandler, false);
                            }, 1000);
                            sendMetaLinkFrame(frontend_id, sxgLink);

                            self.removeEventListener(evLabels.FRONT_END_ID_ASSIGNED, sendMetaLinkEventHandler, false);
                      }

                      self.addEventListener(evLabels.FRONT_END_ID_ASSIGNED, sendMetaLinkEventHandler);

                }else{
                    sendMetaLinkFrame(frontend_id, sxgLink);

                }
            
            }else{
                sendMetaLinkMain( frontend_id, sxgLink);
            }

        }
}


function arrayEquality(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}