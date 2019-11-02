package com.musicapp.domain;

/**
 * Доменное событие
 *
 * @author evgeniycheban
 */
public class DomainEvent<T> {

    private final T subject;
    private final DomainEventType type;

    /**
     * @param subject - предмет доменного события
     * @param type    - тип доменного события
     */
    public DomainEvent(T subject, DomainEventType type) {
        this.subject = subject;
        this.type = type;
    }

    /**
     * @return предмет доменного события
     */
    public T getSubject() {
        return subject;
    }

    /**
     * @return тип доменного события
     */
    public DomainEventType getType() {
        return type;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        return "DomainEvent{" +
                "subject=" + subject +
                ", type=" + type +
                '}';
    }

}
