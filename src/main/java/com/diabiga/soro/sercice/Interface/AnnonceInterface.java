package com.diabiga.soro.sercice.Interface;

import java.util.List;
import java.util.Optional;

import com.diabiga.soro.model.Annonce;

public interface AnnonceInterface {

	Annonce create(Annonce annonce);

	Optional<Annonce> getById(Long id);

	List<Annonce> getAll();

	Annonce update(Long id, Annonce annonce);

	void delete(Long id);

}
