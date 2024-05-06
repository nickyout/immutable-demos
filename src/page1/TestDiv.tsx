import { ComponentProps, memo, useEffect, useRef } from "react";
import { log } from "../log";

export function TestDiv(props: ComponentProps<"div">) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    const { target, attributeName } = mutation;
                    const element = target as Element;
                    if (attributeName) {
                        const newValue = element.getAttribute(attributeName);
                        log(`Updated DOM: '${element.id}' changed attribute '${attributeName}' to ${JSON.stringify(newValue)}`);
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
    }, []);
    useEffect(() => log(`rendered Component '${props.id}'`), [props]);
    return (
        <div ref={ref} {...props}/>
    )
};

export const PureTestDiv = memo(TestDiv);