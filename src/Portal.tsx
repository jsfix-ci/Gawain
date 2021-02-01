import { createPortal } from "react-dom";
import React, { useEffect, useRef } from "react";

interface PortalProps {
  children?: React.ReactElement;
  getContainer: () => HTMLElement;
}

export default function Portal(props: PortalProps) {
  const { getContainer, children } = props;

  const containerRef = useRef<HTMLElement>();
  const hasInit = useRef(false);
  if (!hasInit.current) {
    containerRef.current = getContainer();
    hasInit.current = true;
  }

  useEffect(() => {
    return () => {
      containerRef.current?.parentNode?.removeChild(containerRef.current);
    };
  }, []);

  return containerRef.current
    ? createPortal(children, containerRef.current)
    : null;
}
