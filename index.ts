import { initializeApp, FirebaseApp } from '@firebase/app';

import { FirebaseConfig } from './types/FirebaseConfig';

interface Service {
  initialize(app: FirebaseApp): void;
}

class Core {
  private static _instance: Core;
  private static _app?: FirebaseApp;

  public static initialize(firebaseConfig: FirebaseConfig) {
    this._app = initializeApp(firebaseConfig);
  }

  public static initializeService(service: Service) {
    if (!this._app) {
      throw new Error('Firebase App is not initialized');
    }
    service.initialize(this._app);
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }
}

export default Core;
