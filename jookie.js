/*
* SIMPLE SCRIPT TO TRACK PAGES UNTIL TERMINATED BY ELEMENT EVENT
* BY ANDRES O. SERANO TWITTER: O_SERRANOP
* WORK IN PROGRESS..
*/
(function() {

    var JsonCookie = {
	  
	  //constructor	
      init: function(name, elem) {
      	this.cookieName = name;
      	this.gat = elem; //element to cause array join thus far
        this.bigEnchilada(); 
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

      deleteCookie: function() {
		document.cookie = this.cookieName + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
	  },
      
      mainCookie: function() {
        return JSON.parse($.cookie(this.cookieName));
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

        bindEvents: function(event) {
        	this.gat.on("click", ".shpSCtrack-scAdd", $.proxy(function() {
            var sku = s.products;// TODO : remove amd clean
        	  var arr = JsonCookie.mainCookie(); 	
        	  var newArr = arr.pathArr.join() + " " + sku;
        	  return newArr;
        	  console.log(newArr); 
        	  
        	}, this));
        }  
      
    
      };//end prototype
  
	  JsonCookie.init("testest", $("#sr-products") );//switch out with your cookie name and element
	  JsonCookie.bindEvents();//returns array of pages when triggered


})();
