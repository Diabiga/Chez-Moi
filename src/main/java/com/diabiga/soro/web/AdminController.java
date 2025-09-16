package com.diabiga.soro.web;

import com.diabiga.soro.model.Annonce;
import com.diabiga.soro.model.Boutique;
import com.diabiga.soro.model.User;
import com.diabiga.soro.repository.AnnonceRepository;
import com.diabiga.soro.repository.BoutiqueRepository;
import com.diabiga.soro.repository.UserRepository;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	private final UserRepository userRepository;
	private final AnnonceRepository annonceRepository;
	private final BoutiqueRepository boutiqueRepository;

	public AdminController(UserRepository userRepository, AnnonceRepository annonceRepository, BoutiqueRepository boutiqueRepository) {
		this.userRepository = userRepository;
		this.annonceRepository = annonceRepository;
		this.boutiqueRepository = boutiqueRepository;
	}

	@GetMapping("/overview")
	public ResponseEntity<?> overview() {
		long users = userRepository.count();
		long annonces = annonceRepository.count();
		long boutiques = boutiqueRepository.count();
		return ResponseEntity.ok(java.util.Map.of(
				"users", users,
				"annonces", annonces,
				"boutiques", boutiques
		));
	}

	@GetMapping("/users")
	public List<User> listUsers() { return userRepository.findAll(); }

	@DeleteMapping("/annonces/{id}")
	public ResponseEntity<Void> deleteAnnonce(@PathVariable Long id) {
		if (!annonceRepository.existsById(id)) return ResponseEntity.notFound().build();
		annonceRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/annonces")
	public List<Annonce> listAnnonces() { return annonceRepository.findAll(); }

	@GetMapping("/boutiques")
	public List<Boutique> listBoutiques() { return boutiqueRepository.findAll(); }
}

