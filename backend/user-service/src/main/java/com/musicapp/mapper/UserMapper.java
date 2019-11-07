package com.musicapp.mapper;

import com.musicapp.domain.User;
import com.musicapp.dto.UserDto;
import org.mapstruct.Mapper;

/**
 * Маппер сущности пользователя.
 *
 * @author evgeniycheban
 */
@Mapper(componentModel = "spring")
public interface UserMapper {

    User map(UserDto userDto);

}
