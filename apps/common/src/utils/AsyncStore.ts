// request-store.ts
import { AsyncLocalStorage } from 'async_hooks';

export const AsyncStore = new AsyncLocalStorage<Map<string, any>>();

export const setLoginUser = (user:any)=>{
  const userContext = new Map<string, any>();
  //@ts-ignore
  userContext.set('user', user);
  //todo
}

export const getLoginUser = ()=>{
  const userContext = AsyncStore.getStore();
  return userContext ? userContext.get('user') : null;
}

