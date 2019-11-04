package com.musicapp.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Параметры конфигурации Swagger.
 *
 * @author evgeniycheban
 */
@ConfigurationProperties("swagger")
@Data
public class SwaggerConfigProperties {

    private String host;

}
