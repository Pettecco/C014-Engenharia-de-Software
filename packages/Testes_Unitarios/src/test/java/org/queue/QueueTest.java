package org.queue;

import org.junit.jupiter.api.Test;

import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

public class QueueTest {

    @Test
    public void testEmptyQueue() {
        Queue<Integer> intergerQueue = new Queue<Integer>();
        boolean isEmpty = intergerQueue.isQueueEmpty();
        assertTrue(isEmpty);
    }

    @Test
    public void testEnqueue() {
        Queue<Integer> integerQueue = new Queue<Integer>();
        integerQueue.enqueue(20);
        int length = integerQueue.size();

        assertEquals(1, length);
    }

    @Test()
    public void testDequeueEmptyQueue() {
        Queue<Integer> integerQueue = new Queue<>();
        assertThrows(NoSuchElementException.class, integerQueue::dequeue);
    }

    @Test()
    public void testDequeue() {
        Queue<Integer> integerQueue = new Queue<>();
        integerQueue.enqueue(2);
        assertEquals(1, integerQueue.size());
        integerQueue.dequeue();
        assertEquals(0, integerQueue.size());
    }

    @Test()
    public void testQueueTop() {
        Queue<Integer> integerQueue = new Queue<>();
        assertNull(integerQueue.top());
        integerQueue.enqueue(23);
        assertEquals(23, integerQueue.top());
        assertEquals(1, integerQueue.size());
    }

}
