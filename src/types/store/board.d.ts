export interface ICell {
    color: string,
    piece: IPiece|null,
    possibleDestination: boolean,
}

export interface IPiece {
    color: string,
    type: string,
    selected: boolean,
}

export  interface IPath {
    from: ICellPosition,
    to: ICellPosition,
}

export interface ICellPosition {
    rowIndex: number,
    columnIndex: number,
}
