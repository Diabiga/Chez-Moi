package com.diabiga.soro.service.implementation;

import com.diabiga.soro.sercice.Interface.ImageInterface;
import com.diabiga.soro.model.Annonce;
import com.diabiga.soro.model.Image;
import com.diabiga.soro.repository.AnnonceRepository;
import com.diabiga.soro.repository.ImageRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class ImageImplementationService implements ImageInterface {

	private static final Path STORAGE_ROOT = Paths.get("/workspace", "uploads");

	private final ImageRepository imageRepository;
	private final AnnonceRepository annonceRepository;

	public ImageImplementationService(ImageRepository imageRepository, AnnonceRepository annonceRepository) {
		this.imageRepository = imageRepository;
		this.annonceRepository = annonceRepository;
	}

	public Image saveAnnonceImage(Long annonceId, MultipartFile file) {
		try {
			Files.createDirectories(STORAGE_ROOT);
			String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
			Path target = STORAGE_ROOT.resolve(filename);
			Files.copy(file.getInputStream(), target);
			Annonce annonce = annonceRepository.findById(annonceId)
					.orElseThrow(() -> new IllegalArgumentException("Annonce not found: " + annonceId));
			Image image = new Image();
			image.setUrl("/uploads/" + filename);
			image.setAnnonce(annonce);
			return imageRepository.save(image);
		} catch (IOException e) {
			throw new RuntimeException("Failed to store file", e);
		}
	}

}
