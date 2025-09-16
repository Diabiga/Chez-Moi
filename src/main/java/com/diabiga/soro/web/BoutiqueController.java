package com.diabiga.soro.web;

import com.diabiga.soro.model.Boutique;
import com.diabiga.soro.repository.BoutiqueRepository;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boutiques")
public class BoutiqueController {

	private final BoutiqueRepository boutiqueRepository;

	public BoutiqueController(BoutiqueRepository boutiqueRepository) {
		this.boutiqueRepository = boutiqueRepository;
	}

	@GetMapping
	public List<Boutique> list() {
		return boutiqueRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Boutique> get(@PathVariable Long id) {
		return boutiqueRepository.findById(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<Boutique> create(@RequestBody Boutique boutique) {
		Boutique saved = boutiqueRepository.save(boutique);
		return ResponseEntity.created(URI.create("/api/boutiques/" + saved.getId())).body(saved);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Boutique> update(@PathVariable Long id, @RequestBody Boutique boutique) {
		return boutiqueRepository.findById(id)
				.map(existing -> {
					existing.setName(boutique.getName());
					existing.setDescription(boutique.getDescription());
					existing.setAddress(boutique.getAddress());
					existing.setPhone(boutique.getPhone());
					existing.setOwner(boutique.getOwner());
					return ResponseEntity.ok(boutiqueRepository.save(existing));
				})
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		if (!boutiqueRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		boutiqueRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}

