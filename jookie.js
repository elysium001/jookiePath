/*
* SIMPLE SCRIPT TO TRACK PAGES UNTIL TERMINATED BY ELEMENT EVENT
* BY ANDRES O. SERANO TWITTER: O_SERRANOP
* WORK IN PROGRESS..
*/
(function() {

  var JsonCookie = {

  //constructor	
  init: function(name, elem, expires) {
    this.cookieName = name;
    this.gat = elem; //element to cause array join thus far
    this.bindEvents(expires, name);//returns array of pages when triggered
    this.bigEnchilada();// checks if cookie exists or creates one 
    
  },

  hasCookie: function() {
    if(!$.cookie(this.cookieName)) {
      return false;
    console.log("Cookie not found.");
    }else {
      return true;
      console.log("success!");
    }   
  },

  //thing to append to json object
  //can be any thing really
  trail: function() {
    return s.prop1 + ": " + window.location.pathname.replace("/", "") + " > ";  	
  },

  saveCookie: function(cookieObject) {
    $.cookie(this.cookieName, JSON.stringify(cookieObject));
  },

  deleteCookie: function(expires, cookieName) {
    if(expires){
      window.onbeforeunload = function(){
        console.log(expires + " cookie deleted");
        document.cookie = cookieName + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
      }
    }
  },

  mainCookie: function() {
    return JSON.parse($.cookie(this.cookieName));
  },

  skuCookie: function(skuCoo) {
    return console.log(skuCoo);
  },

  appendNewLocation: function() { 
    var cTrail = JSON.parse($.cookie(this.cookieName)); 
    var trail = s.prop1 + ": " + window.location.pathname.replace("/", "") + " > ";
    cTrail.pathArr.push(trail); 
    JsonCookie.saveCookie(cTrail); 
  },

  //checks for existing cookie to append current page info to (trail)
  //or creates new cookie!
  bigEnchilada: function() {
    if(JsonCookie.hasCookie()) {

      JsonCookie.appendNewLocation();
      console.log("hasCookie!");
      console.log(JSON.parse($.cookie(this.cookieName)));

    }else {

      var pCookie = {};//JSON object and then saved as cookie
      pCookie.pathArr = [];
      pCookie.pathArr.push(JsonCookie.trail());
      JsonCookie.saveCookie(pCookie);
      console.log(JSON.parse($.cookie(this.cookieName)));

    }
  },

  bindEvents: function(expires, name) {
    this.gat.on("click", ".shpSCtrack-scAdd", $.proxy(function() {
      var sku = s.products;// TODO : remove amd clean
      var arr = JsonCookie.mainCookie(); 	
      var newArr = arr.pathArr.join() + " " + sku;
      JsonCookie.skuCookie(newArr);
      JsonCookie.deleteCookie(expires, name);
    }, this));
  }  


  };//end prototype

  //switch out with your cookie name and element that is to
  //terminate cookie and join page array	
  // pass in name of cookie, name of element to trigger event to console.log pages up to it, true if you want cookie to delete after event
  JsonCookie.init("testest", $("#sr-products"), true );



})();