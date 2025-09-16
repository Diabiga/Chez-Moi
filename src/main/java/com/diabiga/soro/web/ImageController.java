package com.diabiga.soro.web;

import com.diabiga.soro.model.Image;
import com.diabiga.soro.sercice.Interface.ImageInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
public class ImageController {

	private final ImageInterface imageService;

	public ImageController(ImageInterface imageService) {
		this.imageService = imageService;
	}

	@PostMapping("/annonces/{annonceId}")
	public ResponseEntity<Image> upload(@PathVariable Long annonceId, @RequestParam("file") MultipartFile file) {
		Image saved = imageService.saveAnnonceImage(annonceId, file);
		return ResponseEntity.ok(saved);
	}
}

