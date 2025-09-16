package com.diabiga.soro.web;

import com.diabiga.soro.model.Annonce;
import com.diabiga.soro.sercice.Interface.AnnonceInterface;
import com.diabiga.soro.service.MailService;
import com.diabiga.soro.repository.AnnonceRepository;
import com.diabiga.soro.service.AnnonceSpecifications;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/annonces")
public class AnnonceController {

	private final AnnonceInterface annonceService;
    private final MailService mailService;
    private final AnnonceRepository annonceRepository;

	public AnnonceController(AnnonceInterface annonceService, MailService mailService, AnnonceRepository annonceRepository) {
		this.annonceService = annonceService;
		this.mailService = mailService;
		this.annonceRepository = annonceRepository;
	}

	@GetMapping
	public List<Annonce> list(@RequestParam(name = "categoryId", required = false) Long categoryId,
								@RequestParam(name = "communeId", required = false) Long communeId,
								@RequestParam(name = "type", required = false) String type,
								@RequestParam(name = "min", required = false) java.math.BigDecimal min,
								@RequestParam(name = "max", required = false) java.math.BigDecimal max) {
		return annonceRepository.findAll(
				AnnonceSpecifications.hasCategoryId(categoryId)
						.and(AnnonceSpecifications.hasCommuneId(communeId))
						.and(AnnonceSpecifications.hasType(type))
						.and(AnnonceSpecifications.priceBetween(min, max))
		);
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
		if (saved.getOwner() != null && saved.getOwner().getEmail() != null) {
			mailService.send(saved.getOwner().getEmail(), "Annonce publiée", "Votre annonce a été publiée.");
		}
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

