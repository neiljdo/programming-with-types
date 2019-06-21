namespace IncompatibleTypes {

class Either<TLeft, TRight> {
    private readonly value: TLeft | TRight;
    private readonly left: boolean;

    private constructor(value: TLeft | TRight, left: boolean) {
        this.value = value;
        this.left = left;
    }

    isLeft(): boolean {
        return this.left;
    }

    getLeft(): TLeft {
        if (!this.isLeft()) throw new Error();

        return <TLeft>this.value;
    }

    isRight(): boolean {
        return !this.left;
    }

    getRight(): TRight {
        if (this.isRight()) throw new Error();

        return <TRight>this.value;
    }

    static makeLeft<TLeft, TRight>(value: TLeft) {
        return new Either<TLeft, TRight>(value, true);
    }

    static makeRight<TLeft, TRight>(value: TRight) {
        return new Either<TLeft, TRight>(value, false);
    }
}

namespace Either {
    export function map<TLeft, TRight, URight>(
        value: Either<TLeft, TRight>, 
        func: (value: TRight) => URight): Either<TLeft, URight> {
        if (value.isLeft()) return Either.makeLeft(value.getLeft());

        return Either.makeRight(func(value.getRight()));
    }
}

class FileHandle { }

class Cat { }

declare function openFile(path: string): Either<Error, FileHandle>;

declare function readFile(handle: FileHandle): Either<Error, string>;

function readCatFromFile(path: string): Either<Error, Cat> {
    let handle: Either<Error, FileHandle> = openFile(path);

    // let content: Either<Error, string> = Either.map(handle, readFile);
    // Uncomment to see compiler error

    /* ... */

    // Implementation omitted, returning dummy value 
    return Either.makeRight(new Cat());
}

}