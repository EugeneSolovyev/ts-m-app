package com.musicapp.dto;

import com.musicapp.domain.User;
import com.musicapp.validation.annotation.Existence;
import com.musicapp.validation.annotation.PhoneFormat;
import com.musicapp.validation.group.PhoneFormatGroup;
import com.musicapp.validation.group.PhoneNotBlankGroup;
import com.musicapp.validation.group.PhoneUniqueGroup;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PhoneDto {

    @NotBlank(message = "{user.phone.empty}", groups = PhoneNotBlankGroup.class)
    @PhoneFormat(groups = PhoneFormatGroup.class)
    @Existence(message = "{user.phone.duplicate}", entity = User.class, field = "phone", groups = PhoneUniqueGroup.class)
    private String phone;

}
