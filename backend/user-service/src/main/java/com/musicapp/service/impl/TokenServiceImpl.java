package com.musicapp.service.impl;

import com.musicapp.config.properties.TokenServiceProperties;
import com.musicapp.domain.Role;
import com.musicapp.util.constants.TokenConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import com.musicapp.security.AuthorizedUser;
import com.musicapp.service.TokenService;
import org.apache.commons.lang3.time.DateUtils;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Сервис для работы с jwt токеном
 *
 * @author evgeniycheban
 */
public class TokenServiceImpl implements TokenService {
    private final String secret;
    private final Long expiration;

    public TokenServiceImpl(TokenServiceProperties properties) {
        this.secret = properties.getSecret();
        this.expiration = properties.getExpiration();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<AuthorizedUser> getAuthorizedUser(String token) {
        Claims claims = getClaims(token);

        Long id = claims.get(TokenConstants.Claims.ID, Long.class);
        if (id == null) {
            return Optional.empty();
        }

        String username = claims.get(TokenConstants.Claims.USERNAME, String.class);

        List<?> roles = claims.get(TokenConstants.Claims.ROLES, List.class);
        Set<Role> authorities = roles.stream()
                .map(role -> Role.valueOf((String) role))
                .collect(Collectors.toSet());

        return Optional.of(new AuthorizedUser(id, username, authorities));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String generate(AuthorizedUser authorizedUser) {
        Claims claims = Jwts.claims();
        claims.put(TokenConstants.Claims.ID, authorizedUser.getId());
        claims.put(TokenConstants.Claims.USERNAME, authorizedUser.getUsername());
        claims.put(TokenConstants.Claims.ROLES, authorizedUser.getAuthorities());

        return generate(claims);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String generate(Claims claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + expiration * DateUtils.MILLIS_PER_SECOND))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

}
