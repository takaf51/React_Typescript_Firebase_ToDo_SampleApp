import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { FirebaseError } from 'firebase/app';

export const useLogin = (): [
  (email: string, password: string) => Promise<UserCredential | undefined>,
  FirebaseError | null, boolean
] => {
  const [error, setError] = useState<FirebaseError | null>(null);
  const [isPending, setIsPennding] = useState(false);

  async function login(email: string, password: string): Promise<UserCredential | undefined> {
    setError(null);
    setIsPennding(true);
    try {
      const authRes: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!authRes)
        throw new Error("Auth Error: login process couldn't complete");
      //const token = await authRes.user.getIdToken();
      setIsPennding(false);
      return authRes;
    } catch (err: any) {
      console.log(`error code: ${err.code}, error message: ${err.message}`);
      setError(err);
    } finally {
      setIsPennding(false);
    }
  }
  return [login, error, isPending];
};