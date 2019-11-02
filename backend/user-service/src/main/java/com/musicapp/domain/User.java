package com.musicapp.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

/**
 * Сущность пользователя
 *
 * @author evgeniycheban
 */
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

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
     * @return роль
     */
    public Role getRole() {
        return role;
    }

    /**
     * @param role - роль
     */
    public void setRole(Role role) {
        this.role = role;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", username='" + username + '\'' +
                ", role=" + role +
                '}';
    }

}
