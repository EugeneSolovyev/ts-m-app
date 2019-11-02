package com.musicapp.stream;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface UserStream {
    String OUTPUT = "user";

    @Output(OUTPUT)
    MessageChannel output();
}
