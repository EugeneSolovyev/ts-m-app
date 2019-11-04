package com.musicapp.dto;

import lombok.Data;

/**
 * dto-представление ответа с jwt токеном.
 *
 * @author evgeniycheban
 */
@Data
public class TokenDto {

    private final String token;

}
