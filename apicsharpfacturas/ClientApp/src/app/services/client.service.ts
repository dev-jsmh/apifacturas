import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../env';
import { ClientEntity } from '../models/ClientEntity';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // inject dependencies
  constructor(private http: HttpClient) { }

  // ============ get all  ==========
  getAll() {
    return this.http.get(apiUrl + '/Clients');
  }

  // ========== get by id  ==========
  getById(id: string) {
    return this.http.get(apiUrl + '/Clients/' + id);
  }

  // ========== post  ==========
  post(newClient: ClientEntity) {
    return this.http.post(apiUrl + '/Clients', newClient);
  }

  // ========== post  ==========
  update(id: string, clientMod: ClientEntity) {
    return this.http.put(apiUrl + '/Clients/' + id, clientMod);
  };

  // ========== delete  ==========
  delete(id: string) {
    this.http.delete(apiUrl + '/Clients/' + id);
  }

}
