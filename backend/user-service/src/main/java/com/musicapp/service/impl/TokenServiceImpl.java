package com.musicapp.service.impl;

import com.musicapp.domain.Role;
import com.musicapp.security.AuthorizedUser;
import com.musicapp.service.TokenService;
import com.musicapp.util.constants.ClaimConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Реализация сервиса для работы с jwt токеном.
 *
 * @author evgeniycheban
 */
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final String secret;
    private final Long expiration;

    @Override
    public Optional<AuthorizedUser> getAuthorizedUser(String token) {
        Claims claims = getClaims(token);

        Long id = claims.get(ClaimConstants.id, Long.class);
        if (id == null) {
            return Optional.empty();
        }

        String username = claims.get(ClaimConstants.username, String.class);

        List<?> roles = claims.get(ClaimConstants.roles, List.class);
        Set<Role> authorities = roles.stream()
                .map(role -> Role.valueOf((String) role))
                .collect(Collectors.toSet());

        return Optional.of(new AuthorizedUser(id, username, authorities));
    }

    @Override
    public String generate(AuthorizedUser authorizedUser) {
        Claims claims = Jwts.claims();
        claims.put(ClaimConstants.id, authorizedUser.getId());
        claims.put(ClaimConstants.username, authorizedUser.getUsername());
        claims.put(ClaimConstants.roles, authorizedUser.getAuthorities());

        return generate(claims);
    }

    @Override
    public String generate(Claims claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date((System.currentTimeMillis() + expiration) * 1000))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    @Override
    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

}
