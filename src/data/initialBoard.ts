const initialBoard = [
    [
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'rook',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'rook',
                selected: false,
            },
        },
    ],
    [
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'knight',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'knight',
                selected: false,
            },
        },
    ],
    [
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'bishop',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'bishop',
                selected: false,
            },
        },
    ],
    [
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'queen',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'queen',
                selected: false,
            },
        },
    ],
    [
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'king',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'king',
                selected: false,
            },
        },
    ],
    [
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'bishop',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'bishop',
                selected: false,
            },
        },
    ],
    [
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'knight',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'knight',
                selected: false,
            },
        },
    ],
    [
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'rook',
                selected: false,
            },
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'white',
                type: 'pawn',
                selected: false,
            },
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: null,
        },
        {
            color: 'white',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'pawn',
                selected: false,
            }
        },
        {
            color: 'black',
            possibleDestination: false,
            piece: {
                color: 'black',
                type: 'rook',
                selected: false,
            }
        },
    ],
];

export default initialBoard;
