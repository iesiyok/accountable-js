//inspired from
//https://www.talkinghightech.com/en/creating-a-js-lock-for-a-resource/

class Lock {
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
      tabInfo = tabMap.get(tabId);
      tabInfo.results_buffer = this;
      tabMap.set(tabId, tabInfo);
      setTimeout( cb, 1); 

    } else {
      this.counter++;
      tabInfo = tabMap.get(tabId);
      tabInfo.results_buffer = this;
      tabMap.set(tabId, tabInfo);
    }
  }
}


class GenManLock {
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
      tabInfo = tabMap.get(tabId);
      tabInfo.generate_buffer = this;
      tabMap.set(tabId, tabInfo);
      setTimeout( cb, 1); 

    } else {
      this.counter++;
      tabInfo = tabMap.get(tabId);
      tabInfo.generate_buffer = this;
      tabMap.set(tabId, tabInfo);
    }
  }
}
