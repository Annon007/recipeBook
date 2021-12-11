import { TIMEOUT_SEC } from './configuration.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const GET_URL = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // console.log(res, data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const SEND_URL= async function(url,uploadData){
  try{
    const sendUrl=fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(uploadData)
    })
    const res =await Promise.race([sendUrl,timeout(TIMEOUT_SEC)]);
    const data= await res.json();

    if(!res.ok) throw new Error(`${data.message} (${res.status})`)
    return data;
  }catch(err){
    throw err;
  }
}
//
