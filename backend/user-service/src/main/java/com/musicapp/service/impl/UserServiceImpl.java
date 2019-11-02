package com.musicapp.service.impl;

import com.musicapp.domain.User;
import com.musicapp.dto.PaginationRequestDto;
import com.musicapp.dto.UserDto;
import com.musicapp.projection.UserProfileProjection;
import com.musicapp.repository.UserRepository;
import com.musicapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.function.Consumer;

/**
 * Реализация сервиса для управления пользователями
 *
 * @author evgeniycheban
 */
@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    private final ConversionService conversionService;

    /**
     * @param repository        - репозиторий для работы с таблицей пользователей
     * @param conversionService - сервис конвертер
     */
    @Autowired
    public UserServiceImpl(UserRepository repository,
                           ConversionService conversionService) {
        this.repository = repository;
        this.conversionService = conversionService;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void create(UserDto userDto, Consumer<User> callback) {
        User user = conversionService.convert(userDto, User.class);
        repository.save(user);
        callback.accept(user);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean checkPhone(String phone) {
        return repository.existsByPhone(phone);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void editPhone(String phone, Long id) {
        repository.updatePhone(phone, id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserProfileProjection getProfile(Long id) {
        return repository.findById(id, UserProfileProjection.class);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Page<UserProfileProjection> getAll(PaginationRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());

        return repository.getAll(pageable);
    }

}
