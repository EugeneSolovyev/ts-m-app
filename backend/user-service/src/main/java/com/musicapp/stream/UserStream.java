package com.musicapp.stream;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

/**
 * Интерфейс для взаимодействия с message broker.
 *
 * @author evgeniycheban
 */
public interface UserStream {

    String OUTPUT = "user";

    @Output(OUTPUT)
    MessageChannel output();

}
