package com.diabiga.soro.sercice.Interface;

import org.springframework.web.multipart.MultipartFile;
import com.diabiga.soro.model.Image;

public interface ImageInterface {

	Image saveAnnonceImage(Long annonceId, MultipartFile file);

}
