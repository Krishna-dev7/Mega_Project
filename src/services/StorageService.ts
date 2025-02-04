

class StorageProvider {
  private storageLocation;

  constructor() {
    this.storageLocation = "";
  }

  async storeContent() {}
  async imagePreview() {}
  async retrieveContent() {}
  async deleteContent() {}
}


const storage = new StorageProvider();
export default storage;