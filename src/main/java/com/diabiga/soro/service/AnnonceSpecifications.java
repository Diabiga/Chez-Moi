package com.diabiga.soro.service;

import com.diabiga.soro.model.Annonce;
import java.math.BigDecimal;
import org.springframework.data.jpa.domain.Specification;

public class AnnonceSpecifications {

	public static Specification<Annonce> hasCategoryId(Long categoryId) {
		return (root, query, cb) -> categoryId == null ? null : cb.equal(root.get("category").get("id"), categoryId);
	}

	public static Specification<Annonce> hasCommuneId(Long communeId) {
		return (root, query, cb) -> communeId == null ? null : cb.equal(root.get("commune").get("id"), communeId);
	}

	public static Specification<Annonce> hasType(String type) {
		return (root, query, cb) -> type == null ? null : cb.equal(root.get("type"), type);
	}

	public static Specification<Annonce> priceBetween(BigDecimal min, BigDecimal max) {
		return (root, query, cb) -> {
			if (min == null && max == null) return null;
			if (min != null && max != null) return cb.between(root.get("prixFcfa"), min, max);
			if (min != null) return cb.greaterThanOrEqualTo(root.get("prixFcfa"), min);
			return cb.lessThanOrEqualTo(root.get("prixFcfa"), max);
		};
	}
}

