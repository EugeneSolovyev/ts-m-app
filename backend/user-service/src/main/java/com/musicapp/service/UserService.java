package com.musicapp.service;

import com.musicapp.domain.User;
import com.musicapp.dto.UserDto;
import com.musicapp.projection.UserProfileProjection;

import java.util.function.Consumer;

/**
 * Сервис для управления пользователями
 *
 * @author evgeniycheban
 */
public interface UserService {

    /**
     * Создание нового пользователя
     *
     * @param userDto      новый пользователь
     * @param userConsumer callback с пользователем
     */
    void create(UserDto userDto, Consumer<User> userConsumer);

    /**
     * Проверка существования пользователя по номеру телефона
     *
     * @param phone номер телефона пользователя
     * @return true если пользователь существует
     */
    boolean checkPhone(String phone);

    /**
     * Получение профиля пользователя по идентификатору
     *
     * @param id идентификатор пользователя
     * @return найденный пользователь или null
     */
    UserProfileProjection getProfile(Long id);

}
