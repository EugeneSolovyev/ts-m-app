package com.musicapp.service;

import org.springframework.security.core.AuthenticationException;

/**
 * Интерфейс сервиса аутентификации.
 *
 * @author evgeniycheban
 */
public interface AuthenticationService {

    /**
     * Аутентифицирует пользователя.
     *
     * @param username имя пользователя
     * @param password пароль
     * @return jwt токен
     * @throws AuthenticationException в случае ошибки аутентификации
     */
    String authenticate(String username, String password);

}
