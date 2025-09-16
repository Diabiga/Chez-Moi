package com.diabiga.soro.config;

import com.diabiga.soro.model.Category;
import com.diabiga.soro.model.Role;
import com.diabiga.soro.model.User;
import com.diabiga.soro.repository.CategoryRepository;
import com.diabiga.soro.repository.RoleRepository;
import com.diabiga.soro.repository.UserRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

	@Bean
	CommandLineRunner seedData(CategoryRepository categoryRepository,
							 RoleRepository roleRepository,
							 UserRepository userRepository,
							 PasswordEncoder passwordEncoder) {
		return args -> {
			if (categoryRepository.count() == 0) {
				categoryRepository.saveAll(List.of(
						new Category(null, "Location/Appartement", true),
						new Category(null, "Location/Maison", true),
						new Category(null, "Vente/Terrain", true),
						new Category(null, "Vente/Article", true)
				));
			}

			if (roleRepository.count() == 0) {
				roleRepository.saveAll(List.of(
						new Role(null, "ADMIN"),
						new Role(null, "BOUTIQUE"),
						new Role(null, "ANNONCEUR")
				));
			}

			if (userRepository.findByUsername("admin").isEmpty()) {
				User admin = new User();
				admin.setUsername("admin");
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setEmail("admin@example.com");
				admin.setDisplayName("Administrateur");
				admin.setProfileType("ADMIN");
				userRepository.save(admin);
			}
		};
	}
}

