package com.diabiga.soro.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Annonce {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long idAnnonce;
	
	private String Titre;
	private String Description;
	private int NombrePiece;
	private Double Prix;
	private String Contact;

}
