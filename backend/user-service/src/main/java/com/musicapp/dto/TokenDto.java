package com.musicapp.dto;

/**
 * DTO ответа с jwt токеном
 *
 * @author evgeniycheban
 */
public class TokenDto {

    /**
     * JWT токен
     */
    private final String token;

    /**
     * @param token - jwt токен
     */
    public TokenDto(String token) {
        this.token = token;
    }

    /**
     * @return jwt токен
     */
    public String getToken() {
        return token;
    }

}
