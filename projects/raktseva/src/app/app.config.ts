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
import { Amplify } from 'aws-amplify';
const awsconfig = {
  "aws_project_region": "ap-south-1",
  "aws_cognito_identity_pool_id": "ap-south-1:8e199763-4be9-4fd4-97bb-ccf4d869460d",
  "aws_cognito_region": "ap-south-1",
  "aws_user_pools_id": "ap-south-1_clsqkrHC8",
  "aws_user_pools_web_client_id": "5iohnb47ust0jjchi3tv3ck1hn",
  "oauth": {},
  "aws_cognito_username_attributes": [
      "PHONE_NUMBER"
  ],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "PHONE_NUMBER"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ]
};
Amplify.configure(awsconfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'raktaseva-16678',
        appId: '1:1010858944762:web:109d3b21d1114cbb728143',
        storageBucket: 'raktaseva-16678.appspot.com',
        apiKey: 'AIzaSyCz7c7inxVujTM4k3CYrWRUh7E0L259Eks',
        authDomain: 'raktaseva-16678.firebaseapp.com',
        messagingSenderId: '1010858944762',
        measurementId: 'G-4CRPLYLDP7',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
  ],
};
