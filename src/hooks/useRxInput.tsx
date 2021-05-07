/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Rx from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { debounceTime, takeUntil, filter, map, mergeMap } from "rxjs/operators";

export default function useRxInput(
  inputNode: HTMLElement
): [
  Rx.Observable<string>,
  Rx.Observable<boolean>,
  (value: string) => Rx.Observable<any>,
  () => void
] {
  const stop$ = new Rx.Subject<void>();

  const debouncedEvent = Rx.fromEvent<InputEvent>(inputNode, "input").pipe(
    takeUntil(stop$),
    debounceTime(500),
    map((e) => (e.target as HTMLInputElement).value)
  );

  const valid$ = debouncedEvent.pipe(
    filter((v) => v.length <= 5 && v.length !== 0)
  );

  const invalid$ = debouncedEvent.pipe(
    filter((v) => v.length > 5 || v.length === 0),
    map((v) => v.length === 0)
  );

  const data$ = (value: string) =>
    fromFetch(`http://localhost:3000/city?title=${value}`).pipe(
      mergeMap((res) => res.json()),
      takeUntil(invalid$)
    );

  function stop() {
    stop$.next();
    stop$.complete();
  }

  return [valid$, invalid$, data$, stop];
}
