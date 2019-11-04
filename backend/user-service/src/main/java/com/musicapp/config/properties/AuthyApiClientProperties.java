package com.musicapp.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Параметры конфигурации Authy клиента.
 *
 * @author evgeniycheban
 */
@ConfigurationProperties("authy")
@Data
public class AuthyApiClientProperties {

    private String apiKey;

}
