package com.diabiga.soro.web;

import com.diabiga.soro.model.Review;
import com.diabiga.soro.model.User;
import com.diabiga.soro.repository.ReviewRepository;
import com.diabiga.soro.repository.UserRepository;
import java.net.URI;
import java.time.Instant;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

	private final ReviewRepository reviewRepository;
	private final UserRepository userRepository;

	public ReviewController(ReviewRepository reviewRepository, UserRepository userRepository) {
		this.reviewRepository = reviewRepository;
		this.userRepository = userRepository;
	}

	@GetMapping("/users/{userId}")
	public ResponseEntity<List<Review>> getForUser(@PathVariable Long userId) {
		return userRepository.findById(userId)
				.map(user -> ResponseEntity.ok(reviewRepository.findByTargetUser(user)))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping("/users/{userId}")
	public ResponseEntity<?> create(@PathVariable Long userId, @RequestBody Review review) {
		User target = userRepository.findById(userId)
				.orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
		review.setTargetUser(target);
		review.setCreatedAt(Instant.now());
		Review saved = reviewRepository.save(review);
		return ResponseEntity.created(URI.create("/api/reviews/" + saved.getId())).body(saved);
	}
}

