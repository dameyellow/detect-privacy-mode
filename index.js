/**
 * Inspired by
 * cou929's gist  https://gist.github.com/cou929/7973956
 * https://stackoverflow.com/questions/45721156/how-to-detect-private-browsing-in-ios-11-mobile-safari-or-macos-high-sierra-safa
 */
'use strict';

function detectInChrome( resolve, reject, callback ){
  window.webkitRequestFileSystem(
    window.TEMPORARY, 1,
    () => {
      callback( false );
      resolve( false );
    },
    (e) => {
      callback( true );
      resolve( true );
    }
  );
}

function detectInFirefox( resolve, reject, callback ){
  var db;
  try {
    db = window.indexedDB.open('test');
  } catch (e) {
    callback( true );
    resolve( true );
  }
  db.onerror = ()=>{
    callback( true );
    resolve( true );
  };
  db.onsuccess = ()=>{
    callback( false );
    resolve( false );
  };
}


function detectInIEAndEdge( resolve, reject, callback ){
  var is_private;

  try {
    if (!window.indexedDB) {
      is_private = true;
      setTimeout(()=>{
        callback( true );
        resolve( true );
      },0);
    }
  } catch (e) {
    is_private = true;
    setTimeout(()=>{
      callback( true );
      resolve( true );
    },0);
  }

  if (typeof is_private === 'undefined'){
    setTimeout(()=>{
      callback( false );
      resolve( false );
    },0);
  }
}


function detectInSafari( resolve, reject, callback ){
  var is_private;
  try {
    window.localStorage.setItem('test', 1);
  } catch (e) {
    is_private = true;
    callback( true );
    resolve( true );
  }
  // iOS >= 11
  try {
    window.openDatabase(null, null, null, null);
  } catch (e) {
    is_private = true;
    callback( true );
    resolve( true );
  }

  if (typeof is_private === 'undefined') {
    window.localStorage.removeItem('test');
    callback( false );
    resolve( false );
  }
}

module.exports = function(callback){
  var ua = window.navigator.userAgent,
      ua_lc = ua.toLowerCase();

  callback = callback || function(){};

  return new Promise( (resolve,reject) => {
    // @Chrome
    if (window.webkitRequestFileSystem)
    {
      detectInChrome(resolve,reject,callback);
    }
    // @Firefox
    else if( window.indexedDB && /Firefox/.test(ua) ){
      detectInFirefox(resolve,reject,callback);
    }
    // @Internet Explorer / Edge
    else if( /msie|trident/i.test(ua_lc) || /edge/i.test(ua_lc) )
    {
      detectInIEAndEdge(resolve,reject,callback);
    }
    // @Safari
    else if( window.localStorage && /Safari/.test(ua) ){
      detectInSafari( resolve, reject, callback );
    }

  });
};