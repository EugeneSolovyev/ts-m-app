package com.musicapp.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Параметры конфигурации authy клиента
 *
 * @author evgeniycheban
 */
@ConfigurationProperties("authy")
@Data
public class AuthyApiClientProperties {

    /**
     * api ключ
     */
    private String apiKey;

}
