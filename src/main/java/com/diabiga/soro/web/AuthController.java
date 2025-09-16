package com.diabiga.soro.web;

import com.diabiga.soro.model.User;
import com.diabiga.soro.repository.UserRepository;
import com.diabiga.soro.security.JwtService;
import com.diabiga.soro.service.MailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final MailService mailService;

	public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
				PasswordEncoder passwordEncoder, JwtService jwtService, MailService mailService) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.mailService = mailService;
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
		if (userRepository.findByUsername(request.username()).isPresent()) {
			return ResponseEntity.badRequest().body(Map.of("error", "username already exists"));
		}
		User user = new User();
		user.setUsername(request.username());
		user.setPassword(passwordEncoder.encode(request.password()));
		user.setEmail(request.email());
		user.setDisplayName(request.displayName());
		user.setProfileType(request.profileType());
		userRepository.save(user);
		mailService.send(user.getEmail(), "Bienvenue sur ChezMoi Abidjan", "Votre compte a été créé avec succès.");
		return ResponseEntity.created(URI.create("/api/users/" + user.getId())).build();
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
			String token = jwtService.generateToken(request.username(), 1000L * 60 * 60 * 24);
			return ResponseEntity.ok(Map.of("token", token));
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(401).body(Map.of("error", "invalid credentials"));
		}
	}

	public record RegisterRequest(String username, String password, String email, String displayName, String profileType) {}

	public record LoginRequest(String username, String password) {}
}

