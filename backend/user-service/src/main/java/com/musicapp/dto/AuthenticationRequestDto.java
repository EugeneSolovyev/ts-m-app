package com.musicapp.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * dto-представление запроса аутентификации.
 *
 * @author evgeniycheban
 */
@Data
public class AuthenticationRequestDto {

    @NotBlank(message = "{user.username.empty}")
    private String username;

    @NotBlank(message = "{user.password.empty}")
    private String password;

}
