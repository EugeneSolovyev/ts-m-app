package com.musicapp.dto;

import lombok.Data;

/**
 * DTO ответа с jwt токеном
 *
 * @author evgeniycheban
 */
@Data
public class TokenDto {

    /**
     * JWT токен
     */
    private final String token;

}
