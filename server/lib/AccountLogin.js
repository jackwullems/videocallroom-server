import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Card } from 'react-bootstrap'
import { 

  accountSelector
   } from './redux/selectors'






// function AccountLogin({ peerSrc, localSrc, config, 
//   mediaDevice, status, endCallRTC, 
//   dispatch, platform, account, callId}) {

 // const dispatch = useDispatch()
 
 // const platform= platformSelector

 // const call=  myOpenCallSelector

 // const account = accountSelector
 const users = {};

// Random ID until the ID is not in use
// async function randomID() {
//   let id = haiku();
//   while (id in users) {
//     await Promise.delay(5);
//     id = haiku();
//   }
//   return id;
// }

exports.create = async (socket,account) => {
  const id = account;
  users[id] = {
    clientId: id,
    socket
  }
  return id;
};

exports.get = id => users[id];
exports.getAll = () => users;

exports.remove = id => delete users[id];

      

    
 
  /**
   * Turn on/off a media device
   * @param {String} deviceType - Type of the device eg: Video, Audio
   */

   // myOutgoingCalls.map((call) => {return call })

 


const mapping = (state, props) => ({
 
 // to: hay que crear el selector del otro usuario
 
 account: accountSelector(state, props),
 
 
})


export default connect(mapping)(AccountLogin);