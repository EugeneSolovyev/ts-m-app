package com.musicapp.config;

import com.musicapp.config.properties.TokenServiceProperties;
import com.musicapp.service.TokenService;
import com.musicapp.service.impl.TokenServiceImpl;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Конфигурация сервиса для работы с jwt
 *
 * @author evgeniycheban
 */
@Configuration
@EnableConfigurationProperties(TokenServiceProperties.class)
public class TokenServiceConfig {
    private final TokenServiceProperties properties;

    /**
     * @param properties - параметры конфигурации сервиса для работы с jwt
     */
    public TokenServiceConfig(TokenServiceProperties properties) {
        this.properties = properties;
    }

    /**
     * @return сервис для работы с jwt
     */
    @Bean
    public TokenService tokenService() {
        return new TokenServiceImpl(properties);
    }

}
