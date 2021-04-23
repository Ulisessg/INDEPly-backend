import testData from './testData';

class Store {
  uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  getAll(): Array<any> {
    return testData;
  }

  insert(info: any): void {
    testData.push(info);
  }
}

export default Store;
