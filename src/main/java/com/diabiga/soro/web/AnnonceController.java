package com.diabiga.soro.web;

import com.diabiga.soro.model.Annonce;
import com.diabiga.soro.sercice.Interface.AnnonceInterface;
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
@RequestMapping("/api/annonces")
public class AnnonceController {

	private final AnnonceInterface annonceService;

	public AnnonceController(AnnonceInterface annonceService) {
		this.annonceService = annonceService;
	}

	@GetMapping
	public List<Annonce> list() {
		return annonceService.getAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Annonce> get(@PathVariable Long id) {
		return annonceService.getById(id)
			.map(ResponseEntity::ok)
			.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<Annonce> create(@RequestBody Annonce annonce) {
		Annonce saved = annonceService.create(annonce);
		return ResponseEntity.created(URI.create("/api/annonces/" + saved.getId())).body(saved);
	}

	@PutMapping("/{id}")
	public Annonce update(@PathVariable Long id, @RequestBody Annonce annonce) {
		return annonceService.update(id, annonce);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		annonceService.delete(id);
		return ResponseEntity.noContent().build();
	}
}

