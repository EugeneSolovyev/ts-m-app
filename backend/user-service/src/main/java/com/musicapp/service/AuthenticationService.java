package com.musicapp.service;

/**
 * Сервис аутентификации
 *
 * @author evgeniycheban
 */
public interface AuthenticationService {

    /**
     * Аутентификация
     *
     * @param username имя пользователя
     * @param password пароль
     * @return jwt токен
     */
    String authenticate(String username, String password);

}
