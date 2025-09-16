package com.diabiga.soro.web;

import com.diabiga.soro.repository.UserRepository;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserRepository userRepository;

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping("/me")
	public ResponseEntity<?> me(Principal principal) {
		if (principal == null) {
			return ResponseEntity.status(401).build();
		}
		return userRepository.findByUsername(principal.getName())
				.<ResponseEntity<?>>map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
}

