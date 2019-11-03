package com.musicapp.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Параметры конфигурации сервиса для работы с jwt
 *
 * @author evgeniycheban
 */
@ConfigurationProperties("token")
@Data
public class TokenServiceProperties {

    /**
     * jwt ключ
     */
    private String secret;

    /**
     * срок действия jwt
     */
    private Long expiration;

}
