package com.musicapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.support.ConversionServiceFactoryBean;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.convert.converter.Converter;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.util.Set;

/**
 * Конфигурация приложения
 *
 * @author evgeniycheban
 */
@Configuration
public class AppConfig {

    /**
     * @return сервис-конвертер
     */
    @Bean
    @Autowired
    @Primary
    public ConversionServiceFactoryBean conversionServiceFactoryBean(Set<Converter<?, ?>> converters) {
        ConversionServiceFactoryBean bean = new ConversionServiceFactoryBean();
        bean.setConverters(converters);
        bean.afterPropertiesSet();

        return bean;
    }

    /**
     * @return источник сообщений ошибок валидации
     */
    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("classpath:messages/user");

        return messageSource;
    }

    /**
     * @return фабрика валидаторов
     */
    @Bean
    public LocalValidatorFactoryBean validator() {
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.setValidationMessageSource(messageSource());

        return validator;
    }

}
