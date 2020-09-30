export interface ICell {
    color: string,
    piece: IPiece|null,
    possibleDestination: boolean,
    anCoords: string,
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
    columnIndex: number,
    rowIndex: number,
}

export interface IMove {
    startPosition: ICellPosition,
    endPosition: ICellPosition,
}
