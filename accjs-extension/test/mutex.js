//inspired from
//https://www.talkinghightech.com/en/creating-a-js-lock-for-a-resource/

const evl = require('./eval');

module.exports = class Lock {
  constructor(tab, counter) {
    this.tab = tab;
    this.counter = counter; 
    this.waiters = []; 

  }

  hold(cb) {
    if (this.counter > 0) { 
      this.counter--; 
      cb();  
    } else {
      this.waiters.push(cb); 
    }
  }

  release(tabId) { 
    if (this.waiters.length > 0) { 
      const cb = this.waiters.pop(); 
      tabInfo = evl.tabMap.get(tabId);
      tabInfo.results_buffer = this;
      evl.tabMap.set(tabId, tabInfo);
      setTimeout( cb, 1); 

    } else {
      this.counter++;
      tabInfo = evl.tabMap.get(tabId);
      tabInfo.results_buffer = this;
      evl.tabMap.set(tabId, tabInfo);
    }
  }
}

