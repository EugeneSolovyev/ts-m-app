package com.musicapp.service.impl;

import com.musicapp.domain.Role;
import com.musicapp.domain.User;
import com.musicapp.dto.UserDto;
import com.musicapp.exception.NotFoundException;
import com.musicapp.mapper.UserMapper;
import com.musicapp.projection.UserProfileProjection;
import com.musicapp.repository.UserRepository;
import com.musicapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.function.Consumer;

/**
 * Реализация сервиса для управления пользователями.
 *
 * @author evgeniycheban
 */
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final UserMapper mapper;
    private final PasswordEncoder encoder;

    @Override
    @Transactional
    public void create(UserDto userDto, Consumer<User> userConsumer) {
        User user = mapper.map(userDto);
        user.setRole(Role.ROLE_USER);
        user.setPassword(encoder.encode(user.getPassword()));
        userConsumer.accept(repository.save(user));
    }

    @Override
    public boolean checkPhone(String phone) {
        return repository.existsByPhone(phone);
    }

    @Override
    public UserProfileProjection getProfile(Long id) {
        return repository.findById(id, UserProfileProjection.class)
                .orElseThrow(() -> new NotFoundException("user.id.notFound", "id"));
    }

}
