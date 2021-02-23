import {
    ICellPosition,
    IMove,
} from '@/store/modules/board/board';

// Converts a board position into an algebric notation position
export function getANCoords(cellPosition: ICellPosition): string {
    const file: string = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][cellPosition.columnIndex];
    const rank: string = (cellPosition.rowIndex + 1).toString();

    return file + rank;
}

// Converts an algebric notation position into a board position
export function getNormalCoords(anCoords: string): ICellPosition {

    const columnIndex = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].indexOf(anCoords[0]);
    const rowIndex = parseInt(anCoords[1]) - 1;

    return {
        columnIndex,
        rowIndex,
    };
}

// Converts an algebric notation move into an IMove
export function getMoveFromAN(anMove: string): IMove {
    const startPosition = getNormalCoords(anMove.substr(0, 2));
    const endPosition = getNormalCoords(anMove.substr(2, 2));

    return {
        startPosition,
        endPosition,
    }
}

export function destinationIsOnBoard(cellPosition: ICellPosition, columnMove: number, rowMove: number): boolean {
    const destinationCellIsInRow = cellPosition.rowIndex + rowMove >= 0 && cellPosition.rowIndex + rowMove <= 7;
    const destinationCellIsInColumn = cellPosition.columnIndex + columnMove >= 0 && cellPosition.columnIndex + columnMove <= 7;
    const result = destinationCellIsInColumn && destinationCellIsInRow;
    return result;
}
