package com.musicapp.web.controller;

import com.musicapp.domain.DomainEvent;
import com.musicapp.domain.DomainEventType;
import com.musicapp.domain.User;
import com.musicapp.dto.CheckPhoneDto;
import com.musicapp.dto.PhoneDto;
import com.musicapp.dto.UserDto;
import com.musicapp.projection.UserProfileProjection;
import com.musicapp.service.UserService;
import com.musicapp.stream.UserStream;
import com.musicapp.validation.group.UsernameNotBlankGroup;
import com.musicapp.validation.sequence.PhoneFormatSequence;
import com.musicapp.validation.sequence.PhoneVerifiedSequence;
import com.musicapp.validation.sequence.SamePasswordSequence;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Методы для работы с пользователями.
 *
 * @author evgeniycheban
 */
@RestController
@RequestMapping("/users")
@EnableBinding(UserStream.class)
@RequiredArgsConstructor
public class UserController {

    private final UserService service;
    private final UserStream stream;

    /**
     * Метод валидирует и создаёт нового пользователя с отправкой в message broker.
     *
     * @param userDto DTO сущности пользователя
     */
    @PostMapping
    public void create(@Validated({
            PhoneVerifiedSequence.class,
            UsernameNotBlankGroup.class,
            SamePasswordSequence.class
    }) @RequestBody UserDto userDto) {
        service.create(userDto, user -> {
            Message<DomainEvent<User>> message = MessageBuilder
                    .withPayload(new DomainEvent<>(user, DomainEventType.USER_CREATED))
                    .build();
            stream.output().send(message);
        });
    }

    /**
     * Метод валидирует и проверяет существование пользователя по номеру телефона.
     *
     * @param phoneDto DTO номера телефона пользователя
     * @return ответ с признаком существования пользователя
     */
    @PostMapping("/check-phone")
    public CheckPhoneDto checkPhone(@Validated(PhoneFormatSequence.class) @RequestBody PhoneDto phoneDto) {
        boolean exists = service.checkPhone(phoneDto.getPhone());

        return new CheckPhoneDto(exists);
    }

    /**
     * Метод возвращает профиль пользователя по идентификатору.
     *
     * @param id идентификатор пользователя
     * @return профиль пользователя
     */
    @GetMapping("/{id}")
    public UserProfileProjection getProfile(@PathVariable Long id) {
        return service.getProfile(id);
    }

}
