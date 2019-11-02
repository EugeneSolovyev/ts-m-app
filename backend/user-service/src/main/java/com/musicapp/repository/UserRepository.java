package com.musicapp.repository;

import com.musicapp.domain.User;
import com.musicapp.projection.AuthorizedUserProjection;
import com.musicapp.projection.UserProfileProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

/**
 * Репоизторий для работы с таблицей пользователей
 *
 * @author evgeniycheban
 */
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    /**
     * Поиск пользователя по логину
     *
     * @param login - логин пользователя(имя, телефон, почта)
     * @return Optional с User или null
     */
    @Query("select user.id as id, user.username as username, user.password as password, user.role as role" +
            " from User user where user.username = ?1 or user.phone= ?1 or user.email = ?1")
    Optional<AuthorizedUserProjection> getByLogin(String login);

    /**
     * Получение пользователя по идентификатору
     *
     * @param id   - идентификатор пользователя
     * @param type - тип проекции
     * @return проекция пользователя
     */
    <T> T findById(Long id, Class<T> type);

    /**
     * Проверка на существование пользователя по номеру телефона
     *
     * @param phone - номер телефона
     * @return true если пользователь существует
     */
    boolean existsByPhone(String phone);

    /**
     * Обновление номера телефона пользователя
     *
     * @param phone - номер телефона пользователя
     * @param id    - идентификатор пользователя
     */
    @Modifying
    @Query("update User user set user.phone = ?1 where user.id= ?2")
    void updatePhone(String phone, Long id);

    /**
     * Получение пользователей
     *
     * @param pageable - параметры пагинации
     * @return страница пользователей
     */
    @Query("select user.id as id, user.firstName as firstName, " +
            "user.lastName as lastName, user.email as email, " +
            "user.phone as phone, user.username as username " +
            "from User user")
    Page<UserProfileProjection> getAll(Pageable pageable);

}
