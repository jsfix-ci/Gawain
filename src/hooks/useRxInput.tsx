/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Rx from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { debounceTime, takeUntil, map, switchMap } from "rxjs/operators";

export default function useRxInput(): [
  (source: Rx.Observable<InputEvent>) => Rx.Observable<string>,
  (value: string) => Rx.Observable<any>,
  () => void
] {
  const stop$ = new Rx.Subject<void>();

  const getDebounced$ = (source: Rx.Observable<InputEvent>) =>
    source.pipe(
      debounceTime(500),
      map((e) => (e.target as HTMLInputElement).value),
      takeUntil(stop$)
    );

  const data$ = (value: string) =>
    fromFetch(`http://localhost:3000/city?title=${value}`).pipe(
      switchMap((res) => {
        if (res.ok) return res.json();
        return Rx.throwError(() => new Error("could not fetch"));
      })
    );

  function stop() {
    stop$.next();
    stop$.complete();
  }

  return [getDebounced$, data$, stop];
}
