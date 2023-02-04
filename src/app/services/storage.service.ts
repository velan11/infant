import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

export interface Item {
  id: number;
  token: string;
  value: string;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  setItems(item, val): Promise<Item[]> {
    return this.storage.set(item, val);
  }

  getItem(data): Promise<Item[]> {
    return this.storage.get(data);
  }

  deleteItem(data): Promise<Item[]> {
    return this.storage.remove(data);
  }

  clearStorage() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }
}
