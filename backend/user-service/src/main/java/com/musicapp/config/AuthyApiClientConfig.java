package com.musicapp.config;

import com.authy.AuthyApiClient;
import com.musicapp.config.properties.AuthyApiClientProperties;
import com.musicapp.util.constants.Profiles;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Конфигурация authy клиента
 *
 * @author evgeniycheban
 */
@Configuration
@EnableConfigurationProperties(AuthyApiClientProperties.class)
@Profile(Profiles.PROD)
public class AuthyApiClientConfig {
    private final AuthyApiClientProperties properties;

    /**
     * @param properties - параметры конфигурации authy
     */
    public AuthyApiClientConfig(AuthyApiClientProperties properties) {
        this.properties = properties;
    }

    /**
     * @return authy клиент
     */
    @Bean
    public AuthyApiClient authyApiClient() {
        return new AuthyApiClient(properties.getApiKey());
    }

}
