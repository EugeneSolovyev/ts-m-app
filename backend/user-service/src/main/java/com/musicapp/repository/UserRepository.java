package com.musicapp.repository;

import com.musicapp.domain.User;
import com.musicapp.projection.AuthorizedUserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

/**
 * Репоизторий для работы с таблицей пользователей
 *
 * @author evgeniycheban
 */
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    /**
     * Поиск пользователя по номеру телефона
     *
     * @param phone номер телефона пользователя
     * @return Optional пользователь
     */
    Optional<AuthorizedUserProjection> findByPhone(String phone);

    /**
     * Получение пользователя по идентификатору
     *
     * @param id   идентификатор пользователя
     * @param type тип проекции
     * @return проекция пользователя
     */
    <T> T findById(Long id, Class<T> type);

    /**
     * Проверка на существование пользователя по номеру телефона
     *
     * @param phone номер телефона
     * @return true если пользователь существует
     */
    boolean existsByPhone(String phone);

}
