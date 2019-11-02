package com.musicapp.dto;

import com.musicapp.validation.annotation.PhoneAndCode;
import com.musicapp.validation.annotation.PhoneFormat;
import com.musicapp.validation.group.PhoneAndCodeGroup;
import com.musicapp.validation.group.PhoneFormatGroup;
import com.musicapp.validation.group.PhoneNotBlankGroup;

import javax.validation.constraints.NotBlank;

@PhoneAndCode(groups = PhoneAndCodeGroup.class)
public class PhoneCodeDto {
    private String phone;
    private String code;

    @NotBlank(groups = PhoneNotBlankGroup.class)
    @PhoneFormat(groups = PhoneFormatGroup.class)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "PhoneCodeDto{" +
                "phone='" + phone + '\'' +
                '}';
    }

}
