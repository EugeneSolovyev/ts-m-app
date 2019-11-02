package com.musicapp.converter;

import com.musicapp.domain.Role;
import com.musicapp.domain.User;
import com.musicapp.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Конвертер UserDto -> User
 *
 * @author evgeniycheban
 */
@Component
public class UserDtoToUserConverter implements Converter<UserDto, User> {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserDtoToUserConverter(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public User convert(UserDto userDto) {
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setPhone(userDto.getPhone());
        user.setEmail(userDto.getEmail());
        user.setRole(Role.ROLE_USER);

        return user;
    }

}
