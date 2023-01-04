window.addEventListener('message', function(event) {

          var link = event.data.link;
          var rnd = event.data.rnd;



          let sxgInfoEventHandler = (e) => {
              let manifest = e.detail;

              event.source.postMessage({'result': manifest, 'rnd' : rnd  }, event.origin);

              self.removeEventListener(`${evLabels.SXG_ASSIGNED}_${rnd}`, sxgInfoEventHandler, false);
          }

          self.addEventListener(`${evLabels.SXG_ASSIGNED}_${rnd}`, sxgInfoEventHandler);

          window.verifySignature(link, rnd);

        });