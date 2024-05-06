import { useEffect, useRef } from "react";

export function useAttributeMutationObserver(ref: React.RefObject<Element>, callback: (mutation: { target: Element; attributeName: string; }) => void) {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
    useEffect(() => {
        if (ref.current) {
            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    const attributeName = mutation.attributeName;
                    const element = mutation.target as Element;
                    if (attributeName) {
                        callbackRef.current({ target: element, attributeName });
                    }

                });
            });
            mutationObserver.observe(ref.current, {
                attributes: true
            });
            return () => {
                mutationObserver.disconnect();
            };
        }
    }, [ref]);
}
