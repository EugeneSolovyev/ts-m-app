package com.musicapp.service;

import com.musicapp.security.AuthorizedUser;
import io.jsonwebtoken.Claims;

import java.util.Optional;

/**
 * Интерфейс сервиса для работы с jwt токеном.
 *
 * @author evgeniycheban
 */
public interface TokenService {

    /**
     * Возвращает авторизованного пользователя из jwt токена.
     *
     * @param token jwt токен
     * @return сущность пользователя
     */
    Optional<AuthorizedUser> getAuthorizedUser(String token);

    /**
     * Генерирует jwt токен из авторизованного пользователя.
     *
     * @param authorizedUser авторизованный пользователь
     * @return jwt токен
     */
    String generate(AuthorizedUser authorizedUser);

    /**
     * Генерирует jwt токен из параметров.
     *
     * @param claims параметры
     * @return jwt токен
     */
    String generate(Claims claims);

    /**
     * Возвращает параметры из jwt токена.
     *
     * @param token jwt токен
     * @return параметры
     */
    Claims getClaims(String token);

}
