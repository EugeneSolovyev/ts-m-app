package com.musicapp.dto;

import com.musicapp.validation.annotation.PhoneFormat;
import com.musicapp.validation.annotation.PhoneVerified;
import com.musicapp.validation.annotation.SamePassword;
import com.musicapp.validation.group.PasswordNotBlankGroup;
import com.musicapp.validation.group.PasswordSizeGroup;
import com.musicapp.validation.group.PhoneFormatGroup;
import com.musicapp.validation.group.PhoneNotBlankGroup;
import com.musicapp.validation.group.PhoneVerifiedGroup;
import com.musicapp.validation.group.SamePasswordGroup;
import com.musicapp.validation.group.UsernameNotBlankGroup;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * dto-представление сущности пользователя.
 *
 * @author evgeniycheban
 */
@SamePassword(groups = SamePasswordGroup.class)
@Data
public class UserDto {

    private String firstName;

    private String lastName;

    private String email;

    @NotBlank(message = "{user.phone.empty}", groups = PhoneNotBlankGroup.class)
    @PhoneFormat(groups = PhoneFormatGroup.class)
    @PhoneVerified(groups = PhoneVerifiedGroup.class)
    private String phone;

    @NotBlank(message = "{user.username.empty}", groups = UsernameNotBlankGroup.class)
    private String username;

    @NotBlank(message = "{user.password.empty}", groups = PasswordNotBlankGroup.class)
    @Size(min = 8, max = 32, message = "{user.password.size}", groups = PasswordSizeGroup.class)
    private String password;

    private String repeatPassword;

}
