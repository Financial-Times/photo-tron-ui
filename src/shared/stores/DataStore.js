import { observable } from "mobx";

class DataStore {
  @observable loading = true;
  @observable getting = false;
  @observable images = [];

  isLoading() {
    return this.loading;
  }

  isGetting() {
    return this.getting;
  }

  retrieveImages() {
    return this.images;
  }
}

let store = new DataStore;

export default store;
