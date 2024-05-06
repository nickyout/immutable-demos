import { ComponentProps, useEffect, useRef } from "react";
import { log } from "../log";
import { useAttributeMutationObserver } from "../utils/useAttributeMutationObserver";

/**
 * Div that logs renders and DOM attribute changes
 */
export function DivWithLogs(props: ComponentProps<"div">) {
    const ref = useRef<HTMLDivElement>(null);
    useAttributeMutationObserver(ref, ({ target, attributeName }) => {
        log(`Updated DOM: '${target.id}' changed attribute '${attributeName}' to ${JSON.stringify(target.getAttribute(attributeName))}`);
    });
    useEffect(() => log(`rendered Component '${props.id}'`), [props]);
    return (
        <div ref={ref} {...props}/>
    )
};
