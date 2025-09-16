package com.diabiga.soro.security;

import com.diabiga.soro.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
public class UserDetailsConfig {

	@Bean
	public UserDetailsService userDetailsService(UserRepository userRepository) {
		return username -> userRepository.findByUsername(username)
				.map(u -> build(u))
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
	}

	private UserDetails build(com.diabiga.soro.model.User u) {
		return User.withUsername(u.getUsername())
				.password(u.getPassword())
				.roles("USER")
				.build();
	}
}

