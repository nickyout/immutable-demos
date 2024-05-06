export const INITIALIZE = "initialize";

export type InitializeAction = {
    type: typeof INITIALIZE,
    depth: number;
    size: number;
    color: string;
};

export const MODIFY_COLOR = "modify color";

export type ModifyColorAction = {
    type: typeof MODIFY_COLOR,
    color: string;
    address: number[];
}

export type Action = InitializeAction | ModifyColorAction;
