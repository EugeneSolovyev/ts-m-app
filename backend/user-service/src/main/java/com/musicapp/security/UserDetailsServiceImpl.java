package com.musicapp.security;

import com.musicapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return repository.findByPhone(login)
                .map(user -> new AuthorizedUser(user.getId(), user.getUsername(), user.getPassword(), Collections.singleton(user.getRole())))
                .orElseThrow(() -> new UsernameNotFoundException("User: " + login + " not found!"));
    }

}
