package com.musicapp.config;

import com.authy.AuthyApiClient;
import com.musicapp.config.properties.AuthyApiClientProperties;
import com.musicapp.util.constants.ProfileConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Конфигурация Authy клиента.
 *
 * @author evgeniycheban
 */
@Configuration
@EnableConfigurationProperties(AuthyApiClientProperties.class)
@Profile(ProfileConstants.prod)
@RequiredArgsConstructor
public class AuthyApiClientConfig {

    private final AuthyApiClientProperties properties;

    @Bean
    public AuthyApiClient authyApiClient() {
        return new AuthyApiClient(properties.getApiKey());
    }

}
