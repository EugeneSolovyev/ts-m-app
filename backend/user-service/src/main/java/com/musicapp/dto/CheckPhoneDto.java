package com.musicapp.dto;

import lombok.Data;

/**
 * dto-представление ответа проверки существования пользователя по номеру телефона.
 *
 * @author evgeniycheban
 */
@Data
public class CheckPhoneDto {

    private final boolean exists;

}
