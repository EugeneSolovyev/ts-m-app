package com.musicapp.security;

import com.musicapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Реализация сервиса для получения авторизованного пользователя.
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
                .map(AuthorizedUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("User: " + login + " not found!"));
    }

}
