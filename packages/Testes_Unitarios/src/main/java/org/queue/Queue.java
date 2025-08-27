package org.queue;

import java.util.ArrayList;
import java.util.NoSuchElementException;

public class Queue<T> {
    private final ArrayList<T> elements;
    private int length = 0;

    public Queue(){
        this.elements = new ArrayList<>();
    }

    public int size(){
        return length;
    }

    public boolean isQueueEmpty() {
        return (length == 0);
    }

    public void enqueue(T elem){
        elements.add(elem);
        length++;
    }

    public T dequeue(){
        if(isQueueEmpty()){
            throw new NoSuchElementException("Fila vazia");
        }
        length--;
        return elements.removeFirst();
    }

    public T top() {
        if (isQueueEmpty()) {
            return null;
        }
        return elements.getFirst();
    }
}
