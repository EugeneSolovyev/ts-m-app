package com.musicapp.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("swagger")
@Data
public class SwaggerConfigProperties {

    private String host;

}
