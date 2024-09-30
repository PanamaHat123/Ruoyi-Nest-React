import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError,map } from "rxjs";
import {  AsyncStore } from "apps/common/src/utils/AsyncStore";

@Injectable()
export class AsyncLocalStorageInterceptor implements NestInterceptor {
  private count:number= 10000;
  // intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const store = new Map<string, any>();
    //@ts-ignore
    store.set('user', req?.user?.user);
    store.set('contextId', this.getCount());
    return Observable.create(observer => {
      AsyncStore.run(store, () => {
        const subscription = next.handle().subscribe({
          next: (data) => {
            // const store3 = AsyncStore.getStore();
            observer.next(data);
          },
          error: (error) => {
            const store2 = AsyncStore.getStore();
            // continue store context
            error._store_ = store
            observer.error(error);
          },
          complete: () => {
            observer.complete();
          },
        });
        return () => {
          subscription.unsubscribe();
        };
      })
    })
    // return new Promise(resolve=>{
    //   AsyncStore.run(store, () => {
    //     // resolve(next.handle())
    //     resolve(next.handle().pipe(
    //       catchError(error => {
    //         // 在这里可以访问到 AsyncLocalStorage 的数据
    //         const store2 = AsyncStore.getStore();
    //         // 处理错误，例如记录日志
    //         return throwError(error);
    //       }),
    //       map(data=>{
    //         const store3 = AsyncStore.getStore();
    //         return data
    //       })
    //     ))
    //   });
    // })

  }

  private getCount(){
    if(this.count==Number.MAX_SAFE_INTEGER){
      this.count = 10000;
    }
    return this.count++
  }

}