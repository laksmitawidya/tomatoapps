
// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'
// our "constructor"
const create = (baseURL = AppConfig.baseURL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Accept' : 'application/json',
      'user-key': AppConfig.token
    },
    // 10 second timeout...
    timeout: 10000
  })

 
  const callApi=(path, type, body)=>{
      var bodyJson={}
      if(type !=='GET'){
          bodyJson = JSON.parse(body)
      }
      if(type ==='POST'){
          return api.post(path, bodyJson)
      } else if(type==='PUT'){
          return api.put(path, bodyJson)
      } else if(type==='DELETE'){
          return api.delete(path, bodyJson)
      } else {
          api.setHeaders({
            'Accept': 'application/json',
            'user-key': AppConfig.token
          })
          if(path.includes('nearest_properties')){
              api.timeout=60000
          }else{
              api.timeout=30000
          } 
          return api.get(path)
      }
  }
  return {
      callApi
  }
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  //const getUser = (username) => api.get('search/users', {q: username})

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  
}

// let's return back our create method as the default.
export default {
  create
}
