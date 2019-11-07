package com.musicapp.service;

import com.musicapp.domain.User;
import com.musicapp.dto.UserDto;
import com.musicapp.exception.NotFoundException;
import com.musicapp.projection.UserProfileProjection;

import java.util.function.Consumer;

/**
 * Интерфейс сервиса для управления пользователями.
 *
 * @author evgeniycheban
 */
public interface UserService {

    /**
     * Создаёт нового пользователя.
     *
     * @param userDto      новый пользователь
     * @param userConsumer callback с пользователем
     */
    void create(UserDto userDto, Consumer<User> userConsumer);

    /**
     * Проверяет существование пользователя по номеру телефона.
     *
     * @param phone номер телефона пользователя
     * @return true если пользователь существует
     */
    boolean checkPhone(String phone);

    /**
     * Возвращает профиль пользователя по идентификатору.
     *
     * @param id идентификатор пользователя
     * @return профиль пользователя
     * @throws NotFoundException в случае если пользователь не найден
     */
    UserProfileProjection getProfile(Long id);

}
