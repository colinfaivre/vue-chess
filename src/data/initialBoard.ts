import {
    ICell,
    IPiece,
} from '@/types';

let boardMap: string[] = [
    'rnbqkbnr',
    'pppppppp',
    '........',
    '........',
    '........',
    '........',
    'PPPPPPPP',
    'RNBQKBNR',
];

function boardParser(map: string[]): string[][] {
    const parsedBoardMap: string[][] = [];

    for (let lineIndex = 0; lineIndex < 8; lineIndex++) {
        const row: string[] = [];
        for (let characterIndex = 7; characterIndex >= 0; characterIndex--) {
            row.push(map[characterIndex][lineIndex]);
        }
        parsedBoardMap.push(row);
    }

    return parsedBoardMap;
}

function getCellColor(columnIndex: number, rowIndex: number): string {
    return (columnIndex + rowIndex) % 2 === 0 ? 'black' : 'white';
}

function getPositionName(columnIndex: number, rowIndex: number) {
    const columnName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][columnIndex];
    const rowName = (rowIndex + 1).toString();

    return columnName + rowName;
}

function getPieceColor(pieceCharacter: string): string {
    return pieceCharacter == pieceCharacter.toUpperCase() ? 'white' : 'black';
}

function getPieceType(pieceCharacter: string): string {
    switch (pieceCharacter.toLowerCase()) {
        case 'r':
            return 'rook';
        case 'n':
            return 'knight';
        case 'b':
            return 'bishop';
        case 'q':
            return 'queen';
        case 'k':
            return 'king';
        case 'p':
            return 'pawn';
        default:
            return 'error'
    }
}

function getPiece(pieceCharacter: string): IPiece {
    return {
        color: getPieceColor(pieceCharacter),
        type: getPieceType(pieceCharacter),
        selected: false,
    };
}


function boardFeeder(board: string[][]): ICell[][] {
    const finalBoard: ICell[][] = [];

    for (const [columnIndex, columnValue] of board.entries()) {
        const column: ICell[] = [];
        for (const [rowIndex, rowValue] of columnValue.entries()) {
            const cell: ICell = {
                anCoords: getPositionName(columnIndex, rowIndex),
                piece: rowValue === '.' ? null : getPiece(rowValue),
                color: getCellColor(columnIndex, rowIndex),
                possibleDestination: false,
            };
            column.push(cell);
        };
        finalBoard.push(column);
    }

    return finalBoard;
}

const initialBoard = boardFeeder(boardParser(boardMap));

export default initialBoard;
