class Queue {
    constructor() {
        this.items = []
    }

    enqueue(element) {
        this.items.push(element)
    }

    dequeue() {
        return this.isEmpty() ? "Queue is empty" : this.items.shift();
    }

    peek() {
        return this.isEmpty() ? "Queue is empty" : this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    print() {
        console.log(this.items.join(" -> "))
    }
}

// Example
const queue = new Queue();
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3);
queue.print();
console.log(queue.dequeue());
console.log(queue.peek()); 
console.log(queue.size());

// https://www.geeksforgeeks.org/javascript/implementation-queue-javascript/