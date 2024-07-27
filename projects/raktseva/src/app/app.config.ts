// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { getFunctions, provideFunctions } from '@angular/fire/functions';
// import { getMessaging, provideMessaging } from '@angular/fire/messaging';
// import { getStorage, provideStorage } from '@angular/fire/storage';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"raktaseva-16678","appId":"1:1010858944762:web:109d3b21d1114cbb728143","storageBucket":"raktaseva-16678.appspot.com","apiKey":"AIzaSyCz7c7inxVujTM4k3CYrWRUh7E0L259Eks","authDomain":"raktaseva-16678.firebaseapp.com","messagingSenderId":"1010858944762","measurementId":"G-4CRPLYLDP7"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage())]
// };

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "raktaseva-16678",
      appId: "1:1010858944762:web:109d3b21d1114cbb728143",
      storageBucket: "raktaseva-16678.appspot.com",
      apiKey: "AIzaSyCz7c7inxVujTM4k3CYrWRUh7E0L259Eks",
      authDomain: "raktaseva-16678.firebaseapp.com",
      messagingSenderId: "1010858944762",
      measurementId: "G-4CRPLYLDP7"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage())
  ]
};
