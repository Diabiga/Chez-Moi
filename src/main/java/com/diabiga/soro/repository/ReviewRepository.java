package com.diabiga.soro.repository;

import com.diabiga.soro.model.Review;
import com.diabiga.soro.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findByTargetUser(User targetUser);

}

