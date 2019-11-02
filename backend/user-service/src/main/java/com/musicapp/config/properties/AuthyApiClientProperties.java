package com.musicapp.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Параметры конфигурации authy клиента
 *
 * @author evgeniycheban
 */
@ConfigurationProperties("authy")
public class AuthyApiClientProperties {

    /**
     * api ключ
     */
    private String apiKey;

    /**
     * @return api ключ
     */
    public String getApiKey() {
        return apiKey;
    }

    /**
     * @param apiKey - api ключ
     */
    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }
}
