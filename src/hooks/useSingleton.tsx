import * as React from "react";

export default function useSingleton(callback: () => any) {
  const hasBeenCalled = React.useRef(false);
  if (hasBeenCalled.current) return;
  callback();
  hasBeenCalled.current = true;
}
