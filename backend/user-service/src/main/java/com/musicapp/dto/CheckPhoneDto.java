package com.musicapp.dto;

/**
 * DTO ответа проверки на существование пользователя по номеру телефона
 *
 * @author evgeniycheban
 */
public class CheckPhoneDto {

    /**
     * признак существования пользователя по номеру телефона
     */
    private final boolean exists;

    /**
     * @param exists - признак существования телефона
     */
    public CheckPhoneDto(boolean exists) {
        this.exists = exists;
    }

    /**
     * @return true если телефон уже существует
     */
    public boolean isExists() {
        return exists;
    }

}
