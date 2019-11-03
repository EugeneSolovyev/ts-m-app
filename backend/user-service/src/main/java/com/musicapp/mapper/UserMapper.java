package com.musicapp.mapper;

import com.musicapp.domain.User;
import com.musicapp.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User map(UserDto userDto);

}
