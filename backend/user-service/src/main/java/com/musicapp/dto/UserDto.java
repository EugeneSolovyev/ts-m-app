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

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * DTO для сущности пользователя
 *
 * @author evgeniycheban
 */
@SamePassword(groups = SamePasswordGroup.class)
public class UserDto {

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String username;

    private String password;

    private String repeatPassword;

    /**
     * @return имя
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * @param firstName - имя
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * @return фамилия
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * @param lastName - фамилия
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * @return почта
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email - почта
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return телефон
     */
    @NotBlank(message = "{user.phone.empty}", groups = PhoneNotBlankGroup.class)
    @PhoneFormat(groups = PhoneFormatGroup.class)
    @PhoneVerified(groups = PhoneVerifiedGroup.class)
    public String getPhone() {
        return phone;
    }

    /**
     * @param phone - телефон
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * @return имя пользователя
     */
    @NotBlank(message = "{user.username.empty}", groups = UsernameNotBlankGroup.class)
    public String getUsername() {
        return username;
    }

    /**
     * @param username - имя пользователя
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return пароль
     */
    @NotBlank(message = "{user.password.empty}", groups = PasswordNotBlankGroup.class)
    @Size(min = 8, max = 32, message = "{user.password.size}", groups = PasswordSizeGroup.class)
    public String getPassword() {
        return password;
    }

    /**
     * @param password - пароль
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return повтор пароля
     */
    public String getRepeatPassword() {
        return repeatPassword;
    }

    /**
     * @param repeatPassword - повтор пароля
     */
    public void setRepeatPassword(String repeatPassword) {
        this.repeatPassword = repeatPassword;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", username='" + username + '\'' +
                '}';
    }

}
