import { action } from 'mobx';

class DataActions {
  constructor(){
  }

  @action action(param) {
    console.log(param);
  }
}

export default new DataActions;
