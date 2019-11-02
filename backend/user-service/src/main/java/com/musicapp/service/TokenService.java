package com.musicapp.service;

import io.jsonwebtoken.Claims;
import com.musicapp.security.AuthorizedUser;

import java.util.Optional;

/**
 * Сервис для работы с jwt токеном
 *
 * @author evgeniycheban
 */
public interface TokenService {

    /**
     * Получение авторизованного пользователя из jwt токена
     *
     * @param token - jwt токен
     * @return сущность пользователя
     */
    Optional<AuthorizedUser> getAuthorizedUser(String token);

    /**
     * Генерация jwt токена из авторизованного пользователя
     *
     * @param authorizedUser - авторизованный пользователь
     * @return jwt токен
     */
    String generate(AuthorizedUser authorizedUser);

    /**
     * Генерация кастомного jwt токена из параметров
     *
     * @param claims - параметры
     * @return jwt токен
     */
    String generate(Claims claims);

    /**
     * Получение параметров из jwt токена
     */
    Claims getClaims(String token);

}
