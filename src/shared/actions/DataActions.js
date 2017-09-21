import { action } from 'mobx';

import dataStore from '../stores/DataStore';
import getAPI from '../util/getApi';
import postAPI from '../util/postApi';

class DataActions {
  constructor(){
  }

  @action action(param) {
    console.log(param);
  }

  @action getImagesByUuid(uuid) {
    dataStore.getting = true;
    dataStore.images = [];

    return getAPI(`get/${uuid}`).then(response => {
      dataStore.images = response;
      dataStore.getting = false;
    });
  }

  @action postToGetImagesByBody(body) {
    dataStore.getting = true;
    dataStore.images = [];

    const jsonToSend = {
      body
    }

    return postAPI(`post`, jsonToSend).then(response => {
      dataStore.images = response;
      dataStore.getting = false;
    })
  }
}

export default new DataActions;
