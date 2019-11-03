package com.musicapp.dto;

import lombok.Data;

/**
 * DTO ответа проверки на существование пользователя по номеру телефона
 *
 * @author evgeniycheban
 */
@Data
public class CheckPhoneDto {

    /**
     * признак существования пользователя по номеру телефона
     */
    private final boolean exists;

}
