package com.musicapp.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Параметры конфигурации сервиса для работы с jwt.
 *
 * @author evgeniycheban
 */
@ConfigurationProperties("token")
@Data
public class TokenServiceProperties {

    private String secret;

    private Long expiration;

}
