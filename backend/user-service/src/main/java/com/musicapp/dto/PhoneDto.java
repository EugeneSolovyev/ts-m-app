package com.musicapp.dto;

import com.musicapp.domain.User;
import com.musicapp.validation.annotation.Exists;
import com.musicapp.validation.annotation.PhoneFormat;
import com.musicapp.validation.group.PhoneFormatGroup;
import com.musicapp.validation.group.PhoneNotBlankGroup;
import com.musicapp.validation.group.PhoneUniqueGroup;

import javax.validation.constraints.NotBlank;

public class PhoneDto {
    private String phone;

    @NotBlank(message = "{user.phone.empty}", groups = PhoneNotBlankGroup.class)
    @PhoneFormat(groups = PhoneFormatGroup.class)
    @Exists(message = "{user.phone.duplicate}", entity = User.class, field = "phone", groups = PhoneUniqueGroup.class)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "PhoneDto{" +
                "phone='" + phone + '\'' +
                '}';
    }

}
