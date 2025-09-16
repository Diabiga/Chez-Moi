package com.diabiga.soro.service.implementation;

import com.diabiga.soro.sercice.Interface.AnnonceInterface;
import com.diabiga.soro.model.Annonce;
import com.diabiga.soro.repository.AnnonceRepository;
import java.util.List;
import java.time.Instant;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AnnonceImplementationService implements AnnonceInterface {

	private final AnnonceRepository annonceRepository;

	public AnnonceImplementationService(AnnonceRepository annonceRepository) {
		this.annonceRepository = annonceRepository;
	}

	@Override
	public Annonce create(Annonce annonce) {
		if (annonce.getCreatedAt() == null) {
			annonce.setCreatedAt(Instant.now());
		}
		return annonceRepository.save(annonce);
	}

	@Override
	public Optional<Annonce> getById(Long id) {
		return annonceRepository.findById(id);
	}

	@Override
	public List<Annonce> getAll() {
		return annonceRepository.findAll();
	}

	@Override
	public Annonce update(Long id, Annonce annonce) {
		Annonce existing = annonceRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("Annonce not found: " + id));
		existing.setTitre(annonce.getTitre());
		existing.setDescription(annonce.getDescription());
		existing.setNombrePiece(annonce.getNombrePiece());
		existing.setPrixFcfa(annonce.getPrixFcfa());
		existing.setContact(annonce.getContact());
		existing.setType(annonce.getType());
		return annonceRepository.save(existing);
	}

	@Override
	public void delete(Long id) {
		annonceRepository.deleteById(id);
	}

}
