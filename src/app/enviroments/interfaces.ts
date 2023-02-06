
export interface Enviroment {
  production: boolean
  firebase: {
    fbDb: string
    firebaseLink: string
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
}

export interface User {
  // email: string
  // password: string
  // uid?: string
  // returnSecureToken?: boolean

  uid?: string,
  email?: string,
  password?: string,
  returnSecureToken?: boolean,
  displayName?: string,
  photoURL?: string,
  emailVerified?: string,
}

export interface fbLoginResponse {
  idToken: string
  expiresIn: string

}

export interface Task {
  title: string
  description: string
  id?: string
  isComplete: boolean,
  timeToDo: TimeToDo
}

export interface fbDbResponse {
  name: string
  title: string
  description: string
  completed: false

}

export type TimeToDo = 'fast' | 'medium' | 'slow'


