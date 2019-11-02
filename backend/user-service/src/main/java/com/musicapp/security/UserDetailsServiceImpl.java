package com.musicapp.security;

import com.musicapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Сервис для получения авторизованного пользователя
 *
 * @author evgeniycheban
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository repository;

    /**
     * @param repository - репозиторий для работы с таблицей пользователей
     */
    @Autowired
    public UserDetailsServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return repository.getByLogin(login)
                .map(user -> new AuthorizedUser(user.getId(), user.getUsername(), user.getPassword(), Collections.singleton(user.getRole())))
                .orElseThrow(() -> new UsernameNotFoundException("User: " + login + " not found!"));
    }

}
