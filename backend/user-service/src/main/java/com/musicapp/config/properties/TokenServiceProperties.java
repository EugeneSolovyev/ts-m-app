package com.musicapp.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Параметры конфигурации сервиса для работы с jwt
 *
 * @author evgeniycheban
 */
@ConfigurationProperties("token")
public class TokenServiceProperties {
    private String secret;

    private Long expiration;

    /**
     * @return секретное слово jwt
     */
    public String getSecret() {
        return secret;
    }

    /**
     * @param secret - секретное слово jwt
     */
    public void setSecret(String secret) {
        this.secret = secret;
    }

    /**
     * @return срок действия jwt
     */
    public Long getExpiration() {
        return expiration;
    }

    /**
     * @param expiration - срок действия jwt
     */
    public void setExpiration(Long expiration) {
        this.expiration = expiration;
    }
}
