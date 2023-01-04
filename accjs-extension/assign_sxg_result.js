function assignSXGResult(sxgResult, rnd){

      
      let url = sxgResult.url;
      let error = sxgResult.error;
      let payload = sxgResult.payload;

      if (error == ''){
          try{

              let p = JSON.parse(payload);
              console.log('SXG fetched:', p );
              var event = new CustomEvent(`${evLabels.SXG_ASSIGNED}_${rnd}`, { "detail": {'sxgUrl': url, 'url': p.url ,'response': true, 'manifest': p, 'error': error } });
              self.dispatchEvent(event);

          }catch (e){
              console.log(`An error occured in manifest json parse :: ${e}`);
          }
          

      }else{
          console.log('SXG fetch error:', error);
          var event = new CustomEvent(`${evLabels.SXG_ASSIGNED}_${rnd}`, { "detail": {'sxgUrl': url, 'response': false, 'manifest': '', 'error': error } });
          self.dispatchEvent(event);
      }

      
      
  }