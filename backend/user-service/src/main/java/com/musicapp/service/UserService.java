package com.musicapp.service;

import com.musicapp.domain.User;
import com.musicapp.dto.PaginationRequestDto;
import com.musicapp.dto.UserDto;
import com.musicapp.projection.UserProfileProjection;
import org.springframework.data.domain.Page;

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
     * @param userDto  - новый пользователь
     * @param callback - callback с пользователем
     */
    void create(UserDto userDto, Consumer<User> callback);

    /**
     * Проверка существования пользователя по номеру телефона
     *
     * @return true если пользователь существует
     */
    boolean checkPhone(String phone);

    /**
     * Редактирование номера телефона пользователя
     *
     * @param phone - номер телефона пользователя
     * @param id    - идентификатор пользователя
     */
    void editPhone(String phone, Long id);

    /**
     * Получение профиля пользователя по идентификатору
     *
     * @param id - идентификатор пользователя
     * @return найденный пользователь или null
     */
    UserProfileProjection getProfile(Long id);

    /**
     * Получение пользователей
     *
     * @param request - запрос с параметрами пагинации
     * @return страница пользователей
     */
    Page<UserProfileProjection> getAll(PaginationRequestDto request);

}
