package com.musicapp.security.context;

import lombok.experimental.UtilityClass;

/**
 * Thread local хранилище для jwt токена.
 *
 * @author evgeniycheban
 */
@UtilityClass
public class TokenContextHolder {

    private final ThreadLocal<String> tokenStorage = new ThreadLocal<>();

    /**
     * Возвращает jwt токен из хранилища.
     *
     * @return jwt токен
     */
    public String getToken() {
        return tokenStorage.get();
    }

    /**
     * Сохраняет jwt токен в хранилище.
     *
     * @param token jwt токен
     */
    public void setToken(String token) {
        tokenStorage.set(token);
    }

}
