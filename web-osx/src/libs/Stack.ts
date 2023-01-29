export interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
    moveToTop(item: T): void;
    getIndexOf(item: T): number;
}

export default class Stack<T> implements IStack<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    push(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Stack has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
  
    pop(): T | undefined {
      return this.storage.pop();
    }
  
    peek(): T | undefined {
      return this.storage[this.size() - 1];
    }
  
    size(): number {
      return this.storage.length;
    }

    moveToTop(item: T): void {
        const index = this.storage.indexOf(item);
        if (index > -1) {
            // remove item from array
            this.storage.splice(index, 1);
            // add item to the end of the array
            this.storage.push(item);
        }
    }

    getIndexOf(item: T) : number {
        for (let i : number = 0; i < this.storage.length; i++) {
            if (this.storage[i] === item) {
                return i;
            }
        }
        return -1;
    }
}