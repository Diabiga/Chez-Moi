package com.diabiga.soro.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

	private static final String SECRET = "bXktdmVyeS1sb25nLXNlY3JldC1rZXktZm9yLWRldmVsb3BtZW50LW5vdC1mb3ItcHJvZA==";

	public String extractUsername(String token) {
		return extractAllClaims(token).getSubject();
	}

	public String generateToken(String username, long expirationMs) {
		return generateToken(Map.of(), username, expirationMs);
	}

	public String generateToken(Map<String, Object> extraClaims, String username, long expirationMs) {
		Date now = new Date();
		Date expiry = new Date(now.getTime() + expirationMs);
		return Jwts.builder()
				.setClaims(extraClaims)
				.setSubject(username)
				.setIssuedAt(now)
				.setExpiration(expiry)
				.signWith(getSignInKey(), SignatureAlgorithm.HS256)
				.compact();
	}

	public boolean isTokenValid(String token, String username) {
		String extracted = extractUsername(token);
		return extracted != null && extracted.equals(username) && !isTokenExpired(token);
	}

	private boolean isTokenExpired(String token) {
		Date expiration = extractAllClaims(token).getExpiration();
		return expiration.before(new Date());
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(getSignInKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}

	private Key getSignInKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}

