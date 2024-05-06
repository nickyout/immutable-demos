import { CSSProperties, memo, useEffect, useState } from "react";
import { DivWithLogs } from "./DivWithLogs";
import { log } from "../log";

const pageStyle: CSSProperties = { display: 'flex', flexDirection: 'column', flex: 1, alignSelf: 'stretch' };
const formStyle: CSSProperties = { display: 'flex', flexDirection: 'column', padding: 8 };
const testDivContainerStyle: CSSProperties = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' };

/**
 * TestDiv, but memoized
 */
export const PureDivWithLogs = memo(DivWithLogs);

/**
 * Component to illustrate what triggers a re-render
 */
const Page1 = () => {
    const [color, setColor] = useState<CSSProperties['color']>('red');
    const [style, setStyle] = useState<CSSProperties>({ fontSize: '32px', color: 'red' });

    function onColorInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setColor(event.target.value);
        //style.color = event.target.value;
    }

    function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        setStyle({
            ...style,
            color
        });
        event.preventDefault();
    }

    useEffect(() => log('rendered Page'));

    return (
        <div style={pageStyle}>
            { /* form */ }
            <form onSubmit={onFormSubmit} style={formStyle}>
                <div style={{ paddingBottom: 8 }}>
                    <label>Color: </label>
                    <input value={color} onChange={onColorInputChange}/>
                </div>
                <button type="submit">Create new style object</button>
            </form>
            { /* test divs */ }
            <div style={testDivContainerStyle}>
                <DivWithLogs id="test div" style={style}>
                    Test div
                </DivWithLogs>
                <PureDivWithLogs id="pure test div" style={style}>
                    Pure test div
                </PureDivWithLogs>
            </div>
        </div>
    );
};

export default Page1;