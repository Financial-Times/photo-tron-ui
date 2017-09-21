import { observable } from "mobx";

class DataStore {
  @observable loading = true;
  @observable data = [];

  isLoading() {
    return this.loading;
  }

  retrieveData() {
    return this.data;
  }
}

let store = new DataStore;

export default store;
